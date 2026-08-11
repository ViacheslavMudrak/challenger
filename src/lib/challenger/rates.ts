import { getFormattedDate } from './helpers';
import { getAccessToken } from 'lib/challenger/pricing';
import {
  careplusProp,
  cpRateProp,
  dlaProp,
  dlaModel,
  dlaRateProp,
  fiModel,
  fiRateProp,
  fiProp,
  mlaProp,
  mlaRateProp,
} from './interfaces';
import fs from 'fs';
import {
  getDLAParamsByGender,
  getEndMonthByAnnuityAge,
  getFIParamsByGender,
  getMLAParamsByGender,
} from './rateData';
import path from 'path';
import { unstable_cache as cache } from 'next/cache';
import {
  API_CAREPLUS_DATA_PATH,
  API_CAREPLUS_PATH,
  API_DLA_DATA_PATH,
  API_DLA_PATH,
  API_FI_DATA_PATH,
  API_FI_PATH,
  API_MLA_DATA_PATH,
  API_MLA_PATH,
} from './constants';
//import action from 'src/pages/api/action';

export enum Gender {
  Male = 'M',
  Female = 'F',
}

export enum FIIndexationType {
  Full = 'Cpi',
  Partial = 'CpiMinus2',
  Nil = 'None',
  RBALinked = 'RbaCashLinked',
}

export enum MLAIndexationType {
  Cash = 'MlCash',
  Conservative = 'MlConservative',
  ConservativeBalanced = 'MlConservativeBalanced',
  Balanced = 'MlBalanced',
  Growth = 'MlGrowth',
}

export const checkDirectory = (strPath: string) => {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), strPath));
    console.log('Process Directory', files);
    const filess = fs.readdirSync(strPath);
    console.log('Directory', filess);
  } catch (error) {
    console.error('Directory Error', error);
  }
};

const getAnnualPaymentAmount = (paymentAmount: number): number => {
  return paymentAmount || 0;
};

const getValidToDateString = (recentMondayDate: string): string => {
  const toDate = new Date(recentMondayDate);
  toDate.setDate(toDate.getDate() + 6);
  const validToDateString = getFormattedDate(toDate.toISOString(), 'YYYY-MM-DD');
  return validToDateString;
};

const getRecentMondayDate = (): string => {
  const australianDate = new Date().toLocaleDateString('en-US', { timeZone: 'Australia/Sydney' });
  const fromDate = new Date(australianDate);
  // while date is not Monday (1), go back previous day
  while (fromDate.getDay() != 1) {
    fromDate.setDate(fromDate.getDate() - 1);
    console.log('from date while loop', fromDate);
  }
  console.log('FromDate: ', fromDate);
  const validFromDateString = getFormattedDateForAPI(fromDate.toLocaleDateString('en-US'));
  return validFromDateString;
};

const getFormattedDateForAPI = (dateStr: string) => {
  const [month, date, year] = dateStr.split('/');
  return `${year}-${month?.length == 1 ? '0' + month : month}-${date?.length == 1 ? '0' + date : date}`;
};

const callRIFLApi = async (token: string, jsonData: string) => {
  const riflUrl = process.env.RIFL_URL || '';
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };
  try {
    let response = await fetch(riflUrl, {
      method: 'POST',
      headers,
      body: jsonData,
    });
    if (response?.status === 504) {
      response = await fetch(riflUrl, {
        method: 'POST',
        headers,
        body: jsonData,
      });
    }
    const data = await response.json();
    if (data.error) {
      throw new Error('Unable to get RIFL rates');
    }
    return data;
  } catch (error) {
    console.error('Fetch error', error);
  }
};

