import Map "mo:core/Map";
import Set "mo:core/Set";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Int "mo:core/Int";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Iter "mo:core/Iter";
import Migration "migration";

// Apply migration on upgrade
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

  module AuditLog {
    public type AuditLogEntry = AuditLogEntry.AuditLogEntry;
    public type AuditActionType = AuditLogEntry.AuditActionType;
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

  module AsistenmuCandidateDTO {
    public type AsistenmuCandidateDTO = {
      principalId : Text;
      name : Text;
      role : Text;
      status : UserStatus.UserStatus;
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

  module MinimalTask {
    public type TaskStatusInternal = {
      #REQUESTED;
      #IN_PROGRESS;
      #QA_ASISTENMU;
      #REVISION;
      #DONE;
    };

    public type RequestType = {
      #NORMAL;
      #PRIORITY;
      #URGENT;
    };

    public type TaskRecord = {
      taskId : Text;
      clientId : Text;
      createdByPrincipal : Principal;
      title : Text;
      description : Text;
      clientDeadline : ?Nat;
      internalDeadline : ?Nat;
      assignedPartnerId : ?Text;
      assignedAsistenmuName : Text;
      statusInternal : TaskStatusInternal;
      createdAt : Nat;
      updatedAt : Nat;
      requestType : RequestType;
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

  module LayanankuKind {
    public type LayananKind = { #TENANG; #RAPI; #FOKUS; #JAGA };
  };

  module LayanankuStatus {
    public type LayananStatus = { #active; #inactive; #expired };
  };

  module LayanankuRecord {
    public type LayanankuRecord = {
      id : Text;
      kind : LayanankuKind.LayananKind;
      startAt : Nat;
      endAt : Nat;
      status : LayanankuStatus.LayananStatus;
      sharePrincipals : [Text];
      hargaPerLayanan : Nat;
      clientId : Text;
      createdAt : Nat;
      updatedAt : Nat;
      asistenmuPrincipalId : ?Text;
      asistenmuNameSnapshot : ?Text;
    };

    public type LayanankuPublic = {
      id : Text;
      kind : LayanankuKind.LayananKind;
      startAt : Nat;
      endAt : Nat;
      status : LayanankuStatus.LayananStatus;
      sharePrincipals : [Text];
      createdAt : Nat;
      updatedAt : Nat;
    };
  };

  module ExtendedLayanankuRecord {
    public type ExtendedLayanankuRecord = {
      id : Text;
      kind : LayanankuKind.LayananKind;
      startAt : Nat;
      endAt : Nat;
      status : LayanankuStatus.LayananStatus;
      sharePrincipals : [Text];
      hargaPerLayanan : Nat;
      clientId : Text;
      createdAt : Nat;
      updatedAt : Nat;
      asistenmuPrincipalId : ?Text;
      asistenmuName : ?Text;
    };
  };

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  var clientCounter = 0;
  var partnerCounter = 0;
  var superadminClaimed = false;
  var _isInitialized = false;
  var auditLogCounter = 0;
  var layanankuCounter = 0;

  let internalCodes = Map.empty<Text, InternalAccessCode.InternalAccessCode>();
  let userProfilesById = Map.empty<Text, UserProfile.UserProfile>();
  let userProfilesByPrincipal = Map.empty<Principal, UserProfile.UserProfile>();
  let auditLogs = Map.empty<Nat, AuditLogEntry.AuditLogEntry>();

  let services = Map.empty<Text, Service.Service>();
  let tasks = Map.empty<Text, Task.Task>();
  let partnerWallets = Map.empty<Text, FinancialPartnerData.FinancialPartnerData>();

  let layanankuById = Map.empty<Text, LayanankuRecord.LayanankuRecord>();
  let layanankuByClientId = Map.empty<Text, [LayanankuRecord.LayanankuRecord]>();

  var taskCounter = 0;
  let tasksById = Map.empty<Text, MinimalTask.TaskRecord>();
  let taskIdsByClientId = Map.empty<Text, [Text]>();
  let taskIdsByPartnerId = Map.empty<Text, [Text]>();

  let validRoles = Set.fromArray([
    "SUPERADMIN", "ADMIN", "ASISTENMU", "SUPERVISOR", "MANAGEMENT", "FINANCE", "CLIENT", "PARTNER",
  ]);

  let internalRoles = Set.fromArray([
    "ADMIN", "ASISTENMU", "SUPERVISOR", "MANAGEMENT", "FINANCE",
  ]);

  func normalizeRole(role : Text) : Text {
    role.map(func(c : Char) : Char {
      if (c >= 'a' and c <= 'z') {
        Char.fromNat32(Char.toNat32(c) - 32);
      } else {
        c;
      };
    });
  };

  func isValidRole(role : Text) : Bool {
    validRoles.contains(normalizeRole(role));
  };

  func isValidInternalRole(role : Text) : Bool {
    internalRoles.contains(normalizeRole(role));
  };

  func isAdminOrHigher(role : Text) : Bool {
    let normalized = normalizeRole(role);
    normalized == "SUPERADMIN" or normalized == "ADMIN";
  };

  func isSuperadmin(role : Text) : Bool {
    normalizeRole(role) == "SUPERADMIN";
  };

  public query ({ caller }) func isValidRoleName(roleName : Text) : async Bool {
    isValidRole(roleName);
  };

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

    let callerPrincipalText = caller.toText();
    if (profile.principalId != callerPrincipalText) {
      Runtime.trap("Unauthorized: Can only save your own profile");
    };

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
        let callerPrincipalText = caller.toText();
        if (profile.principalId == callerPrincipalText) {
          return ?profile;
        };

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

  private func getCallerProfile(caller : Principal) : ?UserProfile.UserProfile {
    userProfilesByPrincipal.get(caller);
  };

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

  private func generateLayanankuId() : Text {
    layanankuCounter += 1;
    let paddedNumber = layanankuCounter.toText();
    let padding = paddedNumber.size();
    var zeros = "";
    var i = padding;
    while (i < 6) {
      zeros := zeros # "0";
      i += 1;
    };
    "LY-" # zeros # paddedNumber;
  };

  private func generateTaskId() : Text {
    taskCounter += 1;
    let paddedNumber = taskCounter.toText();
    var zeros = "";
    var i = paddedNumber.size();
    while (i < 6) {
      zeros := zeros # "0";
      i += 1;
    };
    "TS-" # zeros # paddedNumber;
  };

  public shared ({ caller }) func registerClient(name : Text, email : Text, whatsapp : Text, company : Text) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot register");
    };

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

    switch (getCallerProfile(caller)) {
      case (?_) {
        Runtime.trap("User already has a profile");
      };
      case (null) {};
    };

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
    services.get(serviceId);
  };

  public query ({ caller }) func getAllServices() : async [Service.Service] {
    services.values().toArray();
  };

  public shared ({ caller }) func createTaskLegacy(task : Task.Task) : async () {
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

    switch (services.get(task.serviceReference)) {
      case (null) {
        Runtime.trap("Service not found: Cannot create task for non-existent service");
      };
      case (?service) {
        switch (service.status) {
          case (#active) {};
          case (_) {};
        };
        if (not service.available) {
          Runtime.trap("Service not available: Cannot create task for unavailable service");
        };
      };
    };

    tasks.add(task.id, task);
  };

  public query ({ caller }) func getTaskLegacy(taskId : Text) : async ?Task.Task {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view tasks");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        let getVal = tasks.get(taskId);
        switch (getVal) {
          case (null) { return null };
          case (?t) {
            if (isAdminOrHigher(profile.role)) {
              return ?t;
            };
            if (normalizeRole(profile.role) == "CLIENT" and t.clientReferenceId == profile.id) {
              return ?t;
            };
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

  public query ({ caller }) func getAllTasksLegacy() : async [Task.Task] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view tasks");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        if (isAdminOrHigher(profile.role)) {
          return tasks.values().toArray();
        };

        let allTasks = tasks.values().toArray();
        let filteredTasks = allTasks.filter(func(task) {
          if (normalizeRole(profile.role) == "CLIENT" and task.clientReferenceId == profile.id) {
            return true;
          };
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
            if (isAdminOrHigher(profile.role)) {
              return ?w;
            };
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

        for ((id, wallet) in partnerWallets.entries()) {
          if (wallet.partnerId == profile.id) {
            return wallet;
          };
        };

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

  public query ({ caller }) func hasActiveLayananku(clientId : Text) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot check Layananku status");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        if (not isAdminOrHigher(profile.role) and profile.id != clientId) {
          Runtime.trap("Unauthorized: Can only check your own Layananku status or must be ADMIN/SUPERADMIN");
        };

        let now = auditLogCounter;
        let layanankuArray = layanankuByClientId.get(clientId);
        switch (layanankuArray) {
          case (null) { false };
          case (?layanankuList) {
            for (layananku in layanankuList.vals()) {
              let computedStatus = computeLayananStatus(now, layananku.startAt, layananku.endAt);
              if (computedStatus == #active) { return true };
            };
            false;
          };
        };
      };
    };
  };

  public query ({ caller }) func myHasActiveLayananku() : async Bool {
    if (caller.isAnonymous()) {
      return false;
    };

    switch (getCallerProfile(caller)) {
      case (null) {
        false;
      };
      case (?profile) {
        let now = auditLogCounter;
        if (normalizeRole(profile.role) == "CLIENT") {
          let layanankuArray = layanankuByClientId.get(profile.id);
          switch (layanankuArray) {
            case (null) { return false };
            case (?layanankuList) {
              for (layananku in layanankuList.vals()) {
                let computedStatus = computeLayananStatus(now, layananku.startAt, layananku.endAt);
                if (computedStatus == #active) { return true };
              };
              return false;
            };
          };
        } else {
          for ((id, layanankuRecord) in layanankuById.entries()) {
            let computedStatus = computeLayananStatus(now, layanankuRecord.startAt, layanankuRecord.endAt);
            if (computedStatus == #active and principalHasAccess(caller.toText(), layanankuRecord)) {
              return true;
            };
          };
          false;
        };
      };
    };
  };

  public query ({ caller }) func getMyLayananku() : async [LayanankuRecord.LayanankuPublic] {
    if (caller.isAnonymous()) {
      return [];
    };

    switch (getCallerProfile(caller)) {
      case (null) {
        [];
      };
      case (?profile) {
        var filteredLayananku : [LayanankuRecord.LayanankuRecord] = [];

        if (isAdminOrHigher(profile.role) or isSuperadmin(profile.role)) {
          filteredLayananku := layanankuById.values().toArray();
        } else {
          for ((id, layanankuRecord) in layanankuById.entries()) {
            if (principalHasAccess(caller.toText(), layanankuRecord)) {
              filteredLayananku := filteredLayananku.concat([layanankuRecord]);
            };
          };
        };

        filteredLayananku.map(toPublic);
      };
    };
  };

  public query ({ caller }) func getLayanankuInternal(idLayanan : Text) : async ?LayanankuRecord.LayanankuRecord {
    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized");
      };
      case (?profile) {
        if (not isAdminOrHigher(profile.role)) {
          Runtime.trap("Unauthorized");
        };
        layanankuById.get(idLayanan);
      };
    };
  };

  public shared ({ caller }) func createLayanankuForClient(
    clientId : Text,
    kind : LayanankuKind.LayananKind,
    startAt : Nat,
    endAt : Nat,
    sharePrincipals : [Text],
    hargaPerLayanan : Nat
  ) : async Text {
    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized");
      };
      case (?profile) {
        if (not isAdminOrHigher(profile.role)) {
          Runtime.trap("Unauthorized");
        };

        if (endAt <= startAt) {
          Runtime.trap("INVALID_PERIOD");
        };

        switch (userProfilesById.get(clientId)) {
          case (null) {
            Runtime.trap("CLIENT_NOT_FOUND");
          };
          case (?clientProfile) {
            if (normalizeRole(clientProfile.role) != "CLIENT") {
              Runtime.trap("TARGET_NOT_CLIENT");
            };

            let finalSharePrincipals = [clientProfile.principalId].concat(sharePrincipals);

            if (finalSharePrincipals.size() > 6) {
              Runtime.trap("SHARE_LIMIT_EXCEEDED_MAX_6");
            };

            let id = generateLayanankuId();
            let now = auditLogCounter;

            let layananku : LayanankuRecord.LayanankuRecord = {
              id;
              kind;
              startAt;
              endAt;
              status = computeLayananStatus(now, startAt, endAt);
              sharePrincipals = finalSharePrincipals;
              hargaPerLayanan;
              clientId;
              createdAt = now;
              updatedAt = now;
              asistenmuPrincipalId = null;
              asistenmuNameSnapshot = null;
            };

            layanankuById.add(id, layananku);

            let currentClientLayananku = switch (layanankuByClientId.get(clientId)) {
              case (null) { [] };
              case (?existing) { existing };
            };
            layanankuByClientId.add(clientId, currentClientLayananku.concat([layananku]));

            recordAuditLog(caller, #updateCodeData, "Create Layananku " # id);

            return id;
          };
        };
      };
    };
  };

  public shared ({ caller }) func updateLayanankuShare(idLayanan : Text, newSharePrincipals : [Text]) : async Bool {
    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized");
      };
      case (?profile) {
        if (not isAdminOrHigher(profile.role)) {
          Runtime.trap("Unauthorized");
        };

        switch (layanankuById.get(idLayanan)) {
          case (null) { false };
          case (?currentLayananku) {
            let clientProfile = switch (userProfilesById.get(currentLayananku.clientId)) {
              case (null) { Runtime.trap("Client not found for Layananku") };
              case (?cp) { cp };
            };

            let clientPrincipal = clientProfile.principalId;

            let hasPrincipal = newSharePrincipals.any(func(p) { p == clientPrincipal });
            let finalShare = if (hasPrincipal) {
              newSharePrincipals;
            } else {
              [clientPrincipal].concat(newSharePrincipals);
            };

            if (finalShare.size() > 6) {
              Runtime.trap("SHARE_LIMIT_EXCEEDED_MAX_6");
            };

            let now = auditLogCounter;

            let updatedLayananku : LayanankuRecord.LayanankuRecord = {
              currentLayananku with
              sharePrincipals = finalShare;
              status = computeLayananStatus(now, currentLayananku.startAt, currentLayananku.endAt);
              updatedAt = now;
            };

            layanankuById.add(idLayanan, updatedLayananku);

            let currentClientLayananku = switch (layanankuByClientId.get(currentLayananku.clientId)) {
              case (null) { [] };
              case (?existing) { existing };
            };
            let updatedClientLayananku = currentClientLayananku.map(
              func(l : LayanankuRecord.LayanankuRecord) : LayanankuRecord.LayanankuRecord {
                if (l.id == idLayanan) { updatedLayananku } else { l };
              }
            );
            layanankuByClientId.add(currentLayananku.clientId, updatedClientLayananku);

            recordAuditLog(caller, #updateCodeData, "Update share Layananku " # idLayanan);

            true;
          };
        };
      };
    };
  };

  public shared ({ caller }) func deactivateLayananku(idLayanan : Text) : async Bool {
    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized");
      };
      case (?profile) {
        if (not isAdminOrHigher(profile.role)) {
          Runtime.trap("Unauthorized");
        };

        switch (layanankuById.get(idLayanan)) {
          case (null) { false };
          case (?currentLayananku) {
            let now = auditLogCounter;

            let deactivatedLayananku : LayanankuRecord.LayanankuRecord = {
              id = currentLayananku.id;
              kind = currentLayananku.kind;
              startAt = currentLayananku.startAt;
              endAt = currentLayananku.endAt;
              status = #inactive;
              sharePrincipals = currentLayananku.sharePrincipals;
              hargaPerLayanan = currentLayananku.hargaPerLayanan;
              clientId = currentLayananku.clientId;
              createdAt = currentLayananku.createdAt;
              updatedAt = now;
              asistenmuPrincipalId = currentLayananku.asistenmuPrincipalId;
              asistenmuNameSnapshot = currentLayananku.asistenmuNameSnapshot;
            };

            layanankuById.add(idLayanan, deactivatedLayananku);

            let currentClientLayananku = switch (layanankuByClientId.get(currentLayananku.clientId)) {
              case (null) { [] };
              case (?existing) { existing };
            };
            let updatedClientLayananku = currentClientLayananku.map(
              func(l : LayanankuRecord.LayanankuRecord) : LayanankuRecord.LayanankuRecord {
                if (l.id == idLayanan) { deactivatedLayananku } else { l };
              }
            );
            layanankuByClientId.add(currentLayananku.clientId, updatedClientLayananku);

            recordAuditLog(caller, #updateCodeData, "Deactivate Layananku " # idLayanan);

            true;
          };
        };
      };
    };
  };

  public query ({ caller }) func getLayanankuForClient(clientId : Text) : async [ExtendedLayanankuRecord.ExtendedLayanankuRecord] {
    let maybeProfile = getCallerProfile(caller);
    switch (maybeProfile) {
      case (null) { Runtime.trap("Unauthorized") };
      case (?userProfile) {
        if (userProfile.id != clientId and not isAdminOrHigher(userProfile.role)) {
          Runtime.trap("Unauthorized");
        };

        let layanankuArray = switch (layanankuByClientId.get(clientId)) {
          case (null) { return [] };
          case (?array) { array };
        };

        return layanankuArray.map(
          func(l : LayanankuRecord.LayanankuRecord) : ExtendedLayanankuRecord.ExtendedLayanankuRecord {
            {
              id = l.id;
              kind = l.kind;
              startAt = l.startAt;
              endAt = l.endAt;
              status = l.status;
              sharePrincipals = l.sharePrincipals;
              hargaPerLayanan = l.hargaPerLayanan;
              clientId = l.clientId;
              createdAt = l.createdAt;
              updatedAt = l.updatedAt;
              asistenmuPrincipalId = l.asistenmuPrincipalId;
              asistenmuName = resolveAsistenmuName(l.asistenmuPrincipalId);
            };
          }
        );
      };
    };
  };

  private func resolveAsistenmuName(asistenmuPrincipalId : ?Text) : ?Text {
    switch (asistenmuPrincipalId) {
      case (null) {
        null;
      };
      case (?pid) {
        for ((p, up) in userProfilesByPrincipal.entries()) {
          if (up.principalId == pid and up.role == "ASISTENMU") {
            return switch (up.internalData) {
              case (null) { null };
              case (?internalData) { ?internalData.name };
            };
          };
        };
        null;
      };
    };
  };

  public shared ({ caller }) func assignAsistenmuToLayananku(layanankuId : Text, asistenmuPrincipalId : Text) : async Bool {
    let callerProfile = switch (getCallerProfile(caller)) {
      case (null) { Runtime.trap("Unauthorized") };
      case (?up) { up };
    };

    if (not isAdminOrHigher(callerProfile.role)) {
      Runtime.trap("Unauthorized");
    };

    let layananku = switch (layanankuById.get(layanankuId)) {
      case (null) { Runtime.trap("Layananku not found") };
      case (?l) { l };
    };

    let asistenmuProfile = switch (userProfilesByPrincipal.entries().find(func((p, up)) { up.principalId == asistenmuPrincipalId and up.role == "ASISTENMU" })) {
      case (null) { Runtime.trap("Invalid asistenmuPrincipalId") };
      case (?(_, asistenmu)) { asistenmu };
    };

    let updatedLayananku : LayanankuRecord.LayanankuRecord = {
      layananku with
      asistenmuPrincipalId = ?asistenmuPrincipalId;
      asistenmuNameSnapshot = switch (asistenmuProfile.internalData) {
        case (null) { null };
        case (?internalData) { ?internalData.name };
      };
    };

    layanankuById.add(layanankuId, updatedLayananku);

    let currentClientLayananku = switch (layanankuByClientId.get(layananku.clientId)) {
      case (null) { [] };
      case (?existing) { existing };
    };
    let updatedClientLayananku = currentClientLayananku.map(
      func(l : LayanankuRecord.LayanankuRecord) : LayanankuRecord.LayanankuRecord {
        if (l.id == layanankuId) { updatedLayananku } else { l };
      }
    );
    layanankuByClientId.add(layananku.clientId, updatedClientLayananku);

    recordAuditLog(caller, #updateCodeData, "Assign Asistenmu to Layananku " # layanankuId);

    true;
  };

  public query ({ caller }) func getAsistenmuCandidates() : async [AsistenmuCandidateDTO.AsistenmuCandidateDTO] {
    let callerProfile = switch (getCallerProfile(caller)) {
      case (null) { Runtime.trap("Unauthorized") };
      case (?profile) { profile };
    };

    if (not isAdminOrHigher(callerProfile.role)) {
      Runtime.trap("Unauthorized");
    };

    let users = userProfilesByPrincipal.values().toArray();
    let asistenmuCandidates = users.filter(
      func(profile) {
        profile.role == "ASISTENMU";
      }
    );

    asistenmuCandidates.map(
      func(profile) {
        let name = switch (profile.internalData) {
          case (null) { "" };
          case (?data) { data.name };
        };

        {
          principalId = profile.principalId;
          name;
          role = profile.role;
          status = profile.status;
        };
      }
    );
  };

  private func principalHasAccess(principalText : Text, layanankuRecord : LayanankuRecord.LayanankuRecord) : Bool {
    layanankuRecord.sharePrincipals.any(func(p : Text) : Bool { p == principalText });
  };

  private func computeLayananStatus(now : Nat, startAt : Nat, endAt : Nat) : LayanankuStatus.LayananStatus {
    if (now < startAt) { #inactive }
    else if (now <= endAt) { #active }
    else { #expired };
  };

  private func toPublic(layananku : LayanankuRecord.LayanankuRecord) : LayanankuRecord.LayanankuPublic {
    {
      id = layananku.id;
      kind = layananku.kind;
      startAt = layananku.startAt;
      endAt = layananku.endAt;
      status = layananku.status;
      sharePrincipals = layananku.sharePrincipals;
      createdAt = layananku.createdAt;
      updatedAt = layananku.updatedAt;
    };
  };

  private func recordAuditLog(caller : Principal, actionType : AuditLogEntry.AuditActionType, metadata : Text) : () {
    auditLogCounter += 1;
    let entry : AuditLogEntry.AuditLogEntry = {
      timestamp = auditLogCounter;
      principalId = caller.toText();
      actionType;
      metadata;
    };
    auditLogs.add(auditLogCounter, entry);
  };

  public shared ({ caller }) func createTask(
    title : Text,
    description : Text,
    clientDeadline : ?Nat,
    requestType : MinimalTask.RequestType
  ) : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized");
    };

    let callerProfile = switch (getCallerProfile(caller)) {
      case (null) {
        Runtime.trap("Unauthorized");
      };
      case (?p) { p };
    };

    if (normalizeRole(callerProfile.role) != "CLIENT") {
      Runtime.trap("Unauthorized: Only CLIENT can create tasks");
    };

    if (not (await myHasActiveLayananku())) {
      Runtime.trap("No active Layananku");
    };

    let taskId = generateTaskId();
    let now = Int.abs(Time.now());

    let task : MinimalTask.TaskRecord = {
      taskId;
      clientId = callerProfile.id;
      createdByPrincipal = caller;
      title;
      description;
      clientDeadline;
      internalDeadline = null;
      assignedPartnerId = null;
      assignedAsistenmuName = "";
      statusInternal = #REQUESTED;
      createdAt = now;
      updatedAt = now;
      requestType = requestType;
    };

    tasksById.add(taskId, task);

    let currentClientTasks = switch (taskIdsByClientId.get(callerProfile.id)) {
      case (null) { [] };
      case (?existing) { existing };
    };
    taskIdsByClientId.add(callerProfile.id, currentClientTasks.concat([taskId]));

    taskId;
  };

  public query ({ caller }) func getMyClientTasks() : async [MinimalTask.TaskRecord] {
    let callerProfile = switch (getCallerProfile(caller)) {
      case (null) { return [] };
      case (?p) { p };
    };

    if (normalizeRole(callerProfile.role) != "CLIENT") {
      return [];
    };

    let taskIds = switch (taskIdsByClientId.get(callerProfile.id)) {
      case (null) { return [] };
      case (?ids) { ids };
    };

    let validTasks = taskIds.filter(
      func(taskId) {
        switch (tasksById.get(taskId)) {
          case (null) { false };
          case (?_) { true };
        };
      }
    );

    validTasks.map(
      func(taskId) {
        switch (tasksById.get(taskId)) {
          case (null) { Runtime.trap("should never happen") };
          case (?task) { task };
        };
      }
    );
  };

  public query ({ caller }) func getMyPartnerTasks() : async [MinimalTask.TaskRecord] {
    if (caller.isAnonymous()) { return [] };

    let callerProfile = switch (getCallerProfile(caller)) {
      case (null) { return [] };
      case (?p) { p };
    };

    if (normalizeRole(callerProfile.role) != "PARTNER") {
      return [];
    };

    let taskIds = switch (taskIdsByPartnerId.get(callerProfile.id)) {
      case (null) { return [] };
      case (?ids) { ids };
    };

    let validTasks = taskIds.filter(
      func(taskId) {
        switch (tasksById.get(taskId)) {
          case (null) { false };
          case (?_) { true };
        };
      }
    );

    validTasks.map(
      func(taskId) {
        switch (tasksById.get(taskId)) {
          case (null) { Runtime.trap("should never happen") };
          case (?task) { task };
        };
      }
    );
  };

  public shared ({ caller }) func assignTaskToPartner(
    taskId : Text,
    partnerId : Text,
    internalDeadline : ?Nat,
    asistenmuName : Text
  ) : async Bool {
    let callerProfile = switch (getCallerProfile(caller)) {
      case (null) { Runtime.trap("Unauthorized") };
      case (?p) { p };
    };

    let role = normalizeRole(callerProfile.role);
    if (role != "ASISTENMU" and not isAdminOrHigher(role)) {
      Runtime.trap("Unauthorized");
    };

    let partnerProfile = switch (userProfilesById.get(partnerId)) {
      case (null) { Runtime.trap("Partner not found") };
      case (?p) { p };
    };

    if (normalizeRole(partnerProfile.role) != "PARTNER") {
      Runtime.trap("Target is not a partner");
    };

    let task = switch (tasksById.get(taskId)) {
      case (null) { return false };
      case (?t) { t };
    };

    let updatedTask : MinimalTask.TaskRecord = {
      task with
      assignedPartnerId = ?partnerId;
      internalDeadline;
      assignedAsistenmuName = asistenmuName;
      statusInternal = #IN_PROGRESS;
      updatedAt = Int.abs(Time.now());
    };

    tasksById.add(taskId, updatedTask);

    let currentPartnerTasks = switch (taskIdsByPartnerId.get(partnerId)) {
      case (null) { [] };
      case (?existing) { existing };
    };
    taskIdsByPartnerId.add(partnerId, currentPartnerTasks.concat([taskId]));

    true;
  };

  public shared ({ caller }) func setTaskStatus(
    taskId : Text,
    statusInternal : MinimalTask.TaskStatusInternal
  ) : async Bool {
    let callerProfile = switch (getCallerProfile(caller)) {
      case (null) { Runtime.trap("Unauthorized") };
      case (?p) { p };
    };

    let role = normalizeRole(callerProfile.role);
    if (role != "ASISTENMU" and not isAdminOrHigher(role)) {
      Runtime.trap("Unauthorized");
    };

    let currentTask = switch (tasksById.get(taskId)) {
      case (null) { return false };
      case (?t) { t };
    };

    let updatedTask : MinimalTask.TaskRecord = {
      currentTask with
      statusInternal;
      updatedAt = Int.abs(Time.now());
    };
    tasksById.add(taskId, updatedTask);
    true;
  };

  public query ({ caller }) func getTaskById(taskId : Text) : async ?MinimalTask.TaskRecord {
    if (caller.isAnonymous()) {
      return null;
    };

    switch (getCallerProfile(caller), tasksById.get(taskId)) {
      case (null, null) { null };
      case (null, ?_) { Runtime.trap("Unauthorized") };
      case (?_, null) { return null };
      case (?callerProfile, ?task) {
        let role = normalizeRole(callerProfile.role);
        if (
          isAdminOrHigher(role) or
          role == "ASISTENMU" or
          (role == "CLIENT" and task.clientId == callerProfile.id) or
          (role == "PARTNER" and partnerMatch(task.assignedPartnerId, callerProfile.id))
        ) {
          ?task;
        } else {
          null;
        };
      };
    };
  };

  func partnerMatch(assignedPartnerId : ?Text, callerId : Text) : Bool {
    switch (assignedPartnerId) {
      case (null) { false };
      case (?id) { id == callerId };
    };
  };
};
