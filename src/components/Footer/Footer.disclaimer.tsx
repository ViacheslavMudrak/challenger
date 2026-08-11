import { RichText } from '@sitecore-content-sdk/nextjs';
import IconButton from 'components/IconButton/IconButton';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { useState } from 'react';
import { DisclaimerProps } from './Footer.disclaimer.types';

const FooterDisclaimer = (props: DisclaimerProps): React.JSX.Element => {
  const [toggleDisclaimer, setToggleDisclaimer] = useState<boolean>(false);
  const handleClick = () => {
    setToggleDisclaimer(!toggleDisclaimer);
  };

  const { personaValue, defaultValue } = props.rendering?.fields?.data;

  const disclaimerText =
    personaValue?.DisclaimerText?.value || defaultValue?.DisclaimerText?.value || '';
  const disclaimerGeneralText =
    personaValue?.DisclaimerGeneralText?.value || defaultValue?.DisclaimerGeneralText?.value || '';

  const renderDisclaimerText = () => {
    if (disclaimerText.length > 0) {
      return (
        <div className="mt-4 flex w-full cursor-pointer flex-col" onClick={handleClick}>
          <div className="group flex w-full items-start justify-between">
            <div className="flex flex-col">
              <span className="text-lg group-hover:text-bright-teal">Disclaimer</span>
              {renderGeneralDisclaimer()}
            </div>

            <div className="flex w-fit items-center">
              <IconButton
                type={toggleDisclaimer ? 'ChevronUpIcon' : 'ChevronDownIcon'}
                iconSize={IconSize.Lg}
                iconColor={IconColor.White}
                onClick={handleClick}
                ariaLabel={toggleDisclaimer ? 'Collapse' : 'Expand'}
                className="[&_svg]:group-hover:text-bright-teal"
              />
            </div>
          </div>
          {toggleDisclaimer && (
            <div className="flex flex-col gap-5 text-xs [&_a]:underline [&_p]:pb-4">
              <RichText field={{ value: disclaimerText }} />
            </div>
          )}
        </div>
      );
    }

    return <></>;
  };

  const renderGeneralDisclaimer = () => {
    if (disclaimerGeneralText.length > 0) {
      return (
        <div className="mt-2 flex flex-col gap-5 text-xs [&_a]:underline [&_p]:pb-4">
          <RichText field={{ value: disclaimerGeneralText }} />
        </div>
      );
    }

    return <></>;
  };

  return <>{renderDisclaimerText()}</>;
};

export default FooterDisclaimer;
