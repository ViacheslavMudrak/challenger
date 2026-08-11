'use client';
import ProgressBar from './ProgressBar';
import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Step1Form from './Step1Form';
import { Step1Financial } from './Step1Financial';
import { FormDataInterface } from './types';
import ExpandablePanel from './ExpandablePanel';
import Step2Results from './Step2Results';
import {
  ComponentRendering,
  ComponentParams,
  Field,
  RichTextField,
} from '@sitecore-content-sdk/nextjs';
import Step3Boost from './Step3Boost';
import {
  transformCalcResult,
  formatCurrency,
  parseValue,
  parseIntValue,
  getInvestor1DateOfBirth,
  getInvestor2DateOfBirth,
} from 'lib/challenger/rwc';
import PromotionalCard from './PromotionalCard';
import Step2ContactUs from './Step2ContactUs';
import Step3Results from './Step3Results';
import { TableRow } from './DataTable';
import { getStep2ResultsTipsCards, getStep3BoostTipsCard } from './RwcTipsCards';
import {
  LONG_API_REQUEST_OPTIONS,
  LONG_REQUEST_LOADER_DELAY_MS,
  postJsonWithRetry,
  requestJsonWithRetry,
} from './apiClient';
import LongRequestOverlay from './LongRequestOverlay';
import { useDelayedVisibility } from './useDelayedVisibility';

const StepContainer = ({
  children,
  assumptions,
  settings,
  defaults,
  isEditable,
  onSettingsChange,
  onReset,
  onStartAgain,
  isBusy,
  formData,
  mobileTipsCard,
}: {
  children: React.ReactNode;
  assumptions?: RichTextField;
  settings?: {
    financialInvestmentsGrowthAllocation: number;
    abpPlatformFee: number;
    abpDefensiveFee: number;
    abpGrowthFee: number;
    safetyNetInvestmentAllocation: number;
    lifetimeFundsSource: string;
    personalAssets?: number;
    investor1PaymentRate?: number;
    investor2PaymentRate?: number;
  };
  defaults?: Record<string, unknown> | null;
  isEditable?: boolean;
  onSettingsChange?: (field: string, value: number | string) => void;
  onReset?: () => void;
  onStartAgain?: () => void;
  isBusy?: boolean;
  formData?: FormDataInterface;
  mobileTipsCard?: React.ReactNode;
}) => {
  // Check if assumptions field exists and has content
  const hasAssumptions = assumptions && (assumptions.value || assumptions.metadata);
  const assumptionsContent = hasAssumptions
    ? assumptions
    : 'This section outlines the assumptions and limitations of the current implementation. Please review carefully before proceeding.';

  // Helper function to create non-editable table data
  const createNonEditableTableData = (): TableRow[] | undefined => {
    const hasDefaultsSettings =
      defaults &&
      defaults.settings &&
      typeof defaults.settings === 'object' &&
      (defaults.settings as Record<string, unknown>).abpDefensiveAssetAllocation !== undefined;

    if (!hasDefaultsSettings || !settings) return undefined;

    return [
      {
        label: 'Your superannuation asset allocation',
        value: '',
        subItems: [
          {
            label: 'Defensive assets:',
            value: `${100 - settings.financialInvestmentsGrowthAllocation}%`,
          },
          {
            label: 'Growth assets:',
            value: `${settings.financialInvestmentsGrowthAllocation}%`,
          },
        ],
      },
      {
        label: 'Superannuation administration fee',
        value: `${settings.abpPlatformFee}%`,
      },
      {
        label: 'Superannuation investment fees',
        value: '',
        subItems: [
          {
            label: 'Defensive investment fee:',
            value: `${settings.abpDefensiveFee}%`,
          },
          {
            label: 'Growth investment fee:',
            value: `${settings.abpGrowthFee}%`,
          },
        ],
      },
      {
        label: 'Lifetime income stream investment allocation',
        value: `${settings.safetyNetInvestmentAllocation}%`,
      },
      {
        label: 'Personal assets: (e.g. your car, furniture, etc.)',
        value: `$${formatCurrency(
          typeof settings.personalAssets === 'number' ? settings.personalAssets : 0
        )}`,
      },
    ];
  };

  // Create table data from settings only if defaults API succeeded and not editable
  const tableData: TableRow[] | undefined = !isEditable ? createNonEditableTableData() : undefined;

  // For editable mode, create non-editable table data for the first accordion
  const nonEditableTableData: TableRow[] | undefined = isEditable
    ? createNonEditableTableData()
    : undefined;

  return (
    <div className="mx-auto w-full max-w-screen-2xl bg-white px-4 pt-8 sm:px-8 sm:pt-12 md:px-16 md:pt-16 lg:px-32 lg:pt-20 xl:px-48">
      {children}
      {/* Non-editable assumptions accordion (shown when isEditable is true) */}
      {isEditable && nonEditableTableData && (
        <ExpandablePanel
          title="Assumptions & limitations"
          content={assumptionsContent}
          tableData={nonEditableTableData}
        />
      )}
      {/* Main assumptions accordion (editable if isEditable is true, otherwise non-editable) */}
      <ExpandablePanel
        title={isEditable ? 'Edit assumptions' : 'Assumptions & limitations'}
        content={assumptionsContent}
        tableData={tableData}
        isEditable={isEditable}
        settings={settings}
        hasPartner={formData?.hasPartner}
        onSettingsChange={onSettingsChange}
        onReset={onReset}
        onStartAgain={onStartAgain}
        isBusy={isBusy}
        className={isEditable && nonEditableTableData ? '!pt-0' : ''}
        noTopBorder={isEditable && nonEditableTableData ? true : false}
      />
      {mobileTipsCard && <div className="space y-6 mt-8 block lg:hidden">{mobileTipsCard}</div>}
    </div>
  );
};

