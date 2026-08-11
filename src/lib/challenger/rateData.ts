import { cpAnnuityEndMonth, dlaModel, fiModel, mlaModel } from './interfaces';

export enum Gender {
  Male = 'M',
  Female = 'F',
}

const cpEndMonthMaleByAge: cpAnnuityEndMonth[] = [
  {
    Age: 75,
    EndMonth: 144,
  },
  {
    Age: 80,
    EndMonth: 108,
  },
  {
    Age: 85,
    EndMonth: 72,
  },
  {
    Age: 90,
    EndMonth: 48,
  },
  {
    Age: 95,
    EndMonth: 36,
  },
];

const cpEndMonthFemaleByAge: cpAnnuityEndMonth[] = [
  {
    Age: 75,
    EndMonth: 168,
  },
  {
    Age: 80,
    EndMonth: 120,
  },
  {
    Age: 85,
    EndMonth: 84,
  },
  {
    Age: 90,
    EndMonth: 60,
  },
  {
    Age: 95,
    EndMonth: 36,
  },
];

export const getEndMonthByAnnuityAge = (age: number, gender: Gender) => {
  if (gender.toString() == 'M') {
    const endMonth = cpEndMonthMaleByAge.filter((item) => item.Age === age)[0].EndMonth;
    return endMonth;
  } else {
    const endMonth = cpEndMonthFemaleByAge.filter((item) => item.Age === age)[0].EndMonth;
    return endMonth;
  }
};

const dlaData: dlaModel[] = [
  {
    Age: 65,
    Gender: 'F',
    WithPeriod: 22,
    Params: [
      {
        CommencementAge: 80,
        PaymentProfileEndMonth: 264,
        DeferralPeriod: 15,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 132,
      },
      {
        CommencementAge: 85,
        PaymentProfileEndMonth: 264,
        DeferralPeriod: 20,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 132,
      },
      {
        CommencementAge: 90,
        PaymentProfileEndMonth: 264,
        DeferralPeriod: 25,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 132,
      },
    ],
  },
  {
    Age: 65,
    Gender: 'M',
    WithPeriod: 20,
    Params: [
      {
        CommencementAge: 80,
        PaymentProfileEndMonth: 240,
        DeferralPeriod: 15,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 120,
      },
      {
        CommencementAge: 85,
        PaymentProfileEndMonth: 240,
        DeferralPeriod: 20,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 120,
      },
      {
        CommencementAge: 90,
        PaymentProfileEndMonth: 240,
        DeferralPeriod: 25,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 120,
      },
    ],
  },
  {
    Age: 70,
    Gender: 'F',
    WithPeriod: 18,
    Params: [
      {
        CommencementAge: 80,
        PaymentProfileEndMonth: 216,
        DeferralPeriod: 10,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 108,
      },
      {
        CommencementAge: 85,
        PaymentProfileEndMonth: 216,
        DeferralPeriod: 15,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 108,
      },
      {
        CommencementAge: 90,
        PaymentProfileEndMonth: 216,
        DeferralPeriod: 20,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 108,
      },
    ],
  },
  {
    Age: 70,
    Gender: 'M',
    WithPeriod: 16,
    Params: [
      {
        CommencementAge: 80,
        PaymentProfileEndMonth: 192,
        DeferralPeriod: 10,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 96,
      },
      {
        CommencementAge: 85,
        PaymentProfileEndMonth: 192,
        DeferralPeriod: 15,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 96,
      },
      {
        CommencementAge: 90,
        PaymentProfileEndMonth: 192,
        DeferralPeriod: 20,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 96,
      },
    ],
  },
  {
    Age: 75,
    Gender: 'F',
    WithPeriod: 14,
    Params: [
      {
        CommencementAge: 80,
        PaymentProfileEndMonth: 168,
        DeferralPeriod: 5,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 84,
      },
      {
        CommencementAge: 85,
        PaymentProfileEndMonth: 168,
        DeferralPeriod: 10,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 84,
      },
      {
        CommencementAge: 90,
        PaymentProfileEndMonth: 168,
        DeferralPeriod: 15,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 84,
      },
    ],
  },
  {
    Age: 75,
    Gender: 'M',
    WithPeriod: 12,
    Params: [
      {
        CommencementAge: 80,
        PaymentProfileEndMonth: 144,
        DeferralPeriod: 5,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 72,
      },
      {
        CommencementAge: 85,
        PaymentProfileEndMonth: 144,
        DeferralPeriod: 10,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 72,
      },
      {
        CommencementAge: 90,
        PaymentProfileEndMonth: 144,
        DeferralPeriod: 15,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 72,
      },
    ],
  },
  {
    Age: 80,
    Gender: 'F',
    WithPeriod: 10,
    Params: [
      {
        CommencementAge: 80,
        PaymentProfileEndMonth: 120,
        DeferralPeriod: 0,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 60,
      },
      {
        CommencementAge: 85,
        PaymentProfileEndMonth: 120,
        DeferralPeriod: 5,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 60,
      },
      {
        CommencementAge: 90,
        PaymentProfileEndMonth: 120,
        DeferralPeriod: 10,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 60,
      },
    ],
  },
  {
    Age: 80,
    Gender: 'M',
    WithPeriod: 9,
    Params: [
      {
        CommencementAge: 80,
        PaymentProfileEndMonth: 108,
        DeferralPeriod: 0,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 48,
      },
      {
        CommencementAge: 85,
        PaymentProfileEndMonth: 108,
        DeferralPeriod: 5,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 48,
      },
      {
        CommencementAge: 90,
        PaymentProfileEndMonth: 108,
        DeferralPeriod: 10,
        IndexationType: 'Cpi',
        PreSwitchoverEndMonth: 48,
      },
    ],
  },
];

