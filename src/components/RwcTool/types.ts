export interface FormDataInterface {
  investor1: {
    gender: string;
    dateOfBirth: string;
    employIncome: string;
    employRemainYears: string;
    superAmount: string;
  };
  investor2: {
    gender: string;
    dateOfBirth: string;
    employIncome: string;
    employRemainYears: string;
    superAmount: string;
  };
  spendPerWeek: number;
  ownHome: boolean;
  ownsInvestmentProperty: boolean;
  savingsAmount: string;
  sharesValue: string;
  investmentPropertyValue: string;
  investmentPropertyRentPerWeek: string;
  settings: {
    financialInvestmentsGrowthAllocation: number;
    abpPlatformFee: number;
    abpDefensiveFee: number;
    abpGrowthFee: number;
    lifetimeFundsSource: string;
    safetyNetInvestmentAllocation: number;
    investor1PaymentRate: number;
    investor2PaymentRate: number;
    personalAssets: number;
  };
  includeAgePension: boolean;
  includeAnnuity: boolean;
  hasPartner: boolean;
  // Age and birth month fields for calculation
  youAge: string;
  youBirthMonth: string;
  partnerAge: string;
  partnerBirthMonth: string;
  //employment fields
  youEmployed: boolean;
  partnerEmployed: boolean;
  // Contact information fields
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}