const getCarePlusByAgeAndGender = async (
  token: string,
  annuityAge: number,
  gender: Gender,
  currentDate: string
) => {
  const cpUrl = process.env.CAREPLUS_URL || '';
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };
  const australianAnnuityDate = new Date().toLocaleDateString('en-US', {
    timeZone: 'Australia/Sydney',
  });
  const annuityDOB = new Date(australianAnnuityDate);
  annuityDOB.setDate(annuityDOB.getDate() - 1);
  annuityDOB.setFullYear(annuityDOB.getFullYear() - (annuityAge + 1));
  const endMonth = getEndMonthByAnnuityAge(annuityAge, gender);
  const jsonData = `{
        "EffectiveDate": "${currentDate}",
        "Investor": {
            "DateOfBirth": "${getFormattedDateForAPI(annuityDOB.toLocaleDateString('en-US'))}",
            "Gender": "${gender.toString()}",
            "Reversion": 1
        },
        "InvestmentAmount": 100000,
        "PaymentFrequency": "Monthly",
        "InsuranceCoverageRate": 1,
        "CVPaymentProfiles": [
            {
                "Name": "Voluntary",
                "StartRate": 1,
                "EndRate": 0,
                "EndMonth": ${endMonth},
                "IsGuaranteed": false
            },
            {
                "Name": "Involuntary",
                "StartRate": 1,
                "EndRate": 0,
                "EndMonth": ${endMonth},
                "IsGuaranteed": true
            }
        ]
    }`;
  try {
    let response = await fetch(cpUrl, {
      method: 'POST',
      headers,
      body: jsonData,
    });

    if (response?.status == 504) {
      response = await fetch(cpUrl, {
        method: 'POST',
        headers,
        body: jsonData,
      });
    }
    const data = await response.json();
    //setTimeout(() => {}, 300); // added delay
    if (data.error) {
      throw new Error('Unable to get CarePlus rates');
    }
    return data;
  } catch (error) {
    console.error('Fetch error', error);
  }
};

// const checkRevalidation = (validToDate: string, tag: string) => {
//   const validTo = new Date(validToDate);
//   const currentDate = new Date();
//   if (validTo < currentDate) {
//     console.log('revalidate log called');
//     revalidateTag(tag);
//   }
// };

const carepluscache = cache(async (data: careplusProp) => data, [API_CAREPLUS_DATA_PATH], {
  tags: [API_CAREPLUS_PATH],
  revalidate: 1,
});

const dlacached = cache(async (data: dlaProp) => data, [API_DLA_DATA_PATH], {
  tags: [API_DLA_PATH],
  revalidate: 1,
});

const ficached = cache(async (data: fiProp) => data, [API_FI_DATA_PATH], {
  tags: [API_FI_PATH],
  revalidate: 1,
});

const mlacached = cache(async (data: mlaProp) => data, [API_MLA_DATA_PATH], {
  tags: [API_MLA_PATH],
  revalidate: 1,
});

export const clearPricingAPIJobData = async () => {
  console.log('Initiate Cache Clear');
  const careplusdata: careplusProp = {
    ValidFromDate: '',
    ValidToDate: '',
    DataTable: [],
  };
  const data = (await carepluscache(careplusdata)) as careplusProp;
  console.log('Careplus Cache:', data);
  const dlaData: dlaProp = {
    ValidFromDate: '',
    ValidToDate: '',
    Rates: [],
  };
  const dladata = (await dlacached(dlaData)) as dlaProp;
  console.log('DLA Cache:', dladata);
  const fiData: fiProp = {
    ValidFromDate: '',
    ValidToDate: '',
    Rates: [],
  };
  const fidata = (await ficached(fiData)) as fiProp;
  console.log('FI Cache:', fidata);
  const mlaData: mlaProp = {
    ValidFromDate: '',
    ValidToDate: '',
    Rates: [],
  };
  const mladata = (await mlacached(mlaData)) as mlaProp;
  console.log('MLA Cache:', mladata);
  console.log('Exited cache clear method');
};

const getCarePlusData = async (token: string) => {
  return generateCarePlusRates(token);
};

export const getCarePlusJobData = async () => {
  console.log('Inside CarePlusJob');
  const token = await getAccessToken();
  const data = (await getCarePlusData(token)) as careplusProp;
  cache(async () => data, [API_CAREPLUS_DATA_PATH], {
    tags: [API_CAREPLUS_PATH],
    revalidate: 86400,
  });
  console.log('CarePlusData after Job refresh:', data);
  return data;
};

export const getCarePlusTableData = async () => {
  const token = await getAccessToken();
  const data = (await getCachedCarePlusData(token)) as careplusProp;
  // if (data && data.ValidToDate) {
  //   console.log('inside CareplusvalidatToDate');
  //   const value = (await checkCarePlusRevalidation(data, data.ValidToDate, token)) as careplusProp;
  //   return value;
  // }
  console.log('When the page loads, carePlus data: ', data);
  return data;
};

