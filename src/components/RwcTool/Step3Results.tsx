import { ValueDisplay } from './ValueDisplay';
import PromotionalCard from './PromotionalCard';
import { formatCurrency, toNumber } from 'lib/challenger/rwc';
import { FormDataInterface } from './types';

type Step3ResultsProps = {
  initialCalcResult?: Record<string, unknown> | null;
  calcResult?: Record<string, unknown> | null;
  formData?: FormDataInterface;
  yourSuperAloneYears?: number | null; // Number of years from Step1Form (without Age Pension) for "your super alone"
  numberOfIncomeYears?: number | null;
};

const Step3Results = ({
  initialCalcResult,
  calcResult,
  formData,
  yourSuperAloneYears,
  numberOfIncomeYears,
}: Step3ResultsProps) => {
  // Use null instead of defaults to avoid inaccurate calculations
  // No error messages - just proceed with null values

  // Extract api result same way Step3Boost does
  const api =
    calcResult && typeof calcResult === 'object' && Object.keys(calcResult).length > 0
      ? (calcResult as Record<string, unknown>)
      : null;

  // Extract savingsDuration same way Step3Boost does (using numberOfIncomeYears)
  const savingsDuration = api ? toNumber(api.numberOfIncomeYears) : null;

  // Get safety net investment allocation from formData settings (defaults to 30 if not set)
  const safetyNetAllocation =
    typeof formData?.settings?.safetyNetInvestmentAllocation === 'number'
      ? formData.settings.safetyNetInvestmentAllocation
      : 30;

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      {/* Left Column - Form Area with Placeholder */}
      <div className="flex-1">
        <h1 className="mb-4 font-roboto-700 text-2xl text-bright-navy sm:text-3xl md:text-4xl lg:text-[40px]">
          Let&apos;s recap.
        </h1>
        <div className="mb-8 mt-6 grid grid-cols-1 gap-6 rounded-sm bg-white p-4 font-roboto-700 text-bright-navy shadow-xl sm:p-6">
          <div className="w-full">Your super alone could last you:</div>
          <ValueDisplay
            value={
              yourSuperAloneYears !== null && yourSuperAloneYears !== undefined
                ? String(yourSuperAloneYears)
                : initialCalcResult?.yearsToRunOut
                  ? String(initialCalcResult.yearsToRunOut)
                  : '—'
            }
            label="years"
          />
          <div className="w-full">
            Your super plus any income, including Age Pension entitlements could last you:
          </div>
          <ValueDisplay
            value={
              numberOfIncomeYears !== null && numberOfIncomeYears !== undefined
                ? String(numberOfIncomeYears)
                : '—'
            }
            label="years"
          />
          <div className="w-full">
            Investing {safetyNetAllocation}% of your super savings into a lifetime income stream
            means your super plus other stated income will last you
          </div>
          <ValueDisplay
            value={
              savingsDuration !== null && savingsDuration !== undefined
                ? String(savingsDuration)
                : '—'
            }
            label="years"
          />
        </div>
        <div className="mb-8 mt-6 grid grid-cols-1 gap-6 rounded-sm bg-white p-4 font-roboto-700 text-bright-navy shadow-xl sm:p-6">
          <div className="w-full font-roboto-400">
            Then, from your <strong>Age Pension</strong> and <strong>lifetime income stream</strong>
            , you could have the security of a safety net income of up to:
          </div>
          <ValueDisplay
            value={
              calcResult?.safetyNetIncome && typeof calcResult.safetyNetIncome === 'number'
                ? `$${formatCurrency(calcResult.safetyNetIncome)}`
                : '—'
            }
            label="Every year for life"
          />
          <p className="font-roboto-400 text-sm text-black/60">
            *These results are an estimate only and based on a {safetyNetAllocation}% contribution
            of your super savings into a lifetime income stream. More information about the
            assumptions and limitations used by this tool can be found at the bottom of this page.
          </p>
        </div>
        <div className="mt-8 inline-grid grid-cols-1 gap-4">
          <a
            href="https://www.challenger.com.au/individual/interested-in/planning-my-retirement-income"
            target="_blank"
            rel="noopener noreferrer"
            className="font-roboto w-full cursor-pointer rounded-sm bg-bright-teal px-4 py-3 text-center text-base font-bold text-bright-navy sm:px-6 sm:text-lg"
          >
            LEARN MORE
          </a>
          <a
            href="https://www.challenger.com.au/about-us/contact-us"
            target="_blank"
            rel="noopener noreferrer"
            className="font-roboto w-full cursor-pointer rounded-sm bg-bright-navy px-4 py-3 text-center text-base font-bold text-white sm:px-6 sm:text-lg"
          >
            CONTACT US
          </a>
        </div>
      </div>
      <PromotionalCard
        imageSrc="/personalized-guide.png"
        imageAlt="Guide preview"
        title="You'll shortly receive our Guide to a confident retirement in your inbox."
        description="This guide provides general information and practical considerations to help you understand your results and think about your retirement with confidence."
      />
    </div>
  );
};

export default Step3Results;
