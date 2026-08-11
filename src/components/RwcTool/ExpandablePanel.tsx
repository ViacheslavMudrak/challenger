import React, { useState } from 'react';
import { RichText, RichTextField } from '@sitecore-content-sdk/nextjs';
import DataTable, { TableRow } from './DataTable';
import SettingsForm from './SettingsForm';

interface ExpandablePanelProps {
  title: string;
  content?: string | RichTextField;
  tableData?: TableRow[];
  isEditable?: boolean;
  settings?: {
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
  onSettingsChange?: (field: string, value: number | string) => void;
  onReset?: () => void;
  onStartAgain?: () => void;
  isBusy?: boolean;
  children?: React.ReactNode;
  className?: string;
  noTopBorder?: boolean;
}

const ExpandablePanel: React.FC<ExpandablePanelProps> = ({
  title,
  content,
  tableData,
  isEditable,
  settings,
  hasPartner,
  onSettingsChange,
  onReset,
  onStartAgain,
  isBusy,
  children,
  className = '',
  noTopBorder = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`w-full pt-16 ${className}`}>
      <div
        onClick={togglePanel}
        className={`flex cursor-pointer items-center justify-between border-b border-grey bg-transparent py-4 ${noTopBorder ? '' : 'border-t'}`}
      >
        <h4 className="font-roboto text-2xl font-bold text-bright-navy">{title}</h4>
        <span className="ml-2">
          <svg
            className={`h-8 w-8 transition-transform duration-300 ease-in-out ${
              isOpen ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {/* Chevron Down (rotates to up when expanded) */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div className="font-roboto mt-2 bg-transparent py-4">
          {children ? (
            children
          ) : isEditable && settings && onSettingsChange ? (
            <SettingsForm
              settings={settings}
              hasPartner={hasPartner}
              onSettingsChange={onSettingsChange}
              onReset={onReset}
              onStartAgain={onStartAgain}
              isBusy={isBusy}
            />
          ) : (
            <>
              {typeof content === 'object' && content && (content.value || content.metadata) ? (
                <>
                  <RichText field={content as RichTextField} />
                  {tableData && tableData.length > 0 && <DataTable rows={tableData} />}
                </>
              ) : typeof content === 'string' && content ? (
                <>
                  {content}
                  {tableData && tableData.length > 0 && <DataTable rows={tableData} />}
                </>
              ) : null}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpandablePanel;