export const checkCarePlusRevalidation = async (
  data: careplusProp,
  validToDate: string,
  token: string
) => {
  const validTo = new Date(validToDate);
  const currentDate = new Date();
  if (validTo < currentDate) {
    console.log('Inside checkCarePlusRevalidation');
    const value = (await getCarePlusData(token)) as careplusProp;
    return value;
  }
  return data;
};

const getCachedCarePlusData = cache(
  async (token: string) => generateCarePlusRates(token),
  [API_CAREPLUS_DATA_PATH],
  {
    tags: [API_CAREPLUS_PATH],
    revalidate: 86400,
  }
);

const generateCarePlusRates = async (token: string) => {
  const validFromDateString = getRecentMondayDate();
  const validToDateString = getValidToDateString(validFromDateString);
  const careplusdata: careplusProp = {
    ValidFromDate: validFromDateString,
    ValidToDate: validToDateString,
    DataTable: [],
  };
  console.log('Valid From Date', validFromDateString);
  console.log('Valid To Date', validToDateString);
  for (let i = 75; i <= 95; i = i + 5) {
    const maleRate = await getCarePlusByAgeAndGender(token, i, Gender.Male, validFromDateString);
    const femaleRate = await getCarePlusByAgeAndGender(
      token,
      i,
      Gender.Female,
      validFromDateString
    );
    const newCPRate: cpRateProp = {
      Age: i,
      Male: getAnnualPaymentAmount(maleRate?.data?.annualPaymentAmount),
      Female: getAnnualPaymentAmount(femaleRate?.data?.annualPaymentAmount),
    };

    careplusdata.DataTable.push(newCPRate);
  }
  //fs.writeFileSync(`${path}/careplus.json`, JSON.stringify(careplusdata, null, ' '));
  return careplusdata;
};

const getDLARates = async (token: string, currentDate: string, params: dlaModel[]) => {
  const dlaRates: dlaRateProp[] = [];
  for (const annuitant of params) {
    const rate: dlaRateProp = {
      Age: annuitant.Age,
      Gender: annuitant.Gender,
      WithPeriod: `${annuitant.WithPeriod} years`,
      AgePayment80: 0,
      AgePayment85: 0,
      AgePayment90: 0,
    };
    for (const dla of annuitant.Params) {
      const australianAnnuityDate = new Date().toLocaleDateString('en-US', {
        timeZone: 'Australia/Sydney',
      });
      const annuityDOB = new Date(australianAnnuityDate);
      annuityDOB.setDate(annuityDOB.getDate() - 1);
      annuityDOB.setFullYear(annuityDOB.getFullYear() - annuitant.Age);
      const jsonData = `{
        "EffectiveDate": "${currentDate}",
        "Investors": [
          {
            "DateOfBirth": "${getFormattedDateForAPI(annuityDOB.toLocaleDateString('en-US'))}",
            "Gender": "${annuitant.Gender}",
            "Reversion": 1
          }
        ],
        "InvestmentAmount": 10000,
        "PaymentFrequency": "Monthly",
        "CvPaymentProfiles": [
            {
                "Name": "Voluntary",
                "StartRate": 1,
                "EndRate": 0,
                "EndMonth": ${dla.PaymentProfileEndMonth},
                "IsGuaranteed": false,
                "PreSwitchoverEndMonth": null
            },
            {
                "Name": "Involuntary",
                "StartRate": 1,
                "EndRate": 1,
                "EndMonth": ${dla.PaymentProfileEndMonth},
                "IsGuaranteed": true,
                "PreSwitchoverEndMonth": ${dla.PreSwitchoverEndMonth}
            }
        ],
        "IsPaymentsSplit": false,
        "PrimaryInvestorSplitPercentage": 1,
        "DeferralPeriod": ${dla.DeferralPeriod},
        "IndexationType": "${dla.IndexationType}",
        "HurdleRate": 0,
        "FirstIndexationReviewPolicyAnniversary": 1,
        "IsValueGuaranteed": false
      }`;
      const data = await callRIFLApi(token, jsonData);
      if (data && data.success) {
        if (dla.CommencementAge === 80) {
          rate.AgePayment80 = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
        } else if (dla.CommencementAge === 85) {
          rate.AgePayment85 = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
        } else {
          rate.AgePayment90 = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
        }
      }
    }
    dlaRates.push(rate);
  }
  return dlaRates;
};

