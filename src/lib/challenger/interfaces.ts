export interface careplusProp {
  ValidFromDate: string;
  ValidToDate: string;
  DataTable: cpRateProp[];
}

export interface cpRateProp {
  Age: number;
  Male: number;
  Female: number;
}

export interface cpAnnuityEndMonth {
  Age: number;
  EndMonth: number;
}

export interface dlaProp {
  ValidFromDate: string;
  ValidToDate: string;
  Rates: dlaRateProp[];
}

export interface fiProp {
  ValidFromDate: string;
  ValidToDate: string;
  Rates: fiRateProp[];
}

export interface mlaProp {
  ValidFromDate: string;
  ValidToDate: string;
  Rates: mlaRateProp[];
}

export interface dlaRateProp {
  Age: number;
  WithPeriod: string;
  Gender: string;
  AgePayment80: number;
  AgePayment85: number;
  AgePayment90: number;
}

export interface dlaModel {
  Age: number;
  Gender: string;
  WithPeriod: number;
  Params: dlaParamModel[];
}

export interface dlaParamModel {
  CommencementAge: number;
  PaymentProfileEndMonth: number;
  DeferralPeriod: number;
  IndexationType: string;
  PreSwitchoverEndMonth: number;
}

export interface fiRateProp {
  Age: number;
  WithPeriod: string;
  Gender: string;
  Full: number;
  Partial: number;
  Nil: number;
  RBACashLinked: number;
}

export interface fiModel {
  Age: number;
  Gender: string;
  WithPeriod: number;
  PaymentProfileEndMonth: number;
  PreSwitchoverEndMonth: number;
  Params: fiParamModel[];
}

export interface fiParamModel {
  IndexationType: string;
}

export interface mlaRateProp {
  Age: number;
  WithPeriod: string;
  Gender: string;
  Cash: number;
  Conservative: number;
  ConsBalanced: number;
  Balanced: number;
  Growth: number;
}

export interface mlaModel {
  Age: number;
  Gender: string;
  WithPeriod: number;
  PaymentProfileEndMonth: number;
  PreSwitchoverEndMonth: number;
  Params: mlaParamModel[];
}

export interface mlaParamModel {
  IndexationType: string;
}