export const getDLAParamsByGender = (gender: string) => {
  const params = dlaData.filter((item) => item.Gender === gender);
  return params;
};

const fiData: fiModel[] = [
  {
    Age: 65,
    Gender: 'F',
    WithPeriod: 22,
    PaymentProfileEndMonth: 264,
    PreSwitchoverEndMonth: 132,
    Params: [
      {
        IndexationType: 'Cpi',
      },
      {
        IndexationType: 'CpiMinus2',
      },
      {
        IndexationType: 'None',
      },
      {
        IndexationType: 'RbaCashLinked',
      },
    ],
  },
  {
    Age: 70,
    Gender: 'F',
    WithPeriod: 18,
    PaymentProfileEndMonth: 216,
    PreSwitchoverEndMonth: 108,
    Params: [
      {
        IndexationType: 'Cpi',
      },
      {
        IndexationType: 'CpiMinus2',
      },
      {
        IndexationType: 'None',
      },
      {
        IndexationType: 'RbaCashLinked',
      },
    ],
  },
  {
    Age: 75,
    Gender: 'F',
    WithPeriod: 14,
    PaymentProfileEndMonth: 168,
    PreSwitchoverEndMonth: 84,
    Params: [
      {
        IndexationType: 'Cpi',
      },
      {
        IndexationType: 'CpiMinus2',
      },
      {
        IndexationType: 'None',
      },
      {
        IndexationType: 'RbaCashLinked',
      },
    ],
  },
  {
    Age: 80,
    Gender: 'F',
    WithPeriod: 10,
    PaymentProfileEndMonth: 120,
    PreSwitchoverEndMonth: 60,
    Params: [
      {
        IndexationType: 'Cpi',
      },
      {
        IndexationType: 'CpiMinus2',
      },
      {
        IndexationType: 'None',
      },
      {
        IndexationType: 'RbaCashLinked',
      },
    ],
  },
  {
    Age: 65,
    Gender: 'M',
    WithPeriod: 20,
    PaymentProfileEndMonth: 240,
    PreSwitchoverEndMonth: 120,
    Params: [
      {
        IndexationType: 'Cpi',
      },
      {
        IndexationType: 'CpiMinus2',
      },
      {
        IndexationType: 'None',
      },
      {
        IndexationType: 'RbaCashLinked',
      },
    ],
  },
  {
    Age: 70,
    Gender: 'M',
    WithPeriod: 16,
    PaymentProfileEndMonth: 192,
    PreSwitchoverEndMonth: 96,
    Params: [
      {
        IndexationType: 'Cpi',
      },
      {
        IndexationType: 'CpiMinus2',
      },
      {
        IndexationType: 'None',
      },
      {
        IndexationType: 'RbaCashLinked',
      },
    ],
  },
  {
    Age: 75,
    Gender: 'M',
    WithPeriod: 12,
    PaymentProfileEndMonth: 144,
    PreSwitchoverEndMonth: 72,
    Params: [
      {
        IndexationType: 'Cpi',
      },
      {
        IndexationType: 'CpiMinus2',
      },
      {
        IndexationType: 'None',
      },
      {
        IndexationType: 'RbaCashLinked',
      },
    ],
  },
  {
    Age: 80,
    Gender: 'M',
    WithPeriod: 9,
    PaymentProfileEndMonth: 108,
    PreSwitchoverEndMonth: 48,
    Params: [
      {
        IndexationType: 'Cpi',
      },
      {
        IndexationType: 'CpiMinus2',
      },
      {
        IndexationType: 'None',
      },
      {
        IndexationType: 'RbaCashLinked',
      },
    ],
  },
];

