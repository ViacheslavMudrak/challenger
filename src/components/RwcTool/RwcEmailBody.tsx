import React from 'react';
import {
  Field,
  ImageField,
  LinkField,
  RichTextField,
  NextImage,
  RichText,
  ComponentRendering,
} from '@sitecore-content-sdk/nextjs';

export interface RwcEmailBodyFields {
  logo?: ImageField;
  logoLink?: LinkField;
  banner?: ImageField;
  bannerLink?: LinkField;
  headlinetext?: Field<string> | RichTextField;
  body?: Field<string> | RichTextField;
  signature?: Field<string> | RichTextField;
  footer?: Field<string> | RichTextField;
}

export type RwcEmailBodyProps = {
  params: { [key: string]: string };
  fields: RwcEmailBodyFields;
  rendering: ComponentRendering;
};

export const Default = (props: RwcEmailBodyProps): React.JSX.Element => {
  const { fields, params } = props;
  const id = params?.RenderingIdentifier;
  const logoField = fields.logo;
  const logoLinkField = fields.logoLink;
  const bannerField = fields.banner;
  const bannerLinkField = fields.bannerLink;
  const headlineText = fields.headlinetext;
  const body = fields.body;
  const signature = fields.signature;
  const footer = fields.footer;

  // Extract link URLs
  const logoLinkUrl = logoLinkField?.value?.href;
  const bannerLinkUrl = bannerLinkField?.value?.href;

  return (
    <>
      <div className="rwc-email-body-wrapper">
        <style>{`
        .rwc-email-body-wrapper p,
        .rwc-email-body-wrapper a,
        .rwc-email-body-wrapper h3
        {
          all:revert !important;
        }
        table.body {
          border: 0px none rgb(0, 0, 0);
          border-spacing: 0px;
          border-collapse: collapse;
          width: 100%;
          background-color: rgb(229, 229, 229);
        }

        table.body td {
          padding: 0px;
        }

        table.content {
          width: 600px;
          border: 0px none rgb(0, 0, 0);
          border-collapse: collapse;
          border-spacing: 0px;
          margin: 0px auto;
        }

        table.content td {
          color: rgb(0, 0, 0);
          padding: 20px 30px;
          background-color: rgb(255, 255, 255);
        }

        table.content tr.img td.block {
          font-size: 16px;
          line-height: 24px;
          margin: 0px;
        }

        table.content tr.email-body td.block {
          font-size: 16px;
          line-height: 24px;
          margin: 0px;
        }

        table.content tr.email-footer td.block {
          padding: 20px 20px 10px;
          background-color: rgb(229, 229, 229);
          color: rgb(90, 90, 90);
          font-size: 12px;
          line-height: 16px;
          margin: 0px;
        }

        table.content tr.img td.block img.email-logo {
          border: 0px none rgb(0, 0, 0);
          display: block;
          outline: rgb(0, 0, 0) none 0px;
          text-decoration: none solid rgb(0, 0, 0);
          max-width: 110px;
          max-height: 30px;
        }

        table.content tr.img td.block a.logo-link {
          color: rgb(0, 0, 0);
          font-size: 16px;
          line-height: 24px;
          margin: 0px;
        }

        table.content tr.img.banner td.block {
          padding: 0px;
        }

        table.content tr.img.banner td.block img.email-banner {
          border: 0px none rgb(0, 0, 0);
          display: block;
          outline: rgb(0, 0, 0) none 0px;
          text-decoration: none solid rgb(0, 0, 0);
          max-width: 600px;
          max-height: 255px;
        }

        table.content tr.img.banner td.block a.banner-link {
          color: rgb(0, 0, 0);
          font-size: 16px;
          line-height: 24px;
          margin: 0px;
        }

        table.content tr.headline td {
          background-color: #b5bd00;
          font-size: 24px;
          line-height: 24px;
          margin: 0px;
          vertical-align: middle;
          font-weight: bold;
        }
      `}</style>
        <table className={`body ${params?.styles || ''}`} id={id ? id : undefined}>
          <tbody>
            <tr>
              <td>
                <table className="content" align="center">
                  <tbody>
                    {/* Logo */}
                    <tr className="img">
                      <td className="block">
                        {logoLinkUrl && logoField ? (
                          <a href={logoLinkUrl} className="logo-link">
                            <NextImage field={logoField} className="email-logo" />
                          </a>
                        ) : logoField ? (
                          <NextImage field={logoField} className="email-logo" />
                        ) : null}
                      </td>
                    </tr>

                    {/* Banner */}
                    <tr className="img banner">
                      <td className="block">
                        {bannerLinkUrl && bannerField ? (
                          <a href={bannerLinkUrl} className="banner-link">
                            <NextImage field={bannerField} className="email-banner" />
                          </a>
                        ) : bannerField ? (
                          <NextImage field={bannerField} className="email-banner" />
                        ) : null}
                      </td>
                    </tr>

                    {/* Headline */}
                    <tr className="headline">
                      <td>
                        {headlineText ? (
                          typeof headlineText === 'object' && 'value' in headlineText ? (
                            <RichText field={headlineText as RichTextField} />
                          ) : (
                            <div>{headlineText as string}</div>
                          )
                        ) : null}
                      </td>
                    </tr>

                    {/* Body */}
                    <tr className="email-body">
                      <td className="block">
                        {body ? (
                          typeof body === 'object' && 'value' in body ? (
                            <RichText field={body as RichTextField} />
                          ) : (
                            <div>{body as string}</div>
                          )
                        ) : null}
                      </td>
                    </tr>

                    {/* Signature */}
                    <tr className="email-signature">
                      <td className="block">
                        {signature ? (
                          typeof signature === 'object' && 'value' in signature ? (
                            <RichText field={signature as RichTextField} />
                          ) : (
                            <div>{signature as string}</div>
                          )
                        ) : null}
                      </td>
                    </tr>

                    {/* Footer */}
                    <tr className="email-footer">
                      <td className="block">
                        {footer ? (
                          typeof footer === 'object' && 'value' in footer ? (
                            <RichText field={footer as RichTextField} />
                          ) : (
                            <div>{footer as string}</div>
                          )
                        ) : null}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
