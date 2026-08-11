import React from 'react';
import { InputField } from './InputField';
import { Dropdown } from './Dropdown';

type SettingsFormProps = {
  settings: {
    financialInvestmentsGrowthAllocation: number;
    abpPlatformFee: number;
    abpDefensiveFee: number;
    abpGrowthFee: number;
    safetyNetInvestmentAllocation: number;
    lifetimeFundsSource: string;
    investor1PaymentRate?: number;
    investor2PaymentRate?: number;
    personalAssets?: number;
  };
  hasPartner?: boolean;
  onSettingsChange: (field: string, value: number | string) => void;
  onReset?: () => void;
  onStartAgain?: () => void;
  isBusy?: boolean;
};

const SettingsForm = ({
  settings,
  hasPartner,
  onSettingsChange,
  onReset,
  onStartAgain,
  isBusy = false,
}: SettingsFormProps) => {
  const defensiveAllocation = 100 - settings.financialInvestmentsGrowthAllocation;

  return (
    <div className="font-roboto w-full bg-transparent text-black">
      <div className="mb-6 space-y-2 text-sm">
        <p>
          In addition to the information you input to the tool, the assumptions below can be
          modified by you. Default values are shown below unless they have been previously changed
          by you.
        </p>
        <p>
          If you have previously changed the assumptions and would like to run an illustration based
          on the default assumptions, please select the reset button at the bottom of the page.
        </p>
      </div>

      <div className="space-y-6">
        {/* Personal assets */}
        <InputField
          label="Personal assets"
          value={String(settings.personalAssets || '')}
          onChange={(value) => onSettingsChange('personalAssets', value)}
          placeholder="Enter amount"
          prefix="$"
        />

        {/* Lifetime income stream */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Lifetime income stream</h3>
          <div className="space-y-4">
            <InputField
              label="Lifetime income investment allocation % (between 20% and 40%)"
              value={String(settings.safetyNetInvestmentAllocation)}
              onChange={(value) => {
                const numValue = parseFloat(value);
                if (!isNaN(numValue)) {
                  onSettingsChange('safetyNetInvestmentAllocation', numValue);
                }
              }}
              placeholder="Enter percentage"
              type="number"
              suffix="%"
              min={20}
              max={40}
            />

            <Dropdown
              label="Lifetime income taken from"
              value={settings.lifetimeFundsSource === 'Cash' ? 'Bank Account' : 'Superannuation'}
              onChange={(value) => {
                const mappedValue = value === 'Bank Account' ? 'Cash' : 'Abp';
                onSettingsChange('lifetimeFundsSource', mappedValue);
              }}
              options={['Superannuation', 'Bank Account']}
              className="mb-0"
            />

            <InputField
              label="Your lifetime income stream starting payment (rate per $100,000 starting payment)"
              value={String(settings.investor1PaymentRate || 5440.56)}
              onChange={(value) => {
                const numValue = parseFloat(value);
                if (!isNaN(numValue)) {
                  onSettingsChange('investor1PaymentRate', numValue);
                }
              }}
              placeholder="Enter amount"
              prefix="$"
            />

            {hasPartner && (
              <InputField
                label="Your partner's lifetime income stream starting payment (rate per $100,000 starting payment)"
                value={String(settings.investor2PaymentRate || 5440.56)}
                onChange={(value) => {
                  const numValue = parseFloat(value);
                  if (!isNaN(numValue)) {
                    onSettingsChange('investor2PaymentRate', numValue);
                  }
                }}
                placeholder="Enter amount"
                prefix="$"
              />
            )}
          </div>
        </div>

        {/* Account based pension */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Account based pension</h3>
          <div className="space-y-4">
            <InputField
              label="Defensive asset allocation %"
              value={String(defensiveAllocation)}
              onChange={(value) => {
                const numValue = parseFloat(value);
                if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                  onSettingsChange('financialInvestmentsGrowthAllocation', 100 - numValue);
                }
              }}
              placeholder="Enter percentage"
              type="number"
              suffix="%"
              min={0}
              max={100}
            />

            <InputField
              label="Growth asset allocation %"
              value={String(settings.financialInvestmentsGrowthAllocation)}
              onChange={(value) => {
                const numValue = parseFloat(value);
                if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                  onSettingsChange('financialInvestmentsGrowthAllocation', numValue);
                }
              }}
              placeholder="Enter percentage"
              type="number"
              suffix="%"
              min={0}
              max={100}
            />

            <InputField
              label="Super administration fee (%pa)"
              value={String(settings.abpPlatformFee)}
              onChange={(value) => {
                const numValue = parseFloat(value);
                if (!isNaN(numValue)) {
                  onSettingsChange('abpPlatformFee', numValue);
                }
              }}
              placeholder="Enter percentage"
              type="number"
              suffix="%"
              min={0}
            />

            <InputField
              label="Growth investment fee (%pa)"
              value={String(settings.abpGrowthFee)}
              onChange={(value) => {
                const numValue = parseFloat(value);
                if (!isNaN(numValue)) {
                  onSettingsChange('abpGrowthFee', numValue);
                }
              }}
              placeholder="Enter percentage"
              type="number"
              suffix="%"
              min={0}
            />

            <InputField
              label="Defensive investment fee (%pa)"
              value={String(settings.abpDefensiveFee)}
              onChange={(value) => {
                const numValue = parseFloat(value);
                if (!isNaN(numValue)) {
                  onSettingsChange('abpDefensiveFee', numValue);
                }
              }}
              placeholder="Enter percentage"
              type="number"
              suffix="%"
              min={0}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex gap-4">
        <button
          type="button"
          onClick={onReset}
          disabled={isBusy}
          className="rounded-sm border-2 border-bright-navy bg-transparent px-6 py-3 font-bold text-bright-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          Reset to default values
        </button>
        <button
          type="button"
          onClick={onStartAgain}
          disabled={isBusy}
          className="rounded-sm bg-bright-teal px-6 py-3 font-bold text-bright-navy disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isBusy ? 'Calculating...' : 'Continue with modified values'}
        </button>
      </div>
    </div>
  );
};

export default SettingsForm;