const generateDLARates = async (token: string) => {
  const validFromDateString = getRecentMondayDate();
  const validToDateString = getValidToDateString(validFromDateString);
  const dlaData: dlaProp = {
    ValidFromDate: validFromDateString,
    ValidToDate: validToDateString,
    Rates: [],
  };

  // get params and rates for Female
  const femaleParams = getDLAParamsByGender(Gender.Female.toString());
  const femaleRates = await getDLARates(token, validFromDateString, femaleParams);
  dlaData.Rates = dlaData.Rates.concat(femaleRates);

  // get params and rates for Male
  const maleParams = getDLAParamsByGender(Gender.Male.toString());
  const maleRates = await getDLARates(token, validFromDateString, maleParams);
  dlaData.Rates = dlaData.Rates.concat(maleRates);

  //fs.writeFileSync(`${path}/dla.json`, JSON.stringify(dlaData, null, ' '));
  return dlaData;
};

export const checkDLARevalidation = async (data: dlaProp, validToDate: string, token: string) => {
  const validTo = new Date(validToDate);
  const currentDate = new Date();
  if (validTo < currentDate) {
    console.log('Inside checkDLARevalidation');
    const value = (await getDLAData(token)) as dlaProp;
    return value;
  }
  return data;
};

const getCachedDLAData = cache(
  async (token: string) => generateDLARates(token),
  [API_DLA_DATA_PATH],
  {
    tags: [API_DLA_PATH],
    revalidate: 86400,
  }
);

/// get Flexible DLA table data from generated file
export const getDLATableData = async () => {
  const token = await getAccessToken();
  const data = (await getCachedDLAData(token)) as dlaProp;
  // if (data && data.ValidToDate) {
  //   console.log('inside DLAvalidatToDate');
  //   const value = (await checkDLARevalidation(data, data.ValidToDate, token)) as dlaProp;
  //   return value;
  // }
  return data;
};

const getDLAData = async (token: string) => {
  return generateDLARates(token);
};

export const getDLAJobData = async () => {
  console.log('Inside DLAJob');
  const token = await getAccessToken();
  const data = (await getDLAData(token)) as dlaProp;
  cache(async () => data, [API_DLA_DATA_PATH], { tags: [API_DLA_PATH], revalidate: 86400 });
  console.log('DLA after Job refresh:', data);
  return data;
};

const getFIRates = async (token: string, currentDate: string, params: fiModel[]) => {
  const fiRates: fiRateProp[] = [];
  for (const annuitant of params) {
    const rate: fiRateProp = {
      Age: annuitant.Age,
      Gender: annuitant.Gender,
      WithPeriod: `${annuitant.WithPeriod} years`,
      Full: 0,
      Partial: 0,
      Nil: 0,
      RBACashLinked: 0,
    };
    for (const fi of annuitant.Params) {
      const australianAnnuityDate = new Date().toLocaleDateString('en-US', {
        timeZone: 'Australia/Sydney',
      });
      const annuityDOB = new Date(australianAnnuityDate);
      annuityDOB.setDate(annuityDOB.getDate() - 1);
      annuityDOB.setFullYear(annuityDOB.getFullYear() - annuitant.Age);
      const jsonData = `{
        "EffectiveDate": "${currentDate}",
        "Investors": [
          {
            "DateOfBirth": "${getFormattedDateForAPI(annuityDOB.toLocaleDateString('en-US'))}",
            "Gender": "${annuitant.Gender}",
            "Reversion": 1
          }
        ],
        "InvestmentAmount": 100000,
        "PaymentFrequency": "Monthly",
        "CvPaymentProfiles": [
            {
                "Name": "Voluntary",
                "StartRate": 1,
                "EndRate": 0,
                "EndMonth": ${annuitant.PaymentProfileEndMonth},
                "IsGuaranteed": false,
                "PreSwitchoverEndMonth": null
            },
            {
                "Name": "Involuntary",
                "StartRate": 1,
                "EndRate": 1,
                "EndMonth": ${annuitant.PaymentProfileEndMonth},
                "IsGuaranteed": true,
                "PreSwitchoverEndMonth": ${annuitant.PreSwitchoverEndMonth}
            }
        ],
        "IsPaymentsSplit": false,
        "PrimaryInvestorSplitPercentage": 1,
        "DeferralPeriod": 0,
        "IndexationType": "${fi.IndexationType}",
        "HurdleRate": 0,
        "FirstIndexationReviewPolicyAnniversary": 1,
        "IsValueGuaranteed": false
      }`;
      const data = await callRIFLApi(token, jsonData);
      if (data && data.success) {
        switch (fi.IndexationType) {
          case FIIndexationType.Full.toString():
            rate.Full = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
          case FIIndexationType.Partial.toString():
            rate.Partial = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
          case FIIndexationType.Nil.toString():
            rate.Nil = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
          default:
            rate.RBACashLinked = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
        }
      }
    }
    fiRates.push(rate);
  }
  return fiRates;
};

