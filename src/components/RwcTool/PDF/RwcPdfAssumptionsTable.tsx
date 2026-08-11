import React from 'react';
import { Field, RichTextField, RichText, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import { CalcDTO, InputDTO } from './pdfTypes';

export interface PdfAssumptionsTableFields {
  heading?: Field<string> | RichTextField;
  column1Heading?: Field<string> | RichTextField;
  column2Heading?: Field<string> | RichTextField;
  column3Heading?: Field<string> | RichTextField;
  assetAllocationLabel?: Field<string> | RichTextField;
  assetDefensiveLabel?: Field<string> | RichTextField;
  assetGrowthLabel?: Field<string> | RichTextField;
  adminFeeLabel?: Field<string> | RichTextField;
  incomeTakenLabel?: Field<string> | RichTextField;
  investmentFeeLabel?: Field<string> | RichTextField;
  investmentAllocationLabel?: Field<string> | RichTextField;
  investmentDefensiveLabel?: Field<string> | RichTextField;
  investmentGrowthLabel?: Field<string> | RichTextField;
  personalAssetsLabel?: Field<string> | RichTextField;
  paymentLabel?: Field<string> | RichTextField;
  yourPartnerLabel?: Field<string> | RichTextField;
}

export interface PdfAssumptionsTableProps {
  fields?: PdfAssumptionsTableFields;
  calcDTO?: CalcDTO;
  inputDTO?: InputDTO;
  isCouple?: boolean;
  rendering?: ComponentRendering;
}

const renderRichTextOrText = (field?: Field<string> | RichTextField) => {
  if (!field) return null;

  if (typeof field === 'object' && 'value' in field) {
    return <RichText field={field as RichTextField} />;
  }

  return <span>{field as string}</span>;
};

export const RwcPdfAssumptionsTable = ({
  fields,
  calcDTO,
  inputDTO,
  isCouple,
}: PdfAssumptionsTableProps): React.JSX.Element | null => {
  if (!calcDTO) {
    return null;
  }

  return (
    <div className="pdf-report-rich-text pdf-assumptions-table">
      {renderRichTextOrText(fields?.heading)}

      <table className="drive-data-table">
        <thead>
          <tr>
            <td>{renderRichTextOrText(fields?.column1Heading)}</td>
            <td>{renderRichTextOrText(fields?.column2Heading)}</td>
            <td>{renderRichTextOrText(fields?.column3Heading)}</td>
          </tr>
        </thead>
        <tbody>
          <tr className="heading-only">
            <td>
              <strong>{renderRichTextOrText(fields?.assetAllocationLabel)}</strong>
            </td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td>
              {renderRichTextOrText(fields?.assetDefensiveLabel)}
              <br />
              {renderRichTextOrText(fields?.assetGrowthLabel)}
            </td>
            <td>
              {calcDTO.DefaultDefensiveSuperAssetAllocation}
              <br />
              {calcDTO.DefaultGrowthAsset}
            </td>
            <td>
              {calcDTO.AssetAllocChanged && (
                <>
                  {calcDTO.DefensiveSuperAssetAllocation}
                  <br />
                  {calcDTO.GrowthAsset}
                </>
              )}
            </td>
          </tr>

          <tr>
            <td>
              <strong>{renderRichTextOrText(fields?.adminFeeLabel)}</strong>
            </td>
            <td>{calcDTO.DefaultSuperAdminFee}</td>
            <td>{calcDTO.AdminFeeChanged && <>{calcDTO.SuperAdminFee}</>}</td>
          </tr>

          <tr className="heading-only">
            <td>
              <strong>{renderRichTextOrText(fields?.investmentFeeLabel)}</strong>
            </td>
            <td></td>
            <td></td>
          </tr>

          <tr>
            <td>
              {renderRichTextOrText(fields?.investmentDefensiveLabel)}
              <br />
              {renderRichTextOrText(fields?.investmentGrowthLabel)}
            </td>
            <td>
              {calcDTO.DefaultDefensiveSuperFee}
              <br />
              {calcDTO.DefaultGrowthSuperFee}
            </td>
            <td>
              {calcDTO.DefensiveInvestmentFeeChanged && <>{calcDTO.DefensiveSuperFee}</>}
              <br />
              {calcDTO.GrowthInvestmentFeeChanged && <>{calcDTO.GrowthSuperFee}</>}
            </td>
          </tr>

          <tr>
            <td>
              <strong>{renderRichTextOrText(fields?.incomeTakenLabel)}</strong>
            </td>
            <td>{calcDTO.DefaultLifetimeFundsSource}</td>
            <td>{calcDTO.IncomeStreamChanged && <>{calcDTO.LifetimeFundsSource}</>}</td>
          </tr>

          <tr>
            <td>
              <strong>{renderRichTextOrText(fields?.investmentAllocationLabel)}</strong>
            </td>
            <td>{calcDTO.DefaultSafetyNetInvestmentAllocation}</td>
            <td>
              {calcDTO.InvestmentAllocChanged && <>{calcDTO.CalcSafetyNetInvestmentAllocation}</>}
            </td>
          </tr>

          <tr>
            <td>
              <strong>{renderRichTextOrText(fields?.personalAssetsLabel)}</strong>
            </td>
            <td>{calcDTO.DefaultPersonalAssets}</td>
            <td>{calcDTO.PersonalAssetsChanged && <>{inputDTO?.PersonalAssets}</>}</td>
          </tr>

          <tr>
            <td>
              <strong>{renderRichTextOrText(fields?.paymentLabel)}</strong>
            </td>
            <td>
              {calcDTO.DefaultPerson1PaymentRate}
              <br />
              {(isCouple ?? false) && (
                <>
                  {calcDTO.DefaultPerson2PaymentRate}{' '}
                  {renderRichTextOrText(fields?.yourPartnerLabel)}
                </>
              )}
            </td>
            <td>
              {calcDTO.Investor1PaymentChanged && <>{calcDTO.Person1PaymentRate}</>}
              <br />
              {calcDTO.Investor2PaymentChanged && (isCouple ?? false) && (
                <>
                  {calcDTO.Person2PaymentRate} {renderRichTextOrText(fields?.yourPartnerLabel)}
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RwcPdfAssumptionsTable;
