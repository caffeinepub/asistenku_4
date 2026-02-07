import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Time "mo:core/Time";

import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

(with migration = Migration.run)
actor {
  module AuditLogEntry {
    public type AuditLogEntry = {
      timestamp : Nat;
      principalId : Text;
      actionType : AuditActionType;
      metadata : Text;
    };

    public type AuditActionType = {
      #viewCode;
      #toggleCodeVisibility;
      #copyCode;
      #rotateCode;
      #generateNewCode;
      #changeCodeStatus;
      #updateCodeData;
    };

    public func compare(a : AuditLogEntry, b : AuditLogEntry) : Order.Order {
      Nat.compare(a.timestamp, b.timestamp);
    };
  };

  module InternalAccessCode {
    public type InternalCodeType = { #codeA; #codeB };

    public type InternalAccessCode = {
      code : Text;
      codeType : InternalCodeType;
      lastUpdated : Nat;
    };
  };

  module InternalRegistrationData {
    public type InternalRegistrationData = {
      name : Text;
      email : Text;
      whatsapp : Text;
    };
  };

  module ClientRegistrationData {
    public type ClientRegistrationData = {
      name : Text;
      email : Text;
      whatsapp : Text;
      company : Text;
    };
  };

  module PartnerRegistrationData {
    public type PartnerRegistrationData = {
      name : Text;
      email : Text;
      whatsapp : Text;
      skills : Text;
      domisili : Text;
    };
  };

  module UserProfile {
    public type UserProfile = {
      id : Text;
      principalId : Text;
      role : Text;
      status : UserStatus.UserStatus;
      clientData : ?ClientRegistrationData.ClientRegistrationData;
      partnerData : ?PartnerRegistrationData.PartnerRegistrationData;
      internalData : ?InternalRegistrationData.InternalRegistrationData;
    };
  };

  module UserStatus {
    public type UserStatus = {
      #active;
      #pending;
      #suspended;
      #blacklisted;
    };
  };

  module Service {
    public type Service = {
      id : Text;
      code : Text;
      title : Text;
      category : Text;
      description : Text;
      serviceType : Text;
      detailedInformation : Text;
      icon : Text;
      banner : Text;
      thumbnail : Text;
      price : Nat;
      unit : Text;
      estimatedTotal : Nat;
      estimatedTime : Text;
      estimatedTeamSize : Nat;
      additionalCost : Nat;
      maxDiscountPercent : Nat;
      status : Status;
      available : Bool;
      createdAt : Nat;
      updatedAt : Nat;
    };

    public type Status = {
      #active;
      #inactive;
      #pending;
      #archived;
      #review;
      #delisted;
      #outdated;
    };
  };

  module Task {
    public type Schedule = {
      startDate : ?Text;
      endDate : ?Text;
      startTime : ?Text;
      endTime : ?Text;
      timezoneOffset : ?Int;
      additionalComments : ?Text;
      includesWeekend : Bool;
      allowsOvertime : Bool;
      isRemote : Bool;
    };

    public type Task = {
      id : Text;
      title : Text;
      description : Text;
      onboardingMaterial : Text;
      tags : Text;
      serviceReference : Text;
      extendedServiceDescription : Text;
      taskType : Text;
      subtaskRequiredCount : Nat;
      additionalServiceCost : Nat;
      paymentStatus : PaymentStatus;
      taskStatus : TaskStatus;
      continuityFlag : Bool;
      collaborativeFlag : Bool;
      schedule : Schedule;
      memberSlots : Nat;
      partnerTeamLeader : Text;
      partnerTeamMembers : [Text];
      clientReferenceId : Text;
      clientSpecificRequirements : Text;
      internalProjectManager : Text;
      prioritizedFlags : Text;
      prioritizationScore : Nat;
      overallTaskScore : Nat;
    };

    public type PaymentStatus = {
      #unpaid;
      #pending;
      #paid;
      #refunded;
      #partial;
      #overpaid;
    };

    public type TaskStatus = {
      #open;
      #inProgress;
      #revising;
      #pendingForReview;
      #completed;
      #canceled;
    };
  };

  module FinancialPartnerData {
    public type FinancialPartnerData = {
      id : Text;
      partnerId : Text;
      partnerName : Text;
      balance : Nat;
      withdrawn : Nat;
      pendingWithdrawals : Nat;
      availableBalance : Nat;
      totalEarnings : Nat;
      bonus : Nat;
      insured : Nat;
      history : [Text];
      status : ?Text;
      createdAt : ?Text;
      nbUpdate : ?Text;
    };
  };

  module FinancialSummary {
    public type FinancialSummary = {
      completedTransactions : Nat;
      totalTransactionAmount : Nat;
      completedPayouts : Nat;
      totalPayoutAmount : Nat;
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var clientCounter = 0;
  var partnerCounter = 0;
  var superadminClaimed = false;
  var _isInitialized = false;
  var auditLogCounter = 0;

  let internalCodes = Map.empty<Text, InternalAccessCode.InternalAccessCode>();
  let userProfilesById = Map.empty<Text, UserProfile.UserProfile>();
  let userProfilesByPrincipal = Map.empty<Principal, UserProfile.UserProfile>();
  let auditLogs = Map.empty<Nat, AuditLogEntry.AuditLogEntry>();

  let services = Map.empty<Text, Service.Service>();
  let tasks = Map.empty<Text, Task.Task>();
  let partnerWallets = Map.empty<Text, FinancialPartnerData.FinancialPartnerData>();

  // Valid roles definition
  let validRoles = Set.fromArray([
    "SUPERADMIN", "ADMIN", "ASISTENMU", "SUPERVISOR", "MANAGEMENT", "FINANCE", "CLIENT", "PARTNER"
  ]);

  let internalRoles = Set.fromArray([
    "ADMIN", "ASISTENMU", "SUPERVISOR", "MANAGEMENT", "FINANCE"
  ]);

  func normalizeRole(role : Text) : Text {
    role.map(func(c : Char) : Char {
      if (c >= 'a' and c <= 'z') {
        Char.fromNat32(Char.toNat32(c) - 32)
      } else {
        c
      }
    })
  };

  func isValidRole(role : Text) : Bool {
    validRoles.contains(normalizeRole(role));
  };

  func isValidInternalRole(role : Text) : Bool {
    internalRoles.contains(normalizeRole(role));
  };

  func isAdminOrHigher(role : Text) : Bool {
    let normalized = normalizeRole(role);
    normalized == "SUPERADMIN" or normalized == "ADMIN"
  };

  func isSuperadmin(role : Text) : Bool {
    normalizeRole(role) == "SUPERADMIN";
  };

  public query ({ caller }) func isValidRoleName(roleName : Text) : async Bool {
    isValidRole(roleName);
  };

  // Default profile for UI rendering
  public query ({ caller }) func getDefaultPartnerProfile() : async UserProfile.UserProfile {
    let dummyPartnerData : PartnerRegistrationData.PartnerRegistrationData = {
      name = "";
      email = "";
      whatsapp = "";
      skills = "";
      domisili = "";
    };
    {
      id = "";
      principalId = "";
      role = "PARTNER";
      status = #pending : UserStatus.UserStatus;
      clientData = null;
      partnerData = ?dummyPartnerData;
      internalData = null;
    };
  };

  // Profile access functions required by frontend
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile.UserProfile {
    if (caller.isAnonymous()) {
      return null;
    };
    userProfilesByPrincipal.get(caller);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile.UserProfile) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot save profiles");
    };

    // Verify caller owns this profile
    let callerPrincipalText = caller.toText();
    if (profile.principalId != callerPrincipalText) {
      Runtime.trap("Unauthorized: Can only save your own profile");
    };

    // Validate role
    if (not isValidRole(profile.role)) {
      Runtime.trap("Invalid role");
    };

    userProfilesByPrincipal.add(caller, profile);
    userProfilesById.add(profile.id, profile);
  };

  public query ({ caller }) func getUserProfile(userId : Text) : async ?UserProfile.UserProfile {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view profiles");
    };

    let targetProfile = userProfilesById.get(userId);

    switch (targetProfile) {
      case (null) { null };
      case (?profile) {
        // Check if caller is viewing their own profile
        let callerPrincipalText = caller.toText();
        if (profile.principalId == callerPrincipalText) {
          return ?profile;
        };

        // Check if caller is ADMIN or SUPERADMIN
        let callerProfile = userProfilesByPrincipal.get(caller);
        switch (callerProfile) {
          case (?cp) {
            if (isAdminOrHigher(cp.role)) {
              return ?profile;
            };
          };
          case (null) {};
        };

        Runtime.trap("Unauthorized: Can only view your own profile or must be ADMIN/SUPERADMIN");
      };
    };
  };

  // Helper to get caller's profile (internal use)
  private func getCallerProfile(caller : Principal) : ?UserProfile.UserProfile {
    userProfilesByPrincipal.get(caller);
  };

  // ID generation functions
  private func generateClientId() : Text {
    clientCounter += 1;
    let paddedNumber = clientCounter.toText();
    let padding = paddedNumber.size();
    var zeros = "";
    var i = padding;
    while (i < 6) {
      zeros := zeros # "0";
      i += 1;
    };
    "CA-" # zeros # paddedNumber;
  };

  private func generatePartnerId() : Text {
    partnerCounter += 1;
    let paddedNumber = partnerCounter.toText();
    let padding = paddedNumber.size();
    var zeros = "";
    var i = padding;
    while (i < 6) {
      zeros := zeros # "0";
      i += 1;
    };
    "PA-" # zeros # paddedNumber;
  };

  // Registration functions
  public shared ({ caller }) func registerClient(name : Text, email : Text, whatsapp : Text, company : Text) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot register");
    };

    // Check if caller already has a profile
    switch (getCallerProfile(caller)) {
      case (?_) {
        Runtime.trap("User already has a profile");
      };
      case (null) {};
    };

    let clientId = generateClientId();
    let clientData : ClientRegistrationData.ClientRegistrationData = {
      name = name;
      email = email;
      whatsapp = whatsapp;
      company = company;
    };

    let profile : UserProfile.UserProfile = {
      id = clientId;
      principalId = caller.toText();
      role = "CLIENT";
      status = #active;
      clientData = ?clientData;
      partnerData = null;
      internalData = null;
    };

    userProfilesById.add(clientId, profile);
    userProfilesByPrincipal.add(caller, profile);

    clientId;
  };

  public shared ({ caller }) func registerPartner(name : Text, email : Text, whatsapp : Text, skills : Text, domisili : Text) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot register");
    };

    // Check if caller already has a profile
    switch (getCallerProfile(caller)) {
      case (?_) {
        Runtime.trap("User already has a profile");
      };
      case (null) {};
    };

    let partnerId = generatePartnerId();
    let partnerData : PartnerRegistrationData.PartnerRegistrationData = {
      name = name;
      email = email;
      whatsapp = whatsapp;
      skills = skills;
      domisili = domisili;
    };

    let profile : UserProfile.UserProfile = {
      id = partnerId;
      principalId = caller.toText();
      role = "PARTNER";
      status = #pending;
      clientData = null;
      partnerData = ?partnerData;
      internalData = null;
    };

    userProfilesById.add(partnerId, profile);
    userProfilesByPrincipal.add(caller, profile);

    partnerId;
  };

  public shared ({ caller }) func registerInternalUser(role : Text, name : Text, email : Text, whatsapp : Text) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot register");
    };

    // Check if caller already has a profile
    switch (getCallerProfile(caller)) {
      case (?_) {
        Runtime.trap("User already has a profile");
      };
      case (null) {};
    };

    // Validate and normalize role
    let normalizedRole = normalizeRole(role);
    if (not isValidInternalRole(normalizedRole)) {
      Runtime.trap("Invalid internal role");
    };

    let userId = "INT-" # caller.toText();
    let internalData : InternalRegistrationData.InternalRegistrationData = {
      name = name;
      email = email;
      whatsapp = whatsapp;
    };

    let profile : UserProfile.UserProfile = {
      id = userId;
      principalId = caller.toText();
      role = normalizedRole;
      status = #pending;
      clientData = null;
      partnerData = null;
      internalData = ?internalData;
    };

    userProfilesById.add(userId, profile);
    userProfilesByPrincipal.add(caller, profile);

    userId;
  };

  public shared ({ caller }) func claimSuperadmin() : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot claim superadmin");
    };

    if (superadminClaimed) {
      Runtime.trap("Superadmin already claimed");
    };

    // Check if caller already has a profile
    switch (getCallerProfile(caller)) {
      case (?_) {
        Runtime.trap("User already has a profile");
      };
      case (null) {};
    };

    let userId = "SUPERADMIN-" # caller.toText();
    let internalData : InternalRegistrationData.InternalRegistrationData = {
      name = "";
      email = "";
      whatsapp = "";
    };

    let profile : UserProfile.UserProfile = {
      id = userId;
      principalId = caller.toText();
      role = "SUPERADMIN";
      status = #active;
      clientData = null;
      partnerData = null;
      internalData = ?internalData;
    };

    userProfilesById.add(userId, profile);
    userProfilesByPrincipal.add(caller, profile);
    superadminClaimed := true;

    userId;
  };

  // Services module
  public shared ({ caller }) func createService(service : Service.Service) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot create services");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (?profile) {
        if (not isAdminOrHigher(profile.role)) {
          Runtime.trap("Unauthorized: Only ADMIN or SUPERADMIN can create services");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
    };

    services.add(service.id, service);
  };

  public query ({ caller }) func getServiceById(serviceId : Text) : async ?Service.Service {
    if (caller.isAnonymous()) {
      return services.get(serviceId);
    };
    services.get(serviceId);
  };

  public query ({ caller }) func getAllServices() : async [Service.Service] {
    services.values().toArray();
  };

  // Tasks module
  public shared ({ caller }) func createTask(task : Task.Task) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot create tasks");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (?profile) {
        let normalizedRole = normalizeRole(profile.role);
        if (normalizedRole != "CLIENT" and not isAdminOrHigher(profile.role)) {
          Runtime.trap("Unauthorized: Only CLIENT, ADMIN, or SUPERADMIN can create tasks");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
    };

    // Validate that the referenced service exists and is ACTIVE
    switch (services.get(task.serviceReference)) {
      case (null) {
        Runtime.trap("Service not found: Cannot create task for non-existent service");
      };
      case (?service) {
        switch (service.status) {
          case (#active) {
            // Service is active, proceed
          };
        };
        if (not service.available) {
          Runtime.trap("Service not available: Cannot create task for unavailable service");
        };
      };
    };

    tasks.add(task.id, task);
  };

  public query ({ caller }) func getTaskById(taskId : Text) : async ?Task.Task {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view tasks");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        let task = tasks.get(taskId);
        switch (task) {
          case (null) { return null };
          case (?t) {
            // Admin can view all tasks
            if (isAdminOrHigher(profile.role)) {
              return ?t;
            };
            // Client can view their own tasks
            if (normalizeRole(profile.role) == "CLIENT" and t.clientReferenceId == profile.id) {
              return ?t;
            };
            // Partner can view tasks they are assigned to
            if (normalizeRole(profile.role) == "PARTNER") {
              if (t.partnerTeamLeader == profile.id) {
                return ?t;
              };
              for (member in t.partnerTeamMembers.vals()) {
                if (member == profile.id) {
                  return ?t;
                };
              };
            };
            Runtime.trap("Unauthorized: Cannot view this task");
          };
        };
      };
    };
  };

  public query ({ caller }) func getAllTasks() : async [Task.Task] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view tasks");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        // Admin can view all tasks
        if (isAdminOrHigher(profile.role)) {
          return tasks.values().toArray();
        };

        // Filter tasks based on role
        let allTasks = tasks.values().toArray();
        let filteredTasks = allTasks.filter(func(task) {
          // Client can view their own tasks
          if (normalizeRole(profile.role) == "CLIENT" and task.clientReferenceId == profile.id) {
            return true;
          };
          // Partner can view tasks they are assigned to
          if (normalizeRole(profile.role) == "PARTNER") {
            if (task.partnerTeamLeader == profile.id) {
              return true;
            };
            for (member in task.partnerTeamMembers.vals()) {
              if (member == profile.id) {
                return true;
              };
            };
          };
          false;
        });
        filteredTasks;
      };
    };
  };

  // Financial Partner Data
  public shared ({ caller }) func createFinancialPartnerData(data : FinancialPartnerData.FinancialPartnerData) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot create wallets");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (?profile) {
        if (not isAdminOrHigher(profile.role)) {
          Runtime.trap("Unauthorized: Only ADMIN or SUPERADMIN can create partner wallets");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
    };

    partnerWallets.add(data.id, data);
  };

  public query ({ caller }) func getFinancialPartnerDataById(walletId : Text) : async ?FinancialPartnerData.FinancialPartnerData {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view wallets");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        let wallet = partnerWallets.get(walletId);
        switch (wallet) {
          case (null) { return null };
          case (?w) {
            // Admin can view all wallets
            if (isAdminOrHigher(profile.role)) {
              return ?w;
            };
            // Partner can only view their own wallet
            if (normalizeRole(profile.role) == "PARTNER" and w.partnerId == profile.id) {
              return ?w;
            };
            Runtime.trap("Unauthorized: Cannot view this wallet");
          };
        };
      };
    };
  };

  public query ({ caller }) func getAllFinancialPartnerData() : async [FinancialPartnerData.FinancialPartnerData] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view wallets");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        if (not isAdminOrHigher(profile.role)) {
          Runtime.trap("Unauthorized: Only ADMIN or SUPERADMIN can view all wallets");
        };
        partnerWallets.values().toArray();
      };
    };
  };

  public query ({ caller }) func getMyWallet() : async FinancialPartnerData.FinancialPartnerData {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view wallets");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        if (normalizeRole(profile.role) != "PARTNER") {
          Runtime.trap("Unauthorized: Only PARTNER users can view their wallet");
        };

        // Find wallet by partnerId
        for ((id, wallet) in partnerWallets.entries()) {
          if (wallet.partnerId == profile.id) {
            return wallet;
          };
        };

        // Return zero-safe default wallet if not found
        {
          id = "";
          partnerId = profile.id;
          partnerName = "";
          balance = 0;
          withdrawn = 0;
          pendingWithdrawals = 0;
          availableBalance = 0;
          totalEarnings = 0;
          bonus = 0;
          insured = 0;
          history = [];
          status = null;
          createdAt = null;
          nbUpdate = null;
        };
      };
    };
  };

  public query ({ caller }) func getFinancialSummary() : async FinancialSummary.FinancialSummary {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view financial summary");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        if (not isSuperadmin(profile.role)) {
          Runtime.trap("Unauthorized: Only SUPERADMIN can view financial summary");
        };

        var completedTransactions = 0;
        var totalTransactionAmount = 0;
        var completedPayouts = 0;
        var totalPayoutAmount = 0;

        let taskValues = tasks.values().toArray();
        for (task in taskValues.vals()) {
          switch (task.taskStatus) {
            case (#completed) {
              completedTransactions += 1;
            };
            case (_) {};
          };
        };

        let walletValues = partnerWallets.values().toArray();
        for (wallet in walletValues.vals()) {
          totalPayoutAmount += wallet.withdrawn;
          if (wallet.withdrawn > 0) {
            completedPayouts += 1;
          };
        };

        {
          completedTransactions;
          totalTransactionAmount;
          completedPayouts;
          totalPayoutAmount;
        };
      };
    };
  };
};
