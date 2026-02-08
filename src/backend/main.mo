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
import Iter "mo:core/Iter";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import UserApproval "user-approval/approval";

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

  type InternalUserDTO = {
    id : Text;
    name : Text;
    principalId : Text;
    role : Text;
    status : UserStatus.UserStatus;
  };

  type CustomerServiceUserDTO = {
    id : Text;
    name : Text;
    principalId : Text;
    status : UserStatus.UserStatus;
  };

  module AsistenmuCandidateDTO {
    public type AsistenmuCandidateDTO = {
      principalId : Text;
      name : Text;
      role : Text;
      status : UserStatus.UserStatus;
    };
  };

  module InternalLoginType {
    public type InternalLoginType = {
      #login;
      #register;
    };
  };

  module InternalAccessCode {
    public type InternalCodeType = {
      #codeA;
      #codeB;
    };

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
      level : PartnerLevel.PartnerLevel;
      hourlyRate : Nat;
    };
  };

  module PartnerLevel {
    public type PartnerLevel = {
      #level1;
      #level2;
      #level3;
      #level4;
      #level5;
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
      serviceQuantity : Nat;
    };

    public type ServicePublic = {
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
      unit : Text;
      estimatedTime : Text;
      estimatedTeamSize : Nat;
      status : Status;
      available : Bool;
      createdAt : Nat;
      updatedAt : Nat;
      serviceQuantity : Nat;
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

  module PartnerTaskDTO {
    public type TaskStatusInternal = {
      #REQUESTED;
      #IN_PROGRESS;
      #QA_ASISTENMU;
      #REVISION;
      #DONE;
    };

    public type TaskStatusInternalTab = {
      #NEW_TASKS;
      #ACTIVE;
      #QA;
      #COMPLETED;
    };

    public type PartnerTaskRecord = {
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
      requestType : MinimalTask.RequestType;
    };

    public type PartnerTaskDTO = {
      partnerId : Text;
      partnerName : Text;
      tasks : [PartnerTaskRecord];
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
  let approvalState = UserApproval.initState(accessControlState);
  include MixinAuthorization(accessControlState);

  var clientCounter = 0;
  var partnerCounter = 0;
  var customerServiceCounter = 0;
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
    "SUPERADMIN",
    "ADMIN",
    "ASISTENMU",
    "SUPERVISOR",
    "MANAGEMENT",
    "FINANCE",
    "CLIENT",
    "PARTNER",
    "CUSTOMER_SERVICE",
  ]);

  let internalRoles = Set.fromArray([
    "SUPERADMIN",
    "ADMIN",
    "ASISTENMU",
    "SUPERVISOR",
    "MANAGEMENT",
    "FINANCE",
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

  func canManageServices(role : Text) : Bool {
    let normalized = normalizeRole(role);
    normalized == "SUPERADMIN" or normalized == "ADMIN" or normalized == "FINANCE";
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
      level = #level1;
      hourlyRate = 0;
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

    let existingProfile = userProfilesByPrincipal.get(caller);
    switch (existingProfile) {
      case (null) {
        Runtime.trap("Unauthorized: Profile must be created through registration");
      };
      case (?existing) {
        if (existing.role != profile.role) {
          Runtime.trap("Unauthorized: Cannot change role");
        };
        if (existing.status != profile.status) {
          Runtime.trap("Unauthorized: Cannot change status");
        };
        if (existing.id != profile.id) {
          Runtime.trap("Unauthorized: Cannot change profile ID");
        };
      };
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

        Runtime.trap("Unauthorized: Cannot view this profile. Must be owner or ADMIN/SUPERADMIN");
      };
    };
  };

  public shared ({ caller }) func updateUserRole(userId : Text, newRole : Text) : async () {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot update roles");
    };

    let callerProfile = userProfilesByPrincipal.get(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: Only SUPERADMIN can update roles");
      };
      case (?profile) {
        if (normalizeRole(profile.role) != "SUPERADMIN") {
          Runtime.trap("Unauthorized: Only SUPERADMIN can update roles");
        };
      };
    };

    let targetProfile = userProfilesById.get(userId);
    switch (targetProfile) {
      case (null) {
        Runtime.trap("User not found: Cannot update role for non-existing user");
      };
      case (?profile) {
        if (not isValidRole(newRole)) {
          Runtime.trap("Invalid role: Cannot assign non-existing role");
        };

        let updatedProfile = {
          profile with role = normalizeRole(newRole)
        };

        userProfilesById.add(userId, updatedProfile);

        for ((principal, user) in userProfilesByPrincipal.entries()) {
          if (user.id == userId) {
            userProfilesByPrincipal.add(principal, updatedProfile);
          };
        };
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

  public shared ({ caller }) func registerPartner(
    name : Text,
    email : Text,
    whatsapp : Text,
    skills : Text,
    domisili : Text,
    level : PartnerLevel.PartnerLevel,
    hourlyRate : Nat,
  ) : async Text {
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
      level = level;
      hourlyRate = hourlyRate;
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

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (?profile) {
        if (normalizeRole(profile.role) != "SUPERADMIN") {
          Runtime.trap("Unauthorized: Only SUPERADMIN can register internal users");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: Only SUPERADMIN can register internal users");
      };
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
        if (not canManageServices(profile.role)) {
          Runtime.trap("Unauthorized: Only SUPERADMIN, ADMIN, or FINANCE can create services");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
    };

    services.add(service.id, service);
  };

  public shared ({ caller }) func activateService(serviceId : Text) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot activate services");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (?profile) {
        if (not canManageServices(profile.role)) {
          Runtime.trap("Unauthorized: Only SUPERADMIN, ADMIN, or FINANCE can activate services");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
    };

    switch (services.get(serviceId)) {
      case (null) { false };
      case (?service) {
        let updatedService = {
          service with
          status = #active;
          available = true;
          updatedAt = Int.abs(Time.now());
        };
        services.add(serviceId, updatedService);
        true;
      };
    };
  };

  public shared ({ caller }) func deactivateService(serviceId : Text) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot deactivate services");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (?profile) {
        if (not canManageServices(profile.role)) {
          Runtime.trap("Unauthorized: Only SUPERADMIN, ADMIN, or FINANCE can deactivate services");
        };
      };
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
    };

    switch (services.get(serviceId)) {
      case (null) { false };
      case (?service) {
        let updatedService = {
          service with
          status = #inactive;
          available = false;
          updatedAt = Int.abs(Time.now());
        };
        services.add(serviceId, updatedService);
        true;
      };
    };
  };

  public query ({ caller }) func getServiceById(serviceId : Text) : async ?Service.Service {
    if (caller.isAnonymous()) {
      return null;
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) { return null };
      case (?profile) {
        if (canManageServices(profile.role) or isAdminOrHigher(profile.role)) {
          return services.get(serviceId);
        } else {
          return null;
        };
      };
    };
  };

  public query ({ caller }) func getServiceByIdPublic(serviceId : Text) : async ?Service.ServicePublic {
    let service = services.get(serviceId);
    switch (service) {
      case (null) { null };
      case (?s) { ?toServicePublic(s) };
    };
  };

  public query ({ caller }) func getAllServices() : async [Service.Service] {
    if (caller.isAnonymous()) {
      return [];
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) { [] };
      case (?profile) {
        if (canManageServices(profile.role) or isAdminOrHigher(profile.role)) {
          services.values().toArray();
        } else {
          [];
        };
      };
    };
  };

  public query ({ caller }) func getAllServicesPublic() : async [Service.ServicePublic] {
    let allServices = services.values().toArray();
    allServices.map(toServicePublic);
  };

  private func toServicePublic(service : Service.Service) : Service.ServicePublic {
    {
      id = service.id;
      code = service.code;
      title = service.title;
      category = service.category;
      description = service.description;
      serviceType = service.serviceType;
      detailedInformation = service.detailedInformation;
      icon = service.icon;
      banner = service.banner;
      thumbnail = service.thumbnail;
      unit = service.unit;
      estimatedTime = service.estimatedTime;
      estimatedTeamSize = service.estimatedTeamSize;
      status = service.status;
      available = service.available;
      createdAt = service.createdAt;
      updatedAt = service.updatedAt;
      serviceQuantity = service.serviceQuantity;
    };
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

  public shared ({ caller }) func assignTaskToPartner(taskId : Text, partnerId : Text) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot assign tasks");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        if (not isValidInternalRole(profile.role)) {
          Runtime.trap("Unauthorized: Only internal staff can assign tasks to partners");
        };
      };
    };

    let taskOpt = tasksById.get(taskId);
    switch (taskOpt) {
      case (null) {
        Runtime.trap("Task not found");
      };
      case (?task) {
        let partnerProfile = userProfilesById.get(partnerId);
        switch (partnerProfile) {
          case (null) {
            Runtime.trap("Partner not found");
          };
          case (?partner) {
            if (normalizeRole(partner.role) != "PARTNER") {
              Runtime.trap("User is not a partner");
            };

            let updatedTask = {
              task with
              assignedPartnerId = ?partnerId;
              updatedAt = Int.abs(Time.now());
            };

            tasksById.add(taskId, updatedTask);

            let existingPartnerTasks = switch (taskIdsByPartnerId.get(partnerId)) {
              case (null) { [] };
              case (?tasks) { tasks };
            };
            let updatedPartnerTasks = existingPartnerTasks.concat([taskId]);
            taskIdsByPartnerId.add(partnerId, updatedPartnerTasks);

            true;
          };
        };
      };
    };
  };

  public shared ({ caller }) func setTaskStatus(taskId : Text, newStatus : MinimalTask.TaskStatusInternal) : async Bool {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot update task status");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        let taskOpt = tasksById.get(taskId);
        switch (taskOpt) {
          case (null) {
            Runtime.trap("Task not found");
          };
          case (?task) {
            let isTaskOwner = (task.clientId == profile.id);
            let isInternalStaff = isValidInternalRole(profile.role);
            let isAssignedPartner = switch (task.assignedPartnerId) {
              case (null) { false };
              case (?apId) { apId == profile.id };
            };

            if (not isTaskOwner and not isInternalStaff and not isAssignedPartner) {
              Runtime.trap("Unauthorized: Only task owner, assigned partner, or internal staff can update task status");
            };

            let updatedTask = {
              task with
              statusInternal = newStatus;
              updatedAt = Int.abs(Time.now());
            };

            tasksById.add(taskId, updatedTask);
            true;
          };
        };
      };
    };
  };

  public query ({ caller }) func searchServicesAndClientsById(searchInput : Text, searchMode : SearchMode) : async SearchResult {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot search services and clients");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        if (not isValidInternalRole(profile.role)) {
          Runtime.trap("Unauthorized: Only internal staff can search services and clients");
        };
      };
    };

    let servicesResults = findServicesByIdOrClientIds(searchInput, searchMode);
    let userResults = findClientsByIdOrPrincipal(searchInput, searchMode);

    {
      services = servicesResults;
      users = userResults;
    };
  };

  func findClientsByIdOrPrincipal(searchInput : Text, searchMode : SearchMode) : [UserProfile.UserProfile] {
    let clientsArray = userProfilesById.values().toArray().filter(func(p) { normalizeRole(p.role) == "CLIENT" });

    switch (searchMode) {
      case (#searchAll) {
        return clientsArray;
      };
      case (#searchByClientId) {
        clientsArray.filter(func(p) { p.id.contains(#text searchInput) });
      };
      case (#searchByClientPrincipal) {
        clientsArray.filter(func(p) { p.principalId.contains(#text searchInput) });
      };
    };
  };

  func findServicesByIdOrClientIds(searchInput : Text, searchMode : SearchMode) : [Service.Service] {
    let servicesArray = services.values().toArray();

    switch (searchMode) {
      case (#searchAll) {
        return servicesArray;
      };
      case (#searchByClientId) {
        servicesArray.filter(func(s) { s.id.contains(#text searchInput) });
      };
      case (#searchByClientPrincipal) {
        servicesArray.filter(func(s) { s.id.contains(#text searchInput) });
      };
    };
  };

  public query ({ caller }) func getMyPartnerTasks() : async PartnerTaskDTO.PartnerTaskDTO {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Caller must be authenticated");
    };

    let userProfile = getCallerProfile(caller);
    switch (userProfile) {
      case (null) {
        Runtime.trap("Unknown user: Caller must be a partner");
      };
      case (?up) {
        if (normalizeRole(up.role) != "PARTNER") {
          Runtime.trap("Caller must be a partner");
        };

        let partnerRecord = tasksById.values().toArray();
        let partnerTasks = partnerRecord.filter(
          func(tr) {
            switch (tr.assignedPartnerId) {
              case (null) { false };
              case (?apId) {
                apId == up.id;
              };
            };
          }
        );

        let clonedTasks = partnerTasks.map(
          func(t) {
            { t with assignedPartnerId = t.assignedPartnerId };
          }
        );

        {
          partnerId = up.id;
          partnerName = switch (up.partnerData) { case (null) { "_" }; case (?p) { p.name } };
          tasks = clonedTasks;
        };
      };
    };
  };

  public query ({ caller }) func getTaskById(taskId : Text) : async ?MinimalTask.TaskRecord {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view tasks");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        let taskOpt = tasksById.get(taskId);
        switch (taskOpt) {
          case (null) { return null };
          case (?task) {
            if (isValidInternalRole(profile.role)) {
              return ?task;
            };

            if (normalizeRole(profile.role) == "CLIENT" and task.clientId == profile.id) {
              return ?task;
            };

            if (normalizeRole(profile.role) == "PARTNER") {
              switch (task.assignedPartnerId) {
                case (null) {
                  Runtime.trap("Unauthorized: Cannot view this task");
                };
                case (?apId) {
                  if (apId == profile.id) {
                    return ?task;
                  } else {
                    Runtime.trap("Unauthorized: Cannot view this task");
                  };
                };
              };
            };

            Runtime.trap("Unauthorized: Cannot view this task");
          };
        };
      };
    };
  };

  public query ({ caller }) func getAllTasksInternal() : async [MinimalTask.TaskRecord] {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot view tasks");
    };

    let callerProfile = getCallerProfile(caller);
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: User profile not found");
      };
      case (?profile) {
        if (not isValidInternalRole(profile.role)) {
          Runtime.trap("Unauthorized: Only internal roles can view all tasks");
        };
        return tasksById.values().toArray();
      };
    };
  };

  public query ({ caller }) func getAllPartnersByStatus(status : UserStatus.UserStatus) : async [UserProfile.UserProfile] {
    onlySuperadminNotAnonymous(caller);

    let partnersArray = userProfilesById.values().toArray().filter(func(p) { normalizeRole(p.role) == "PARTNER" });
    partnersArray.filter(func(p) { p.status == status });
  };

  public query ({ caller }) func getAllInternalUsers() : async [InternalUserDTO] {
    onlySuperadminNotAnonymous(caller);

    let internalUsersArray = userProfilesById.values().toArray().filter(
      func(p) { isValidInternalRole(p.role) }
    );

    internalUsersArray.map(func(p) { { id = p.id; name = ""; principalId = p.principalId; role = p.role; status = p.status } });
  };

  public query ({ caller }) func getAllCustomerServiceUsers() : async [CustomerServiceUserDTO] {
    onlySuperadminNotAnonymous(caller);

    let csUsersArray = userProfilesById.values().toArray().filter(func(p) { normalizeRole(p.role) == "CUSTOMER_SERVICE" });

    csUsersArray.map(func(p) { { id = p.id; name = ""; principalId = p.principalId; status = p.status } });
  };

  public query ({ caller }) func searchUsersByMode(searchInput : Text, searchMode : SearchMode) : async [UserProfile.UserProfile] {
    onlySuperadminNotAnonymous(caller);

    let usersArray = userProfilesById.values().toArray();

    switch (searchMode) {
      case (#searchAll) {
        return usersArray;
      };
      case (#searchByClientId) {
        usersArray.filter(func(u) { u.id.contains(#text searchInput) });
      };
      case (#searchByClientPrincipal) {
        usersArray.filter(func(u) { u.principalId.contains(#text searchInput) });
      };
    };
  };

  func onlySuperadminNotAnonymous(caller : Principal) {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot access this function");
    };

    let callerProfile = getCallerProfile(caller);
    assertIsSuperadmin(callerProfile);
  };

  func assertIsSuperadmin(callerProfile : ?UserProfile.UserProfile) {
    switch (callerProfile) {
      case (null) {
        Runtime.trap("Unauthorized: Only SUPERADMIN can access this function");
      };
      case (?profile) {
        if (normalizeRole(profile.role) != "SUPERADMIN") {
          Runtime.trap("Unauthorized: Only SUPERADMIN can access this function");
        };
      };
    };
  };

  public shared ({ caller }) func approvePartner(partnerId : Text) : async () {
    onlySuperadminNotAnonymous(caller);
    updatePartnerStatusFromStatus(partnerId, #pending, #active);
  };

  public shared ({ caller }) func rejectPartner(partnerId : Text) : async () {
    onlySuperadminNotAnonymous(caller);
    updatePartnerStatusFromStatus(partnerId, #pending, #suspended);
  };

  public shared ({ caller }) func suspendPartner(partnerId : Text) : async () {
    onlySuperadminNotAnonymous(caller);
    updatePartnerStatusFromStatus(partnerId, #active, #suspended);
  };

  public shared ({ caller }) func blacklistPartner(partnerId : Text) : async () {
    onlySuperadminNotAnonymous(caller);
    updatePartnerStatusFromStatus(partnerId, #active, #blacklisted);
    updatePartnerStatusFromStatus(partnerId, #suspended, #blacklisted);
  };

  public shared ({ caller }) func reactivatePartner(partnerId : Text) : async () {
    onlySuperadminNotAnonymous(caller);
    updatePartnerStatusFromStatus(partnerId, #suspended, #active);
  };

  private func updatePartnerStatusFromStatus(partnerId : Text, fromStatus : UserStatus.UserStatus, toStatus : UserStatus.UserStatus) {
    let partnerProfile = userProfilesById.get(partnerId);
    switch (partnerProfile) {
      case (null) {
        Runtime.trap("Partner not found");
      };
      case (?profile) {
        if (profile.status != fromStatus) {
          Runtime.trap("Invalid status transition: Partner must be in #" # debug_show fromStatus # " status");
        };

        let updatedProfile = {
          profile with status = toStatus
        };

        userProfilesById.add(partnerId, updatedProfile);
        updateUserProfilesByPrincipal(partnerId, updatedProfile);
      };
    };
  };

  private func updateUserProfilesByPrincipal(userId : Text, updatedProfile : UserProfile.UserProfile) {
    for ((principal, user) in userProfilesByPrincipal.entries()) {
      if (user.id == userId) {
        userProfilesByPrincipal.add(principal, updatedProfile);
      };
    };
  };

  public shared ({ caller }) func updatePartnerLevelAndHourlyRate(partnerId : Text, level : PartnerLevel.PartnerLevel, hourlyRate : Nat) : async () {
    onlySuperadminNotAnonymous(caller);

    let partnerProfile = userProfilesById.get(partnerId);
    switch (partnerProfile) {
      case (null) {
        Runtime.trap("Partner not found");
      };
      case (?profile) {
        let updatedPartnerData = createUpdatedPartnerData(profile.partnerData, level, hourlyRate);
        let updatedProfile = {
          profile with
          partnerData = updatedPartnerData;
        };

        userProfilesById.add(partnerId, updatedProfile);
        updateUserProfilesByPrincipal(partnerId, updatedProfile);
      };
    };
  };

  private func createUpdatedPartnerData(currentPartnerData : ?PartnerRegistrationData.PartnerRegistrationData, level : PartnerLevel.PartnerLevel, hourlyRate : Nat) : ?PartnerRegistrationData.PartnerRegistrationData {
    switch (currentPartnerData) {
      case (null) {
        ?{
          name = "";
          email = "";
          whatsapp = "";
          skills = "";
          domisili = "";
          level = level;
          hourlyRate = hourlyRate;
        };
      };
      case (?partnerData) {
        ?{
          partnerData with
          level = level;
          hourlyRate = hourlyRate;
        };
      };
    };
  };

  public shared ({ caller }) func createNewPartnerProposal(_partnerDetails : PartnerRegistrationData.PartnerRegistrationData) : async Text {
    onlySuperadminNotAnonymous(caller);
    "NewPartnerProposalTestId";
  };

  public shared ({ caller }) func approvePartnerProposal(_proposalId : Text) : async () {
    onlySuperadminNotAnonymous(caller);
  };

  public shared ({ caller }) func rejectPartnerProposal(_proposalId : Text) : async () {
    onlySuperadminNotAnonymous(caller);
  };

  public shared ({ caller }) func registerCustomerServiceUser() : async Text {
    if (caller.isAnonymous()) {
      Runtime.trap("Unauthorized: Anonymous users cannot register");
    };

    switch (getCallerProfile(caller)) {
      case (?_) {
        Runtime.trap("User already has a profile");
      };
      case (null) {};
    };

    customerServiceCounter += 1;
    let paddedNumber = customerServiceCounter.toText();
    let padding = paddedNumber.size();
    var zeros = "";
    var i = padding;
    while (i < 6) {
      zeros := zeros # "0";
      i += 1;
    };

    let userId = "CS-" # zeros # paddedNumber;
    let profile : UserProfile.UserProfile = {
      id = userId;
      principalId = caller.toText();
      role = "CUSTOMER_SERVICE";
      status = #pending;
      clientData = null;
      partnerData = null;
      internalData = null;
    };

    userProfilesById.add(userId, profile);
    userProfilesByPrincipal.add(caller, profile);

    userId;
  };

  public type SearchMode = {
    #searchAll;
    #searchByClientId;
    #searchByClientPrincipal;
  };

  public type SearchResult = {
    users : [UserProfile.UserProfile];
    services : [Service.Service];
  };

  public query ({ caller }) func getActiveClientProfiles() : async [UserProfile.UserProfile] {
    onlySuperadminNotAnonymous(caller);
    userProfilesById.values().toArray().filter(func(p) { p.status == #active and p.clientData != null });
  };

  public query ({ caller }) func isCallerApproved() : async Bool {
    AccessControl.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
    UserApproval.listApprovals(approvalState);
  };

  // ========== Access Code Functionality ==========

  public shared ({ caller }) func verifyAccessCode(code : Text) : async ?InternalLoginType.InternalLoginType {
    // No authorization check - this is used for pre-authentication routing
    switch (internalCodes.get(code)) {
      case (?accessCode) {
        switch (accessCode.codeType) {
          case (#codeA) { ?#login };
          case (#codeB) { ?#register };
        };
      };
      case (null) { null };
    };
  };

  public shared ({ caller }) func manageAccessCode(codeType : InternalAccessCode.InternalCodeType, newCode : Text) : async () {
    onlySuperadminNotAnonymous(caller);

    let newInternalCode = {
      code = newCode;
      codeType = codeType;
      lastUpdated = Int.abs(Time.now());
    };
    internalCodes.add(newCode, newInternalCode);
  };

  public shared ({ caller }) func generateRandomAccessCode(codeType : InternalAccessCode.InternalCodeType, prefix : Text) : async Text {
    onlySuperadminNotAnonymous(caller);

    let timestamp = Int.abs(Time.now()).toText();
    let newCode = prefix # timestamp;
    let newInternalCode = {
      code = newCode;
      codeType = codeType;
      lastUpdated = Int.abs(Time.now());
    };
    internalCodes.add(newCode, newInternalCode);
    newCode;
  };

  public type AuditLogEntryList = [AuditLogEntry.AuditLogEntry];

  public query ({ caller }) func getAllAuditLogsSorted(_sortOrder : Text) : async AuditLogEntryList {
    onlySuperadminNotAnonymous(caller);

    let logs = auditLogs.values().toArray();
    logs;
  };

  public shared ({ caller }) func logAuditEntry(actionType : AuditLogEntry.AuditActionType, metadata : Text) : async () {
    onlySuperadminNotAnonymous(caller);

    auditLogCounter += 1;
    let newLog = {
      timestamp = Int.abs(Time.now());
      principalId = caller.toText();
      actionType;
      metadata;
    };
    auditLogs.add(auditLogCounter, newLog);
  };

  public query ({ caller }) func getAccessCodes() : async [InternalAccessCode.InternalAccessCode] {
    onlySuperadminNotAnonymous(caller);

    internalCodes.values().toArray();
  };
};
