import React from 'react';
import { Field, RichTextField, RichText, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { InputDTO } from './pdfTypes';

export interface PdfSummaryTableFields {
  guideResultText?: Field<string> | RichTextField;
  introText?: Field<string> | RichTextField;
  ageLabel?: Field<string> | RichTextField;
  genderLabel?: Field<string> | RichTextField;
  relationshipStatusLabel?: Field<string> | RichTextField;
  partnerLabel?: Field<string> | RichTextField;
  partnerAgeLabel?: Field<string> | RichTextField;
  retirementOutlookLabel?: Field<string> | RichTextField;
  superAmountLabel?: Field<string> | RichTextField;
  partnerSuperAmountLabel?: Field<string> | RichTextField;
  weeklySpendLabel?: Field<string> | RichTextField;
  coupleAgePensionLabel?: Field<string> | RichTextField;
  singleAgePensionLabel?: Field<string> | RichTextField;
  livingStatusLabel?: Field<string> | RichTextField;
  singleSavingsAmountLabel?: Field<string> | RichTextField;
  coupleSavingsAmountLabel?: Field<string> | RichTextField;
  singleInvestmentFundsAmountLabel?: Field<string> | RichTextField;
  coupleInvestmentFundsAmountLabel?: Field<string> | RichTextField;
  combinedPropertyInvestmentLabel?: Field<string> | RichTextField;
  singleRentIncomeLabel?: Field<string> | RichTextField;
  coupleRentIncomeLabel?: Field<string> | RichTextField;
  singleIncomeLabel?: Field<string> | RichTextField;
  singleYearsWorkingLabel?: Field<string> | RichTextField;
  partnerIncomeLabel?: Field<string> | RichTextField;
  partnerYearsWorkingLabel?: Field<string> | RichTextField;
  retirementOutlookValue?: Field<string> | RichTextField;
  perWeekLabel?: Field<string> | RichTextField;
  perMonthLabel?: Field<string> | RichTextField;
  yearsLabel?: Field<string> | RichTextField;
  perYearLabel?: Field<string> | RichTextField;
  yearSingularLabel?: Field<string> | RichTextField;
}

export interface PdfSummaryTableProps {
  params?: { [key: string]: string };
  fields?: PdfSummaryTableFields;
  inputDTO?: InputDTO;
  isCouple?: boolean;
  hasSavingsAmount?: boolean;
  hasShares?: boolean;
  hasProperty?: boolean;
  hasRent?: boolean;
  investor1HasIncome?: boolean;
  investor1RemainWorking?: boolean;
  investor1HasIncomeGreaterThan1?: boolean;
  investor2HasIncome?: boolean;
  investor2RemainWorking?: boolean;
  investor2HasIncomeGreaterThan1?: boolean;
  rendering?: ComponentRendering;
}

const renderField = (field?: Field<string> | RichTextField) => {
  if (!field) return null;
  if (typeof field === 'object' && 'value' in field) {
    return <RichText field={field as RichTextField} />;
  }
  return <span>{field as string}</span>;
};

export const Default = ({
  fields,
  inputDTO,
  isCouple = false,
  hasSavingsAmount = false,
  hasShares = false,
  hasProperty = false,
  hasRent = false,
  investor1HasIncome = false,
  investor1RemainWorking = false,
  investor1HasIncomeGreaterThan1 = false,
  investor2HasIncome = false,
  investor2RemainWorking = false,
  investor2HasIncomeGreaterThan1 = false,
}: PdfSummaryTableProps): React.JSX.Element => {
  if (!fields || !inputDTO) {
    return <></>;
  }

  return (
    <>
      <div className="tool-results-guide include-margin">
        <div>
          <div className="pdf-report-rich-text">{renderField(fields.guideResultText)}</div>
        </div>
      </div>

      <div className="page-breaker" style={{ pageBreakAfter: 'always' }}></div>

      <div className="summary-table-intro">
        <div className="summary-intro-text">{renderField(fields.introText)}</div>
      </div>

      <div className="summary-table">
        <table className="layout-table">
          <tbody>
            <tr>
              <td>{renderField(fields.ageLabel)}</td>
              <td>{inputDTO.Investor1Age}</td>
            </tr>
            <tr>
              <td>{renderField(fields.genderLabel)}</td>
              <td>{inputDTO.Investor1Gender}</td>
            </tr>
            <tr>
              <td>{renderField(fields.relationshipStatusLabel)}</td>
              <td>{inputDTO.RelationshipStatus}</td>
            </tr>
            {isCouple && (
              <>
                <tr>
                  <td>{renderField(fields.partnerLabel)}</td>
                  <td>{inputDTO.Investor2Gender}</td>
                </tr>
                <tr>
                  <td>{renderField(fields.partnerAgeLabel)}</td>
                  <td>{inputDTO.Investor2Age}</td>
                </tr>
              </>
            )}
            <tr>
              <td>{renderField(fields.superAmountLabel)}</td>
              <td>{inputDTO.Investor1SuperAmount}</td>
            </tr>
            {isCouple && (
              <tr>
                <td>{renderField(fields.partnerSuperAmountLabel)}</td>
                <td>{inputDTO.Investor2SuperAmount}</td>
              </tr>
            )}
            <tr>
              <td>{renderField(fields.weeklySpendLabel)}</td>
              <td>
                {inputDTO.InputSpendPerWeek} {renderField(fields.perWeekLabel)}
              </td>
            </tr>
            <tr>
              <td>
                {renderField(
                  isCouple ? fields.coupleAgePensionLabel : fields.singleAgePensionLabel
                )}
              </td>
              <td>{inputDTO.ReceiveAgePension}</td>
            </tr>
            <tr>
              <td>{renderField(fields.livingStatusLabel)}</td>
              <td>{inputDTO.InputOwnHome}</td>
            </tr>
            {hasSavingsAmount && (
              <tr>
                <td>
                  {renderField(
                    isCouple ? fields.coupleSavingsAmountLabel : fields.singleSavingsAmountLabel
                  )}
                </td>
                <td>{inputDTO.InputSavingsAmount}</td>
              </tr>
            )}
            {hasShares && (
              <tr>
                <td>
                  {renderField(
                    isCouple
                      ? fields.coupleInvestmentFundsAmountLabel
                      : fields.singleInvestmentFundsAmountLabel
                  )}
                </td>
                <td>{inputDTO.InputSharesValue}</td>
              </tr>
            )}
            {hasProperty && (
              <tr>
                <td>{renderField(fields.combinedPropertyInvestmentLabel)}</td>
                <td>{inputDTO.InputInvestmentPropertyValue}</td>
              </tr>
            )}
            {hasRent && (
              <tr>
                <td>
                  {renderField(
                    isCouple ? fields.coupleRentIncomeLabel : fields.singleRentIncomeLabel
                  )}
                </td>
                <td>
                  {inputDTO.InputInvestmentPropertyRentPerWeek} {renderField(fields.perWeekLabel)}
                </td>
              </tr>
            )}
            {investor1HasIncome && (
              <tr>
                <td>{renderField(fields.singleIncomeLabel)}</td>
                <td>
                  {inputDTO.Investor1EmploymentIncome} {renderField(fields.perYearLabel)}
                </td>
              </tr>
            )}
            {investor1RemainWorking && (
              <tr>
                <td>{renderField(fields.singleIncomeLabel)}</td>
                <td>
                  {inputDTO.Investor1EmployRemainYears}{' '}
                  {renderField(
                    investor1HasIncomeGreaterThan1 ? fields.yearsLabel : fields.yearSingularLabel
                  )}
                </td>
              </tr>
            )}
            {isCouple && (
              <>
                {investor2HasIncome && (
                  <tr>
                    <td>{renderField(fields.partnerIncomeLabel)}</td>
                    <td>
                      {inputDTO.Investor2EmploymentIncome} {renderField(fields.perYearLabel)}
                    </td>
                  </tr>
                )}
                {investor2RemainWorking && (
                  <tr>
                    <td>{renderField(fields.partnerYearsWorkingLabel)}</td>
                    <td>
                      {inputDTO.Investor2EmployRemainYears}{' '}
                      {renderField(
                        investor2HasIncomeGreaterThan1
                          ? fields.yearsLabel
                          : fields.singleYearsWorkingLabel
                      )}
                    </td>
                  </tr>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};