const StepHeader = ({ title, description }: { title: string; description: string }) => (
  <>
    <h1 className="mb-4 text-2xl font-bold text-bright-navy sm:text-3xl md:text-4xl lg:text-5xl">
      {title}
    </h1>
    <p className="mb-8 text-base text-black sm:text-lg md:text-xl lg:text-2xl">{description}</p>
  </>
);

export type RwcToolFields = {
  assumptions: Field<string>;
};
// JSS Component Props Interface
type RwcToolJSSProps = {
  fields: RwcToolFields;
  rendering: ComponentRendering;
  params: ComponentParams;
};

export function RwcToolJSS({ fields }: RwcToolJSSProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const assumptionsField = fields?.assumptions;

  const steps = [
    'See how long your super will last',
    'Check your Age Pension eligibility',
    'Build an income safety net',
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [defaults, setDefaults] = useState<Record<string, unknown> | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [calcResult, setCalcResult] = useState<Record<string, unknown> | null>(null);
  const [initialCalcResults, setInitialCalcResult] = useState<Record<string, unknown> | null>(null);
  const [isRecalculating, setIsRecalculating] = useState(false);
  const showLongRunningOverlay = useDelayedVisibility(
    isRecalculating,
    LONG_REQUEST_LOADER_DELAY_MS
  );

  // Store Step1Form result to check for errors in subsequent steps
  const [step1FormResult, setStep1FormResult] = useState<unknown | null>(null);
  const [step1FinancialResult, setStep1FinancialResult] = useState<unknown | null>(null);

  // Sub-step tracking for each main step - derived from URL params
  const [subSteps, setSubSteps] = useState<{ [key: number]: number }>({
    1: 0,
    2: 0,
    3: 0,
  });

  // Ref to track if we're updating URL programmatically (to avoid loops)
  const isUpdatingURLRef = useRef(false);
  // Ref to track if we already attempted to fetch defaults (prevents Infinites)
  const hasInitializedRef = useRef(false);

  const initialFormData: FormDataInterface = {
    investor1: {
      gender: '',
      dateOfBirth: '',
      employIncome: '',
      employRemainYears: '',
      superAmount: '',
    },
    investor2: {
      gender: '',
      dateOfBirth: '',
      employIncome: '',
      employRemainYears: '',
      superAmount: '',
    },
    spendPerWeek: 0,
    ownHome: true,
    ownsInvestmentProperty: false,
    savingsAmount: '',
    sharesValue: '',
    investmentPropertyValue: '',
    investmentPropertyRentPerWeek: '',
    settings: {
      financialInvestmentsGrowthAllocation: 0,
      abpPlatformFee: 0,
      abpDefensiveFee: 0,
      abpGrowthFee: 0,
      lifetimeFundsSource: '',
      safetyNetInvestmentAllocation: 0,
      investor1PaymentRate: 0,
      investor2PaymentRate: 0,
      personalAssets: 0,
    },
    includeAgePension: false,
    includeAnnuity: false,
    hasPartner: false,
    // Age and birth month fields
    youAge: '',
    youBirthMonth: '',
    partnerAge: '',
    partnerBirthMonth: '',
    //employment fields
    youEmployed: false,
    partnerEmployed: false,
    // Contact information fields
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
  };

  const [formData, setFormData] = useState<FormDataInterface>(initialFormData);

  // URL mapping for meaningful step names
  const stepURLMap = useMemo<Record<number, string>>(
    () => ({
      1: 'super-assessment',
      2: 'age-pension-check',
      3: 'safety-net-boost',
    }),
    []
  );

  const subStepURLMap = useMemo<Record<number, Record<number, string>>>(
    () => ({
      1: { 0: 'getting-started', 1: 'financial-info' },
      2: { 0: 'contact-details', 1: 'results' },
      3: { 0: 'boost-options', 1: 'summary' },
    }),
    []
  );

  // Initialize state from URL parameters (handles browser back/forward)
  useEffect(() => {
    if (isUpdatingURLRef.current) {
      isUpdatingURLRef.current = false;
      return;
    }

    const stepParam = searchParams.get('step');
    const subStepParam = searchParams.get('substep');

    if (stepParam) {
      // Find step number from URL parameter
      const stepEntry = Object.entries(stepURLMap).find(([, url]) => url === stepParam);
      if (stepEntry) {
        const step = parseInt(stepEntry[0]);
        setCurrentStep(step);

        // Find substep from URL parameter
        if (subStepParam && subStepURLMap[step]) {
          const subStepEntry = Object.entries(subStepURLMap[step]).find(
            ([, url]) => url === subStepParam
          );
          if (subStepEntry) {
            const subStep = parseInt(subStepEntry[0]);
            setSubSteps((prev) => ({
              ...prev,
              [step]: subStep,
            }));
          }
        } else if (step === 1 && !subStepParam) {
          setSubSteps((prev) => ({
            ...prev,
            1: 0,
          }));
        }
      }
    }
  }, [searchParams, stepURLMap, subStepURLMap]);

  // Update URL when step or substep changes
  const updateURL = (step: number, subStep = 0, usePush = false) => {
    const stepURL = stepURLMap[step];
    const subStepURL = subStepURLMap[step]?.[subStep];

    // Preserve all existing query params (including Sitecore params like sc_mode, sc_lang, etc.)
    const params = new URLSearchParams(window.location.search);
    if (stepURL) params.set('step', stepURL);
    if (subStepURL) params.set('substep', subStepURL);

    const newURL = `${pathname}?${params.toString()}`;
    isUpdatingURLRef.current = true;
    if (usePush) {
      router.push(newURL, { scroll: false });
    } else {
      router.replace(newURL, { scroll: false });
    }
  };

  // Ensure URL contains step/substep query params on first load for analytics
  useEffect(() => {
    const stepParam = searchParams.get('step');
    if (!stepParam) {
      // Default to Step 1, substep 0 (getting-started) while preserving other params
      updateURL(1, 0, false);
    }
  }, [searchParams]);

  useEffect(() => {
    const initializeApp = async () => {
      // Only fetch defaults if not already loaded (prevents re-fetching on back navigation)
      // Check if we've already tried to initialize or if defaults is successfully loaded (is an object)
      if (
        hasInitializedRef.current ||
        (defaults && typeof defaults === 'object' && Object.keys(defaults).length > 0)
      )
        return;
      //Mark as initialized before making the API call
      hasInitializedRef.current = true;

      try {
        const response = await requestJsonWithRetry<{
          success?: boolean;
          data?: Record<string, unknown>;
        }>(`/api/rwc`, undefined, LONG_API_REQUEST_OPTIONS);
        if (!response.ok || !response.data?.success) {
          console.error('API error: Failed to fetch defaults', response.error);
          setDefaults(null);
          return;
        }

        setDefaults(response.data.data || null);
        const rawSettings = response.data.data?.settings;
        const apiSettings: Record<string, unknown> =
          rawSettings && typeof rawSettings === 'object'
            ? (rawSettings as Record<string, unknown>)
            : {};
        const { abpDefensiveAssetAllocation, ...restApiSettings } = apiSettings;
        setFormData((prev) => {
          // Only update settings if they're not already set (preserve user changes)
          if (
            prev.settings.financialInvestmentsGrowthAllocation === 0 &&
            prev.settings.abpPlatformFee === 0
          ) {
            return {
              ...prev,
              settings: {
                ...prev.settings,
                ...restApiSettings,
                ...(typeof abpDefensiveAssetAllocation === 'number' && {
                  financialInvestmentsGrowthAllocation: 100 - abpDefensiveAssetAllocation,
                }),
              },
            };
          }
          return prev;
        });
      } catch (error) {
        console.error('Error initializing app:', error);
        setDefaults(null); // Explicitly set to null on failure
      }
    };
    initializeApp();
  }, [defaults]);

  const handleChange = (
    section: 'investor1' | 'investor2' | 'settings' | string,
    field?: string,
    value?: string | number | boolean
  ) => {
    if (field !== undefined && value !== undefined) {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...(prev[section as keyof FormDataInterface] as Record<string, unknown>),
          [field]: value,
        },
      }));
    } else if (field !== undefined && value === undefined) {
      setFormData((prev) => ({
        ...prev,
        [section as keyof FormDataInterface]: field,
      }));
    }
  };

  const handlePartnerToggle = () => {
    setFormData((prev) => {
      const newHasPartner = !prev.hasPartner;
      const newRecommendedWeeklySpend = newHasPartner
        ? ((defaults?.coupleWeeklySpend as number) ?? 1450)
        : ((defaults?.singleWeeklySpend as number) ?? 1050);
      return {
        ...prev,
        hasPartner: newHasPartner,
        spendPerWeek: newRecommendedWeeklySpend,
      };
    });
  };
  const handleWeeklySpendChange = (value: string) => {
    setFormData((prev) => ({ ...prev, spendPerWeek: parseFloat(value) || 0 }));
    clearError('spendPerWeek');
  };

  const handleFieldChange = (field: string, value: string | number | boolean) => {
    // Check if field is a nested field (contains a dot)
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      setFormData((prev) => {
        const newData = {
          ...prev,
          [parentField]: {
            ...(prev[parentField as keyof FormDataInterface] as Record<string, unknown>),
            [childField]: value,
          },
        };
        return newData;
      });
    } else {
      // Handle top-level fields
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const clearError = (field: string) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Custom percent values for each step
  const getStepPercent = () => {
    const currentSubStep = subSteps[currentStep];
    switch (currentStep) {
      case 1:
        return currentSubStep >= 1 ? 40 : 20;
      case 2:
        return currentSubStep >= 1 ? 60 : 50;
      case 3:
        return currentSubStep >= 1 ? 100 : 80;
      default:
        return 0;
    }
  };

  const percent = getStepPercent();

  const handleBack = () => {
    const currentSubStep = subSteps[currentStep];

    if (currentStep === 3 && currentSubStep === 0) {
      // Go back to Step 2 results
      setCurrentStep(2);
      setSubSteps((prev) => ({
        ...prev,
        2: 1,
      }));
      updateURL(2, 1, true); // Use push to add to history
      return;
    }

    if (currentSubStep > 0) {
      const newSubStep = currentSubStep - 1;
      setSubSteps((prev) => ({
        ...prev,
        [currentStep]: newSubStep,
      }));
      updateURL(currentStep, newSubStep, true); // Use push to add to history
      return;
    }

    if (currentStep > 1) {
      const previousStep = currentStep - 1;
      // When going back from Step 2 substep 0, go to Step 1 substep 1 (financial info)
      if (currentStep === 2 && currentSubStep === 0) {
        setCurrentStep(previousStep);
        setSubSteps((prev) => ({
          ...prev,
          [previousStep]: 1,
        }));
        updateURL(previousStep, 1, true); // Use push to add to history
      } else {
        const previousSubStep =
          subSteps[previousStep] !== undefined
            ? subSteps[previousStep]
            : Math.max(getMaxSubSteps(previousStep) - 1, 0);
        setCurrentStep(previousStep);
        updateURL(previousStep, previousSubStep, true); // Use push to add to history
      }
      return;
    }

    // At the start, just update URL back to the default Step 1 view
    updateURL(1, 0, true); // Use push to add to history
  };

  const getMaxSubSteps = (step: number): number => {
    switch (step) {
      case 1:
        return 2; // Now Step 1 form + Step 1 Financial
      case 2:
        return 2; // Now Contact info + Results
      case 3:
        return 2; // Boost + Summary
      default:
        return 1;
    }
  };

  const nextSubStep = () => {
    const currentSubStep = subSteps[currentStep];
    const maxSubSteps = getMaxSubSteps(currentStep);

    if (currentSubStep < maxSubSteps - 1) {
      // Move to next sub-step within current step
      const newSubStep = currentSubStep + 1;
      setSubSteps((prev) => ({
        ...prev,
        [currentStep]: newSubStep,
      }));
      updateURL(currentStep, newSubStep, true); // Use push to add to history
      return true;
    } else {
      // Move to next main step
      if (currentStep < steps.length) {
        const newStep = currentStep + 1;
        setCurrentStep(newStep);
        updateURL(newStep, 0, true); // Use push to add to history
        return true;
      }
    }
    return false;
  };

  const handleNext = () => {
    return nextSubStep();
  };

  // Helper function to build API payload for recalculation
  const buildRecalculationPayload = (): Record<string, unknown> => {
    const ageShowMonth = defaults ? (defaults.ageShowMonth as number) : undefined;
    const investor1Data: Record<string, unknown> = {
      gender: formData.investor1.gender === 'Other' ? 'Female' : formData.investor1.gender,
      dateOfBirth: getInvestor1DateOfBirth(formData, ageShowMonth),
      superAmount: parseFloat(formData.investor1.superAmount) || 0,
    };

    if (formData.youEmployed) {
      const employIncome = parseValue(formData.investor1.employIncome);
      const employRemainYears = parseIntValue(formData.investor1.employRemainYears);
      if (employIncome !== undefined) investor1Data.employIncome = employIncome;
      if (employRemainYears !== undefined) investor1Data.employRemainYears = employRemainYears;
    }

    const baseApiData: Record<string, unknown> = {
      investor1: investor1Data,
      spendPerWeek:
        typeof formData.spendPerWeek === 'number'
          ? formData.spendPerWeek
          : parseFloat(String(formData.spendPerWeek)) || 0,
      ownHome: formData.ownHome ?? true,
      settings: formData.settings, // Include updated settings
    };

    if (formData.hasPartner) {
      const investor2Data: Record<string, unknown> = {
        gender: formData.investor2.gender === 'Other' ? 'Female' : formData.investor2.gender,
        dateOfBirth: getInvestor2DateOfBirth(formData, ageShowMonth),
        superAmount: parseFloat(formData.investor2.superAmount) || 0,
      };

      if (formData.partnerEmployed) {
        const employIncome = parseValue(formData.investor2.employIncome);
        const employRemainYears = parseIntValue(formData.investor2.employRemainYears);
        if (employIncome !== undefined) investor2Data.employIncome = employIncome;
        if (employRemainYears !== undefined) investor2Data.employRemainYears = employRemainYears;
      }

      baseApiData.investor2 = investor2Data;
    }

    // Add financial fields
    const savingsAmount = parseValue(formData.savingsAmount);
    if (savingsAmount !== undefined) baseApiData.savingsAmount = savingsAmount;

    const sharesValue = parseValue(formData.sharesValue);
    if (sharesValue !== undefined) baseApiData.sharesValue = sharesValue;

    const personalAssets = parseValue(formData.settings.personalAssets);
    if (personalAssets !== undefined) baseApiData.personalAssets = personalAssets;

    if (formData.ownsInvestmentProperty) {
      const investmentPropertyValue = parseValue(formData.investmentPropertyValue);
      if (investmentPropertyValue !== undefined)
        baseApiData.investmentPropertyValue = investmentPropertyValue;

      const investmentPropertyRentPerWeek = parseValue(formData.investmentPropertyRentPerWeek);
      if (investmentPropertyRentPerWeek !== undefined)
        baseApiData.investmentPropertyRentPerWeek = investmentPropertyRentPerWeek;
    }

    return baseApiData;
  };

  // Helper function to handle recalculation with updated settings
  const handleRecalculation = async (navigateToStep: number, navigateToSubStep: number) => {
    setIsRecalculating(true);
    try {
      const baseApiData = buildRecalculationPayload();

      // Make two API calls with updated settings
      const [withoutPensionResponse, withPensionResponse] = await Promise.all([
        postJsonWithRetry<Record<string, unknown>>(
          'api/rwcCalculate',
          {
            ...baseApiData,
            includeAgePension: false,
          },
          LONG_API_REQUEST_OPTIONS
        ),
        postJsonWithRetry<Record<string, unknown>>(
          'api/rwcCalculate',
          {
            ...baseApiData,
            includeAgePension: true,
          },
          LONG_API_REQUEST_OPTIONS
        ),
      ]);

      const resultWithoutPension = withoutPensionResponse.data;
      const resultWithPension = withPensionResponse.data;

      // If API failed, set results to null to prevent showing incorrect data
      if (!resultWithoutPension || !resultWithPension) {
        console.error(
          'API error: Calculation failed',
          withoutPensionResponse.error || withPensionResponse.error
        );
        console.error('API error: Calculation failed - setting results to null');
        setInitialCalcResult(null);
        setCalcResult(null);
        // Still navigate to requested step - error will be shown in results view
        setCurrentStep(navigateToStep);
        setSubSteps((prev) => ({
          ...prev,
          [navigateToStep]: navigateToSubStep,
        }));
        updateURL(navigateToStep, navigateToSubStep, true);
        return;
      }

      // Store both results only if API calls succeeded
      setInitialCalcResult(transformCalcResult(resultWithoutPension));
      setCalcResult(transformCalcResult(resultWithPension));

      // Navigate to specified step
      setCurrentStep(navigateToStep);
      setSubSteps((prev) => ({
        ...prev,
        [navigateToStep]: navigateToSubStep,
      }));
      updateURL(navigateToStep, navigateToSubStep, true); // Use push to add to history
    } catch (error) {
      console.error('Error recalculating with updated assumptions:', error);
      // Set results to null on error to prevent showing incorrect data
      setInitialCalcResult(null);
      setCalcResult(null);
      // Still navigate to requested step - error will be shown in results view
      setCurrentStep(navigateToStep);
      setSubSteps((prev) => ({
        ...prev,
        [navigateToStep]: navigateToSubStep,
      }));
      updateURL(navigateToStep, navigateToSubStep, true);
    } finally {
      setIsRecalculating(false);
    }
  };

  // Helper function to extract numberOfIncomeYears from Step1Form result
  const extractNumberOfIncomeYears = (result: unknown): number | null => {
    if (!result || typeof result !== 'object') return null;
    const raw = result as Record<string, unknown>;
    const api = raw.data ? (raw.data as Record<string, unknown>) : raw;
    const value = api?.numberOfIncomeYears;
    return typeof value === 'number' && Number.isFinite(value) ? value : null;
  };

  // Helper function to extract payment rates from API response
  const handleExtractPaymentRates = (raw: unknown) => {
    // Store the result (even if null) so we can check for errors in subsequent steps
    setStep1FormResult(raw);

    // If API returned null, don't update anything to prevent incorrect data
    if (raw === null) {
      console.error('API error: Cannot extract payment rates from null response');
      return;
    }

    const response = raw as Record<string, unknown>;
    if (response && typeof response === 'object') {
      const data = (response.data as Record<string, unknown>) || response;
      const settings = data.settings as Record<string, unknown> | undefined;

      if (settings) {
        setFormData((prev) => ({
          ...prev,
          settings: {
            ...prev.settings,
            ...(settings.investor1PaymentRate !== undefined && {
              investor1PaymentRate: settings.investor1PaymentRate as number,
            }),
            ...(settings.investor2PaymentRate !== undefined && {
              investor2PaymentRate: settings.investor2PaymentRate as number,
            }),
          },
        }));
      }
    }
  };

  // Store Step2Results API result (with includeAnnuity: true) to preserve pension status when navigating back
  const [step2ResultsResult, setStep2ResultsResult] = useState<Record<string, unknown> | null>(
    null
  );

  // Helper function to reset settings to defaults
  const handleResetSettings = (navigateToStep: number, navigateToSubStep: number) => {
    if (defaults?.settings) {
      const apiSettings = defaults.settings as Record<string, unknown>;
      const { abpDefensiveAssetAllocation, ...restApiSettings } = apiSettings;
      setFormData((prev) => ({
        ...prev,
        settings: {
          ...prev.settings,
          ...restApiSettings,
          ...(typeof abpDefensiveAssetAllocation === 'number' && {
            financialInvestmentsGrowthAllocation: 100 - abpDefensiveAssetAllocation,
          }),
        },
      }));
    }
    // Navigate to specified step
    setCurrentStep(navigateToStep);
    setSubSteps((prev) => ({
      ...prev,
      [navigateToStep]: navigateToSubStep,
    }));
    updateURL(navigateToStep, navigateToSubStep);
  };

  const renderStep1 = () => {
    const currentSubStep = subSteps[1];
    const recommendedWeeklySpend = formData.hasPartner
      ? ((defaults?.coupleWeeklySpend as number) ?? 1450)
      : ((defaults?.singleWeeklySpend as number) ?? 1050);
    switch (currentSubStep) {
      case 0:
        return (
          <StepContainer
            assumptions={assumptionsField}
            settings={formData.settings}
            defaults={defaults}
          >
            <StepHeader
              title={'Will your super last through retirement?'}
              description={
                'First we need a little information about you, your super balance and your spending.'
              }
            />
            <Step1Form
              onNext={handleNext}
              formData={formData}
              validationErrors={validationErrors}
              minAge={defaults ? (defaults.minAge as number) : 60}
              maxAge={defaults ? (defaults.maxAge as number) : 80}
              minSuperBalance={defaults ? (defaults.minSuperannuationBalance as number) : 0}
              maxSuperBalance={defaults ? (defaults.maxSuperannuationBalance as number) : 999999}
              maxSingleWeeklySpend={defaults ? (defaults.maxSingleWeeklySpend as number) : 9999}
              maxCoupleWeeklySpend={defaults ? (defaults.maxCoupleWeeklySpend as number) : 9999}
              ageShowMonth={defaults ? (defaults.ageShowMonth as number) : 66}
              recommendedWeeklySpend={recommendedWeeklySpend}
              handleChange={handleChange}
              handlePartnerToggle={handlePartnerToggle}
              handleWeeklySpendChange={handleWeeklySpendChange}
              clearError={clearError}
              setValidationErrors={setValidationErrors}
              onResult={handleExtractPaymentRates}
            />
          </StepContainer>
        );

      case 1:
        return (
          <StepContainer
            assumptions={assumptionsField}
            settings={formData.settings}
            defaults={defaults}
            isEditable={true}
            formData={formData}
            isBusy={isRecalculating}
            onSettingsChange={(field, value) => {
              handleChange('settings', field, value);
            }}
            onReset={() => handleResetSettings(1, 1)}
            onStartAgain={() => handleRecalculation(2, 0)}
          >
            <StepHeader
              title="Your super may last longer if you have income from other investments or from the Age Pension."
              description="Let's see whether you can access or increase any income from the Age Pension. To do that, we need to gather a bit more information."
            />
            <p className="text-sm text-black sm:text-base">
              Only fill in the details that are relevant to you - you can leave the rest blank.
            </p>
            <p className="mb-8 text-sm text-black sm:text-base">
              We&apos;ve made a number of assumptions which you can edit at the bottom of the
              screen.
            </p>
            <Step1Financial
              onNext={handleNext}
              formData={formData}
              validationErrors={validationErrors}
              setValidationErrors={setValidationErrors}
              onFieldChange={handleFieldChange}
              onClearError={clearError}
              minSavings={defaults ? (defaults.minTermDepositCash as number) : 0}
              maxSavings={defaults ? (defaults.maxTermDepositCash as number) : 999999}
              minShares={defaults ? (defaults.minFinancialInvestment as number) : 0}
              maxShares={defaults ? (defaults.maxFinancialInvestment as number) : 999999}
              minRentalIncome={defaults ? (defaults.minRentalIncome as number) : 0}
              maxRentalIncome={defaults ? (defaults.maxRentalIncome as number) : 9999}
              minEmployIncome={defaults ? (defaults.minEmploymentIncome as number) : 0}
              maxEmployIncome={defaults ? (defaults.maxEmploymentIncome as number) : 999999}
              minInvestmentProperty={defaults ? (defaults.minInvestmentProperty as number) : 0}
              maxInvestmentProperty={defaults ? (defaults.maxInvestmentProperty as number) : 999999}
              ageShowMonth={defaults ? (defaults.ageShowMonth as number) : 66}
              onResult={(raw) => {
                // If API returned null, set results to null to prevent showing incorrect data
                if (raw === null) {
                  setStep1FinancialResult(null);
                  setCalcResult(null);
                  setInitialCalcResult(null);
                  return;
                }
                setStep1FinancialResult(raw);
                setCalcResult(transformCalcResult(raw));
                setInitialCalcResult(transformCalcResult(raw));
              }}
            />
          </StepContainer>
        );
      default: {
        return (
          <StepContainer
            assumptions={assumptionsField}
            settings={formData.settings}
            defaults={defaults}
          >
            <StepHeader
              title={'Will your super last through retirement?'}
              description={
                'First we need a little information about you, your super balance and your spending.'
              }
            />
            <Step1Form
              onNext={handleNext}
              formData={formData}
              validationErrors={validationErrors}
              minAge={defaults ? (defaults.minAge as number) : 60}
              maxAge={defaults ? (defaults.maxAge as number) : 80}
              minSuperBalance={defaults ? (defaults.minSuperannuationBalance as number) : 0}
              maxSuperBalance={defaults ? (defaults.maxSuperannuationBalance as number) : 999999}
              maxSingleWeeklySpend={defaults ? (defaults.maxSingleWeeklySpend as number) : 9999}
              maxCoupleWeeklySpend={defaults ? (defaults.maxCoupleWeeklySpend as number) : 9999}
              ageShowMonth={defaults ? (defaults.ageShowMonth as number) : 66}
              recommendedWeeklySpend={recommendedWeeklySpend}
              handleChange={handleChange}
              handlePartnerToggle={handlePartnerToggle}
              handleWeeklySpendChange={handleWeeklySpendChange}
              clearError={clearError}
              setValidationErrors={setValidationErrors}
              onResult={handleExtractPaymentRates}
            />
          </StepContainer>
        );
      }
    }
  };

  const renderStep2 = () => {
    const currentSubStep = subSteps[2];
    switch (currentSubStep) {
      case 0:
        return (
          <StepContainer
            assumptions={assumptionsField}
            settings={formData.settings}
            defaults={defaults}
            formData={formData}
            isBusy={isRecalculating}
            onSettingsChange={(field, value) => {
              handleChange('settings', field, value);
            }}
            onReset={() => handleResetSettings(1, 1)}
            onStartAgain={() => handleRecalculation(2, 1)}
          >
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Left Column - Form Area with Placeholder */}
              <div className="flex-1">
                <h1 className="mb-4 font-roboto-700 text-2xl text-bright-navy sm:text-3xl md:text-4xl lg:text-[40px]">
                  Where should we send your results?
                </h1>
                <p className="font-roboto mb-8 text-base text-bright-navy">
                  Once you complete this step, you&apos;ll be able to review a summary of your
                  results online. You&apos;ll also receive our Guide to a confident retirement by
                  email, which provides practical information and considerations to support your
                  retirement planning.
                </p>
                <Step2ContactUs
                  firstName={formData.firstName}
                  lastName={formData.lastName}
                  email={formData.email}
                  mobile={formData.mobile}
                  onFieldChange={(field, value) => handleFieldChange(field, value)}
                  onNext={handleNext}
                  employRemainYears={formData.investor1.employRemainYears}
                  youAge={formData.youAge}
                />
              </div>
              <PromotionalCard
                imageSrc="/personalized-guide.png"
                imageAlt="Guide preview"
                title="Get your retirement planning guide"
                description="Designed to help you understand how long your super may last, what Age Pension you could receive, and how different strategies can support retirement outcomes."
              />
            </div>
          </StepContainer>
        );
      case 1:
        return (
          <StepContainer
            assumptions={assumptionsField}
            settings={formData.settings}
            defaults={defaults}
            mobileTipsCard={getStep2ResultsTipsCards()}
          >
            <Step2Results
              result={step2ResultsResult || calcResult}
              formData={formData}
              yourSuperAloneYears={extractNumberOfIncomeYears(step1FormResult)}
              numberOfIncomeYears={extractNumberOfIncomeYears(step1FinancialResult)}
              onNext={(res: unknown) => {
                // If API returned null, set calcResult to null to prevent showing incorrect data
                if (res === null) {
                  setCalcResult(null);
                  setStep2ResultsResult(null);
                  // Still allow navigation - error will be shown in next step
                  handleNext();
                  return;
                }

                const fullResult = res as Record<string, unknown>;
                if (fullResult && typeof fullResult === 'object') {
                  const data = (fullResult.data as Record<string, unknown>) || fullResult;
                  // Persist the original Step 2 pension result (from calcResult) separately
                  // so that when navigating to Step 3 and back again, Step2Results can
                  // still read pension-related values even if calcResult is later
                  // replaced by annuity-boosted results that may not contain them.
                  if (calcResult) {
                    setStep2ResultsResult(calcResult);
                  }
                  setCalcResult(data);
                } else {
                  if (calcResult) {
                    setStep2ResultsResult(calcResult);
                  }
                  setCalcResult(fullResult);
                }
                handleNext();
              }}
            />
          </StepContainer>
        );
      default:
        return (
          <StepContainer assumptions={assumptionsField}>
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* Left Column - Form Area with Placeholder */}
              <div className="flex-1">
                <h1 className="mb-4 font-roboto-700 text-2xl text-bright-navy sm:text-3xl md:text-4xl lg:text-[40px]">
                  Where should we send your results?
                </h1>
                <p className="font-roboto mb-8 text-base text-bright-navy">
                  Once you complete this step, you&apos;ll be able to review a summary of your
                  results online. You&apos;ll also receive our Guide to a confident retirement by
                  email, which provides practical information and considerations to support your
                  retirement planning.
                </p>
                <Step2ContactUs
                  firstName={formData.firstName}
                  lastName={formData.lastName}
                  email={formData.email}
                  mobile={formData.mobile}
                  onFieldChange={(field, value) => handleFieldChange(field, value)}
                  onNext={handleNext}
                  employRemainYears={formData.investor1.employRemainYears}
                  youAge={formData.youAge}
                />
              </div>
              <PromotionalCard
                imageSrc="/personalized-guide.png"
                imageAlt="Guide preview"
                title="Get your personalized guide"
                description="Designed to help you understand how long your super may last, what Age Pension you could receive, and how different strategies can support retirement outcomes."
              />
            </div>
          </StepContainer>
        );
    }
  };

  const renderStep3 = () => {
    const currentSubStep = subSteps[3];
    switch (currentSubStep) {
      case 0:
        return (
          <StepContainer
            assumptions={assumptionsField}
            settings={formData.settings}
            defaults={defaults}
            mobileTipsCard={getStep3BoostTipsCard(calcResult)}
          >
            <Step3Boost
              result={calcResult}
              formData={formData}
              previousResult={step1FinancialResult}
              onNext={(result) => {
                setCalcResult(result as Record<string, unknown>);
                handleNext();
              }}
            />
          </StepContainer>
        );
      case 1:
        return (
          <StepContainer
            assumptions={assumptionsField}
            settings={formData.settings}
            defaults={defaults}
          >
            <Step3Results
              yourSuperAloneYears={extractNumberOfIncomeYears(step1FormResult)}
              initialCalcResult={initialCalcResults}
              calcResult={calcResult}
              formData={formData}
              numberOfIncomeYears={extractNumberOfIncomeYears(step1FinancialResult)}
            />
          </StepContainer>
        );
      default:
        return (
          <StepContainer
            assumptions={assumptionsField}
            settings={formData.settings}
            defaults={defaults}
          >
            <Step3Boost result={calcResult} formData={formData} />
          </StepContainer>
        );
    }
  };

  return (
    <>
      <LongRequestOverlay visible={showLongRunningOverlay} />
      <ProgressBar currentStep={currentStep} percent={percent} steps={steps} onBack={handleBack} />
      {currentStep === 1 && renderStep1()}
      {currentStep === 2 && renderStep2()}
      {currentStep === 3 && renderStep3()}
    </>
  );
}

export default RwcToolJSS;