export const getFIParamsByGender = (gender: string) => {
  const params = fiData.filter((item) => item.Gender === gender);
  return params;
};

const mlaData: mlaModel[] = [
  {
    Age: 65,
    Gender: 'F',
    WithPeriod: 22,
    PaymentProfileEndMonth: 264,
    PreSwitchoverEndMonth: 132,
    Params: [
      {
        IndexationType: 'MlBalanced',
      },
      {
        IndexationType: 'MlCash',
      },
      {
        IndexationType: 'MlConservative',
      },
      {
        IndexationType: 'MlConservativeBalanced',
      },
      {
        IndexationType: 'MlGrowth',
      },
    ],
  },
  {
    Age: 70,
    Gender: 'F',
    WithPeriod: 18,
    PaymentProfileEndMonth: 216,
    PreSwitchoverEndMonth: 108,
    Params: [
      {
        IndexationType: 'MlBalanced',
      },
      {
        IndexationType: 'MlCash',
      },
      {
        IndexationType: 'MlConservative',
      },
      {
        IndexationType: 'MlConservativeBalanced',
      },
      {
        IndexationType: 'MlGrowth',
      },
    ],
  },
  {
    Age: 75,
    Gender: 'F',
    WithPeriod: 14,
    PaymentProfileEndMonth: 168,
    PreSwitchoverEndMonth: 84,
    Params: [
      {
        IndexationType: 'MlBalanced',
      },
      {
        IndexationType: 'MlCash',
      },
      {
        IndexationType: 'MlConservative',
      },
      {
        IndexationType: 'MlConservativeBalanced',
      },
      {
        IndexationType: 'MlGrowth',
      },
    ],
  },
  {
    Age: 80,
    Gender: 'F',
    WithPeriod: 10,
    PaymentProfileEndMonth: 120,
    PreSwitchoverEndMonth: 60,
    Params: [
      {
        IndexationType: 'MlBalanced',
      },
      {
        IndexationType: 'MlCash',
      },
      {
        IndexationType: 'MlConservative',
      },
      {
        IndexationType: 'MlConservativeBalanced',
      },
      {
        IndexationType: 'MlGrowth',
      },
    ],
  },
  {
    Age: 65,
    Gender: 'M',
    WithPeriod: 20,
    PaymentProfileEndMonth: 240,
    PreSwitchoverEndMonth: 120,
    Params: [
      {
        IndexationType: 'MlBalanced',
      },
      {
        IndexationType: 'MlCash',
      },
      {
        IndexationType: 'MlConservative',
      },
      {
        IndexationType: 'MlConservativeBalanced',
      },
      {
        IndexationType: 'MlGrowth',
      },
    ],
  },
  {
    Age: 70,
    Gender: 'M',
    WithPeriod: 16,
    PaymentProfileEndMonth: 192,
    PreSwitchoverEndMonth: 96,
    Params: [
      {
        IndexationType: 'MlBalanced',
      },
      {
        IndexationType: 'MlCash',
      },
      {
        IndexationType: 'MlConservative',
      },
      {
        IndexationType: 'MlConservativeBalanced',
      },
      {
        IndexationType: 'MlGrowth',
      },
    ],
  },
  {
    Age: 75,
    Gender: 'M',
    WithPeriod: 12,
    PaymentProfileEndMonth: 144,
    PreSwitchoverEndMonth: 72,
    Params: [
      {
        IndexationType: 'MlBalanced',
      },
      {
        IndexationType: 'MlCash',
      },
      {
        IndexationType: 'MlConservative',
      },
      {
        IndexationType: 'MlConservativeBalanced',
      },
      {
        IndexationType: 'MlGrowth',
      },
    ],
  },
  {
    Age: 80,
    Gender: 'M',
    WithPeriod: 9,
    PaymentProfileEndMonth: 108,
    PreSwitchoverEndMonth: 48,
    Params: [
      {
        IndexationType: 'MlBalanced',
      },
      {
        IndexationType: 'MlCash',
      },
      {
        IndexationType: 'MlConservative',
      },
      {
        IndexationType: 'MlConservativeBalanced',
      },
      {
        IndexationType: 'MlGrowth',
      },
    ],
  },
];

export const getMLAParamsByGender = (gender: string) => {
  const params = mlaData.filter((item) => item.Gender === gender);
  return params;
};