const generateFIRates = async (token: string) => {
  const validFromDateString = getRecentMondayDate();
  const validToDateString = getValidToDateString(validFromDateString);
  const rateData: fiProp = {
    ValidFromDate: validFromDateString,
    ValidToDate: validToDateString,
    Rates: [],
  };

  // get params and rates for Female
  const femaleParams = getFIParamsByGender(Gender.Female.toString());
  const femaleRates = await getFIRates(token, validFromDateString, femaleParams);
  rateData.Rates = rateData.Rates.concat(femaleRates);

  // get params and rates for Male
  const maleParams = getFIParamsByGender(Gender.Male.toString());
  const maleRates = await getFIRates(token, validFromDateString, maleParams);
  rateData.Rates = rateData.Rates.concat(maleRates);

  //fs.writeFileSync(`${path}/flexibleIncome.json`, JSON.stringify(rateData, null, ' '));
  return rateData;
};

const getCachedFIData = cache(async (token: string) => generateFIRates(token), [API_FI_DATA_PATH], {
  tags: [API_FI_PATH],
  revalidate: 86400,
});

const getFIData = async (token: string) => {
  return generateFIRates(token);
};

export const getFIJobData = async () => {
  console.log('Inside FIJob');
  const token = await getAccessToken();
  const data = (await getFIData(token)) as fiProp;
  cache(async () => data, [API_FI_DATA_PATH], { tags: [API_FI_PATH], revalidate: 86400 });
  console.log('FI after Job refresh:', data);
  return data;
};

export const checkFIRevalidation = async (data: fiProp, validToDate: string, token: string) => {
  const validTo = new Date(validToDate);
  const currentDate = new Date();
  if (validTo < currentDate) {
    console.log('Inside checkFIRevalidation');
    const value = (await getFIData(token)) as fiProp;
    return value;
  }
  return data;
};

/// get Flexible Income table data from generated file
export const getFITableData = async () => {
  const token = await getAccessToken();
  const data = (await getCachedFIData(token)) as fiProp;
  // if (data && data.ValidToDate) {
  //   console.log('inside FIvalidatToDate');
  //   const value = (await checkFIRevalidation(data, data.ValidToDate, token)) as fiProp;
  //   return value;
  // }
  return data;
};

