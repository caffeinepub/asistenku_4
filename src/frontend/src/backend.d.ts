import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ServicePublic {
    id: string;
    status: Status;
    title: string;
    serviceQuantity: bigint;
    serviceType: string;
    thumbnail: string;
    code: string;
    icon: string;
    createdAt: bigint;
    unit: string;
    banner: string;
    description: string;
    available: boolean;
    updatedAt: bigint;
    category: string;
    estimatedTeamSize: bigint;
    estimatedTime: string;
    detailedInformation: string;
}
export interface SearchResult {
    users: Array<UserProfile>;
    services: Array<Service>;
}
export interface InternalRegistrationData {
    name: string;
    whatsapp: string;
    email: string;
}
export interface Task {
    id: string;
    title: string;
    paymentStatus: PaymentStatus;
    partnerTeamLeader: string;
    continuityFlag: boolean;
    clientSpecificRequirements: string;
    tags: string;
    extendedServiceDescription: string;
    taskStatus: TaskStatus;
    description: string;
    taskType: string;
    memberSlots: bigint;
    collaborativeFlag: boolean;
    internalProjectManager: string;
    prioritizedFlags: string;
    clientReferenceId: string;
    prioritizationScore: bigint;
    partnerTeamMembers: Array<string>;
    additionalServiceCost: bigint;
    overallTaskScore: bigint;
    onboardingMaterial: string;
    subtaskRequiredCount: bigint;
    serviceReference: string;
    schedule: Schedule;
}
export type AuditLogEntryList = Array<AuditLogEntry>;
export interface PartnerRegistrationData {
    name: string;
    hourlyRate: bigint;
    whatsapp: string;
    email: string;
    level: PartnerLevel;
    domisili: string;
    skills: string;
}
export interface ClientRegistrationData {
    name: string;
    whatsapp: string;
    email: string;
    company: string;
}
export interface AuditLogEntry {
    metadata: string;
    actionType: AuditActionType;
    timestamp: bigint;
    principalId: string;
}
export interface Service {
    id: string;
    additionalCost: bigint;
    status: Status;
    title: string;
    serviceQuantity: bigint;
    serviceType: string;
    thumbnail: string;
    code: string;
    icon: string;
    createdAt: bigint;
    unit: string;
    banner: string;
    description: string;
    available: boolean;
    updatedAt: bigint;
    estimatedTotal: bigint;
    maxDiscountPercent: bigint;
    category: string;
    estimatedTeamSize: bigint;
    price: bigint;
    estimatedTime: string;
    detailedInformation: string;
}
export interface Schedule {
    startTime?: string;
    allowsOvertime: boolean;
    endDate?: string;
    endTime?: string;
    additionalComments?: string;
    timezoneOffset?: bigint;
    includesWeekend: boolean;
    isRemote: boolean;
    startDate?: string;
}
export interface PartnerTaskDTO {
    tasks: Array<PartnerTaskRecord>;
    partnerName: string;
    partnerId: string;
}
export interface InternalUserDTO {
    id: string;
    status: UserStatus;
    name: string;
    role: string;
    principalId: string;
}
export interface InternalAccessCode {
    code: string;
    lastUpdated: bigint;
    codeType: InternalCodeType;
}
export interface PartnerTaskRecord {
    statusInternal: TaskStatusInternal;
    title: string;
    clientId: string;
    internalDeadline?: bigint;
    assignedPartnerId?: string;
    createdAt: bigint;
    description: string;
    assignedAsistenmuName: string;
    updatedAt: bigint;
    taskId: string;
    createdByPrincipal: Principal;
    requestType: RequestType;
    clientDeadline?: bigint;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface TaskRecord {
    statusInternal: TaskStatusInternal;
    title: string;
    clientId: string;
    internalDeadline?: bigint;
    assignedPartnerId?: string;
    createdAt: bigint;
    description: string;
    assignedAsistenmuName: string;
    updatedAt: bigint;
    taskId: string;
    createdByPrincipal: Principal;
    requestType: RequestType;
    clientDeadline?: bigint;
}
export interface UserProfile {
    id: string;
    status: UserStatus;
    partnerData?: PartnerRegistrationData;
    clientData?: ClientRegistrationData;
    internalData?: InternalRegistrationData;
    role: string;
    principalId: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum AuditActionType {
    changeCodeStatus = "changeCodeStatus",
    rotateCode = "rotateCode",
    viewCode = "viewCode",
    updateCodeData = "updateCodeData",
    copyCode = "copyCode",
    generateNewCode = "generateNewCode",
    toggleCodeVisibility = "toggleCodeVisibility"
}
export enum InternalCodeType {
    codeA = "codeA",
    codeB = "codeB"
}
export enum InternalLoginType {
    login = "login",
    register = "register"
}
export enum PartnerLevel {
    level1 = "level1",
    level2 = "level2",
    level3 = "level3",
    level4 = "level4",
    level5 = "level5"
}
export enum PaymentStatus {
    pending = "pending",
    overpaid = "overpaid",
    paid = "paid",
    refunded = "refunded",
    unpaid = "unpaid",
    partial = "partial"
}
export enum RequestType {
    PRIORITY = "PRIORITY",
    URGENT = "URGENT",
    NORMAL = "NORMAL"
}
export enum SearchMode {
    searchByClientId = "searchByClientId",
    searchByClientPrincipal = "searchByClientPrincipal",
    searchAll = "searchAll"
}
export enum Status {
    outdated = "outdated",
    review = "review",
    active = "active",
    pending = "pending",
    inactive = "inactive",
    delisted = "delisted",
    archived = "archived"
}
export enum TaskStatus {
    canceled = "canceled",
    open = "open",
    completed = "completed",
    pendingForReview = "pendingForReview",
    revising = "revising",
    inProgress = "inProgress"
}
export enum TaskStatusInternal {
    REQUESTED = "REQUESTED",
    REVISION = "REVISION",
    DONE = "DONE",
    IN_PROGRESS = "IN_PROGRESS",
    QA_ASISTENMU = "QA_ASISTENMU"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum UserStatus {
    active = "active",
    pending = "pending",
    suspended = "suspended",
    blacklisted = "blacklisted"
}
export interface backendInterface {
    activateService(serviceId: string): Promise<boolean>;
    approvePartner(partnerId: string): Promise<void>;
    approvePartnerProposal(_proposalId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignTaskToPartner(taskId: string, partnerId: string): Promise<boolean>;
    blacklistPartner(partnerId: string): Promise<void>;
    claimSuperadmin(): Promise<string>;
    createNewPartnerProposal(_partnerDetails: PartnerRegistrationData): Promise<string>;
    createService(service: Service): Promise<void>;
    createTaskLegacy(task: Task): Promise<void>;
    deactivateService(serviceId: string): Promise<boolean>;
    generateRandomAccessCode(codeType: InternalCodeType, prefix: string): Promise<string>;
    getAccessCodes(): Promise<Array<InternalAccessCode>>;
    getActiveClientProfiles(): Promise<Array<UserProfile>>;
    getAllAuditLogsSorted(_sortOrder: string): Promise<AuditLogEntryList>;
    getAllInternalUsers(): Promise<Array<InternalUserDTO>>;
    getAllPartnersByStatus(status: UserStatus): Promise<Array<UserProfile>>;
    getAllServices(): Promise<Array<Service>>;
    getAllServicesPublic(): Promise<Array<ServicePublic>>;
    getAllTasksInternal(): Promise<Array<TaskRecord>>;
    getAllTasksLegacy(): Promise<Array<Task>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDefaultPartnerProfile(): Promise<UserProfile>;
    getMyPartnerTasks(): Promise<PartnerTaskDTO>;
    getServiceById(serviceId: string): Promise<Service | null>;
    getServiceByIdPublic(serviceId: string): Promise<ServicePublic | null>;
    getTaskById(taskId: string): Promise<TaskRecord | null>;
    getTaskLegacy(taskId: string): Promise<Task | null>;
    getUserProfile(userId: string): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    isValidRoleName(roleName: string): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    logAuditEntry(actionType: AuditActionType, metadata: string): Promise<void>;
    manageAccessCode(codeType: InternalCodeType, newCode: string): Promise<void>;
    reactivatePartner(partnerId: string): Promise<void>;
    registerClient(name: string, email: string, whatsapp: string, company: string): Promise<string>;
    registerInternalUser(role: string, name: string, email: string, whatsapp: string): Promise<string>;
    registerPartner(name: string, email: string, whatsapp: string, skills: string, domisili: string, level: PartnerLevel, hourlyRate: bigint): Promise<string>;
    rejectPartner(partnerId: string): Promise<void>;
    rejectPartnerProposal(_proposalId: string): Promise<void>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchServicesAndClientsById(searchInput: string, searchMode: SearchMode): Promise<SearchResult>;
    searchUsersByMode(searchInput: string, searchMode: SearchMode): Promise<Array<UserProfile>>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    setTaskStatus(taskId: string, newStatus: TaskStatusInternal): Promise<boolean>;
    suspendPartner(partnerId: string): Promise<void>;
    updatePartnerLevelAndHourlyRate(partnerId: string, level: PartnerLevel, hourlyRate: bigint): Promise<void>;
    updateUserRole(userId: string, newRole: string): Promise<void>;
    verifyAccessCode(code: string): Promise<InternalLoginType | null>;
}
