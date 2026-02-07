import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LayanankuPublic {
    id: string;
    status: LayananStatus;
    startAt: bigint;
    sharePrincipals: Array<string>;
    kind: LayananKind;
    createdAt: bigint;
    endAt: bigint;
    updatedAt: bigint;
}
export interface InternalRegistrationData {
    name: string;
    whatsapp: string;
    email: string;
}
export interface FinancialSummary {
    completedPayouts: bigint;
    totalPayoutAmount: bigint;
    completedTransactions: bigint;
    totalTransactionAmount: bigint;
}
export interface ClientRegistrationData {
    name: string;
    whatsapp: string;
    email: string;
    company: string;
}
export interface FinancialPartnerData {
    id: string;
    status?: string;
    balance: bigint;
    partnerName: string;
    availableBalance: bigint;
    nbUpdate?: string;
    pendingWithdrawals: bigint;
    createdAt?: string;
    history: Array<string>;
    partnerId: string;
    insured: bigint;
    bonus: bigint;
    totalEarnings: bigint;
    withdrawn: bigint;
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
export interface Service {
    id: string;
    additionalCost: bigint;
    status: Status;
    title: string;
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
export interface AsistenmuCandidateDTO {
    status: UserStatus;
    name: string;
    role: string;
    principalId: string;
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
export interface LayanankuRecord {
    id: string;
    status: LayananStatus;
    clientId: string;
    startAt: bigint;
    sharePrincipals: Array<string>;
    kind: LayananKind;
    createdAt: bigint;
    endAt: bigint;
    hargaPerLayanan: bigint;
    updatedAt: bigint;
    asistenmuPrincipalId?: string;
    asistenmuNameSnapshot?: string;
}
export interface ExtendedLayanankuRecord {
    id: string;
    status: LayananStatus;
    clientId: string;
    startAt: bigint;
    sharePrincipals: Array<string>;
    kind: LayananKind;
    createdAt: bigint;
    asistenmuName?: string;
    endAt: bigint;
    hargaPerLayanan: bigint;
    updatedAt: bigint;
    asistenmuPrincipalId?: string;
}
export interface PartnerRegistrationData {
    name: string;
    whatsapp: string;
    email: string;
    domisili: string;
    skills: string;
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
export enum LayananKind {
    JAGA = "JAGA",
    RAPI = "RAPI",
    FOKUS = "FOKUS",
    TENANG = "TENANG"
}
export enum LayananStatus {
    active = "active",
    expired = "expired",
    inactive = "inactive"
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
    assignAsistenmuToLayananku(layanankuId: string, asistenmuPrincipalId: string): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    assignTaskToPartner(taskId: string, partnerId: string, internalDeadline: bigint | null, asistenmuName: string): Promise<boolean>;
    claimSuperadmin(): Promise<string>;
    createFinancialPartnerData(data: FinancialPartnerData): Promise<void>;
    createLayanankuForClient(clientId: string, kind: LayananKind, startAt: bigint, endAt: bigint, sharePrincipals: Array<string>, hargaPerLayanan: bigint): Promise<string>;
    createService(service: Service): Promise<void>;
    createTask(title: string, description: string, clientDeadline: bigint | null, requestType: RequestType): Promise<string>;
    createTaskLegacy(task: Task): Promise<void>;
    deactivateLayananku(idLayanan: string): Promise<boolean>;
    getAllFinancialPartnerData(): Promise<Array<FinancialPartnerData>>;
    getAllServices(): Promise<Array<Service>>;
    getAllTasksLegacy(): Promise<Array<Task>>;
    getAsistenmuCandidates(): Promise<Array<AsistenmuCandidateDTO>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getDefaultPartnerProfile(): Promise<UserProfile>;
    getFinancialPartnerDataById(walletId: string): Promise<FinancialPartnerData | null>;
    getFinancialSummary(): Promise<FinancialSummary>;
    getLayanankuForClient(clientId: string): Promise<Array<ExtendedLayanankuRecord>>;
    getLayanankuInternal(idLayanan: string): Promise<LayanankuRecord | null>;
    getMyClientTasks(): Promise<Array<TaskRecord>>;
    getMyLayananku(): Promise<Array<LayanankuPublic>>;
    getMyPartnerTasks(): Promise<Array<TaskRecord>>;
    getMyWallet(): Promise<FinancialPartnerData>;
    getServiceById(serviceId: string): Promise<Service | null>;
    getTaskById(taskId: string): Promise<TaskRecord | null>;
    getTaskLegacy(taskId: string): Promise<Task | null>;
    getUserProfile(userId: string): Promise<UserProfile | null>;
    hasActiveLayananku(clientId: string): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isValidRoleName(roleName: string): Promise<boolean>;
    myHasActiveLayananku(): Promise<boolean>;
    registerClient(name: string, email: string, whatsapp: string, company: string): Promise<string>;
    registerInternalUser(role: string, name: string, email: string, whatsapp: string): Promise<string>;
    registerPartner(name: string, email: string, whatsapp: string, skills: string, domisili: string): Promise<string>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setTaskStatus(taskId: string, statusInternal: TaskStatusInternal): Promise<boolean>;
    updateLayanankuShare(idLayanan: string, newSharePrincipals: Array<string>): Promise<boolean>;
}
