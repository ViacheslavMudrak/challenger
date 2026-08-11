// ============================================================================
// Shared Types for PDF Components
// ============================================================================

export interface CalcDTO {
  DefaultDefensiveSuperAssetAllocation?: string;
  DefaultGrowthAsset?: string;
  AssetAllocChanged?: boolean;
  DefensiveSuperAssetAllocation?: string;
  GrowthAsset?: string;
  DefaultSuperAdminFee?: string;
  AdminFeeChanged?: boolean;
  SuperAdminFee?: string;
  DefaultDefensiveSuperFee?: string;
  DefaultGrowthSuperFee?: string;
  DefensiveInvestmentFeeChanged?: boolean;
  GrowthInvestmentFeeChanged?: boolean;
  DefensiveSuperFee?: string;
  GrowthSuperFee?: string;
  DefaultLifetimeFundsSource?: string;
  IncomeStreamChanged?: boolean;
  LifetimeFundsSource?: string;
  DefaultSafetyNetInvestmentAllocation?: string;
  InvestmentAllocChanged?: boolean;
  CalcSafetyNetInvestmentAllocation?: string;
  DefaultPersonalAssets?: string;
  PersonalAssetsChanged?: boolean;
  DefaultPerson1PaymentRate?: string;
  DefaultPerson2PaymentRate?: string;
  Investor1PaymentChanged?: boolean;
  Investor2PaymentChanged?: boolean;
  Person1PaymentRate?: string;
  Person2PaymentRate?: string;
}

export interface InputDTO {
  PersonalAssets?: string;
  Investor1Age?: string;
  Investor1Gender?: string;
  RelationshipStatus?: string;
  Investor2Gender?: string;
  Investor2Age?: string;
  Investor1SuperAmount?: string;
  Investor2SuperAmount?: string;
  InputSpendPerWeek?: string;
  ReceiveAgePension?: string;
  InputOwnHome?: string;
  InputSavingsAmount?: string;
  InputSharesValue?: string;
  InputInvestmentPropertyValue?: string;
  InputInvestmentPropertyRentPerWeek?: string;
  Investor1EmploymentIncome?: string;
  Investor1EmployRemainYears?: string;
  Investor2EmploymentIncome?: string;
  Investor2EmployRemainYears?: string;
}