const getMLARates = async (token: string, currentDate: string, params: fiModel[]) => {
  const fiRates: mlaRateProp[] = [];
  for (const annuitant of params) {
    const rate: mlaRateProp = {
      Age: annuitant.Age,
      Gender: annuitant.Gender,
      WithPeriod: `${annuitant.WithPeriod} years`,
      Cash: 0,
      Conservative: 0,
      ConsBalanced: 0,
      Balanced: 0,
      Growth: 0,
    };
    for (const mla of annuitant.Params) {
      const australianAnnuityDate = new Date().toLocaleDateString('en-US', {
        timeZone: 'Australia/Sydney',
      });
      const annuityDOB = new Date(australianAnnuityDate);
      annuityDOB.setDate(annuityDOB.getDate() - 1);
      annuityDOB.setFullYear(annuityDOB.getFullYear() - annuitant.Age);
      const jsonData = `{
        "EffectiveDate": "${currentDate}",
        "Investors": [
          {
            "DateOfBirth": "${getFormattedDateForAPI(annuityDOB.toLocaleDateString('en-US'))}",
            "Gender": "${annuitant.Gender}",
            "Reversion": 1
          }
        ],
        "InvestmentAmount": 100000,
        "PaymentFrequency": "Monthly",
        "CvPaymentProfiles": [
            {
                "Name": "Voluntary",
                "StartRate": 1,
                "EndRate": 0,
                "EndMonth": ${annuitant.PaymentProfileEndMonth},
                "IsGuaranteed": false,
                "PreSwitchoverEndMonth": null
            },
            {
                "Name": "Involuntary",
                "StartRate": 1,
                "EndRate": 1,
                "EndMonth": ${annuitant.PaymentProfileEndMonth},
                "IsGuaranteed": true,
                "PreSwitchoverEndMonth": ${annuitant.PreSwitchoverEndMonth}
            }
        ],
        "IsPaymentsSplit": false,
        "PrimaryInvestorSplitPercentage": 1,
        "DeferralPeriod": 0,
        "IndexationType": "${mla.IndexationType}",
        "HurdleRate": 0,
        "FirstIndexationReviewPolicyAnniversary": 1,
        "IsValueGuaranteed": false
      }`;
      const data = await callRIFLApi(token, jsonData);
      if (data && data.success) {
        switch (mla.IndexationType) {
          case MLAIndexationType.Cash.toString():
            rate.Cash = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
          case MLAIndexationType.Conservative.toString():
            rate.Conservative = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
          case MLAIndexationType.ConservativeBalanced.toString():
            rate.ConsBalanced = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
          case MLAIndexationType.Balanced.toString():
            rate.Balanced = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
          default:
            rate.Growth = getAnnualPaymentAmount(data.data?.annualPaymentAmount);
        }
      }
    }
    fiRates.push(rate);
  }
  return fiRates;
};

const generateMLARates = async (token: string) => {
  const validFromDateString = getRecentMondayDate();
  const validToDateString = getValidToDateString(validFromDateString);
  const rateData: mlaProp = {
    ValidFromDate: validFromDateString,
    ValidToDate: validToDateString,
    Rates: [],
  };

  // get params and rates for Female
  const femaleParams = getMLAParamsByGender(Gender.Female.toString());
  const femaleRates = await getMLARates(token, validFromDateString, femaleParams);
  rateData.Rates = rateData.Rates.concat(femaleRates);

  // get params and rates for Male
  const maleParams = getMLAParamsByGender(Gender.Male.toString());
  const maleRates = await getMLARates(token, validFromDateString, maleParams);
  rateData.Rates = rateData.Rates.concat(maleRates);

  //fs.writeFileSync(`${path}/mla.json`, JSON.stringify(rateData, null, ' '));
  return rateData;
};

const getCachedMLAData = cache(
  async (token: string) => generateMLARates(token),
  [API_MLA_DATA_PATH],
  {
    tags: [API_MLA_PATH],
    revalidate: 86400,
  }
);

export const checkMLARevalidation = async (data: mlaProp, validToDate: string, token: string) => {
  const validTo = new Date(validToDate);
  const currentDate = new Date();
  if (validTo < currentDate) {
    console.log('Inside checkMLARevalidation');
    const value = (await getMLAData(token)) as mlaProp;
    return value;
  }
  return data;
};

/// get Flexible Income table data from generated file
export const getMLATableData = async () => {
  const token = await getAccessToken();
  const data = (await getCachedMLAData(token)) as mlaProp;
  // if (data && data.ValidToDate) {
  //   console.log('inside MLAvalidatToDate');
  //   const value = (await checkMLARevalidation(data, data.ValidToDate, token)) as mlaProp;
  //   return value;
  // }
  return data;
};

const getMLAData = async (token: string) => {
  return generateMLARates(token);
};

export const getMLAJobData = async () => {
  console.log('Inside MLAJob');
  const token = await getAccessToken();
  const data = (await getMLAData(token)) as mlaProp;
  cache(async () => data, [API_MLA_DATA_PATH], { tags: [API_MLA_PATH], revalidate: 86400 });
  console.log('MLA after Job refresh:', data);
  return data;
};
