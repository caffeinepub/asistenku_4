import { PartnerLevel, UserStatus } from '@/backend';

/**
 * Maps UI partner level labels to backend PartnerLevel enum
 */
export function mapUILevelToBackend(uiLevel: 'JUNIOR' | 'SENIOR' | 'EXPERT'): PartnerLevel {
  switch (uiLevel) {
    case 'JUNIOR':
      return PartnerLevel.level1;
    case 'SENIOR':
      return PartnerLevel.level3;
    case 'EXPERT':
      return PartnerLevel.level5;
  }
}

/**
 * Maps backend PartnerLevel enum to UI level labels
 */
export function mapBackendLevelToUI(backendLevel: PartnerLevel): 'JUNIOR' | 'SENIOR' | 'EXPERT' {
  switch (backendLevel) {
    case PartnerLevel.level1:
    case PartnerLevel.level2:
      return 'JUNIOR';
    case PartnerLevel.level3:
    case PartnerLevel.level4:
      return 'SENIOR';
    case PartnerLevel.level5:
      return 'EXPERT';
  }
}

/**
 * Returns hourly rate for a given UI level
 */
export function getHourlyRateForLevel(uiLevel: 'JUNIOR' | 'SENIOR' | 'EXPERT'): bigint {
  switch (uiLevel) {
    case 'JUNIOR':
      return BigInt(35000);
    case 'SENIOR':
      return BigInt(55000);
    case 'EXPERT':
      return BigInt(75000);
  }
}

/**
 * Maps UI status string to backend UserStatus enum
 */
export function mapUIStatusToBackend(uiStatus: 'pending' | 'active' | 'suspended' | 'blacklisted'): UserStatus {
  switch (uiStatus) {
    case 'pending':
      return UserStatus.pending;
    case 'active':
      return UserStatus.active;
    case 'suspended':
      return UserStatus.suspended;
    case 'blacklisted':
      return UserStatus.blacklisted;
  }
}

/**
 * Formats hourly rate from bigint to display string
 */
export function formatHourlyRate(rate: bigint): string {
  return `Rp ${Number(rate).toLocaleString('id-ID')}`;
}
