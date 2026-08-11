import classNames from 'classnames';
import { CardFields, CardProps, HeadingType } from './Card.types';
import { Field, LinkField, Link, Text } from '@sitecore-content-sdk/nextjs';
import CardBaseIcon from './Card.base.icon';
import { IconColor } from 'components/Icons/icon.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import { useEffect, useState } from 'react';
import { SOCIAL_CARD_CONFIG } from 'lib/config';

export type CardInfo13Fields = CardFields & {
  Icon1?: {
    fields: {
      IconType: Field<string>;
    };
  };
  Link1?: LinkField;
  Icon2?: {
    fields: {
      IconType: Field<string>;
    };
  };
  Link2?: LinkField;
  Icon3?: {
    fields: {
      IconType: Field<string>;
    };
  };
  Link3?: LinkField;
};

const CardInfo13 = (props: CardProps<CardInfo13Fields>): React.JSX.Element => {
  const { Heading, HeadingLevel } = props.rendering.fields;
  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';

  const icon1Type = 'FacebookIcon';
  const icon2Type = 'LinkedInIcon';
  const icon3Type = 'MailIcon';

  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);
  const [pageURL, setPageURL] = useState('');

  const defaultSocialMediaLinks = {
    Link1: {
      value: {
        href: SOCIAL_CARD_CONFIG.facebook,
        linktype: 'external',
        url: SOCIAL_CARD_CONFIG.facebook,
        text: 'facebook',
        anchor: '',
        target: '_blank',
      },
    },
    Link2: {
      value: {
        href: SOCIAL_CARD_CONFIG.linkedin,
        linktype: 'external',
        url: SOCIAL_CARD_CONFIG.linkedin,
        text: 'linkedin',
        anchor: '',
        target: '_blank',
      },
    },
    Link3: {
      value: {
        href: SOCIAL_CARD_CONFIG.email,
        text: 'info@challenger.com.au',
        linktype: 'mailto',
        style: '',
        url: SOCIAL_CARD_CONFIG.email,
        title: '',
      },
    },
  };
  const [socialMediaLinks, setSocialMediaLinks] = useState(defaultSocialMediaLinks);

  useEffect(() => {
    if (typeof window !== 'undefined' && !isEditMode) {
      setPageURL(window.location.href);
    }
  }, []);

  useEffect(() => {
    let link1 = socialMediaLinks.Link1.value.href;
    let link2 = socialMediaLinks.Link2.value.href;
    let link3 = socialMediaLinks.Link3.value.href;
    if (socialMediaLinks.Link1.value.href) {
      link1 += pageURL;
    }
    if (socialMediaLinks.Link2.value.href) {
      link2 += pageURL;
    }
    if (socialMediaLinks.Link3.value.href) {
      link3 += pageURL;
    }
    setSocialMediaLinks({
      Link1: { value: { ...socialMediaLinks.Link1.value, href: link1 } },
      Link2: { value: { ...socialMediaLinks.Link2.value, href: link2 } },
      Link3: { value: { ...socialMediaLinks.Link3.value, href: link3 } },
    });
  }, [pageURL]);

  const renderLinks = () => {
    if (isEditMode) {
      return (
        <>
          <Link field={socialMediaLinks.Link1 || {}} editable={false}>
            <CardBaseIcon icon={icon1Type} color={IconColor.White} />
          </Link>
          <Link field={socialMediaLinks.Link2 || {}} editable={false}>
            <CardBaseIcon icon={icon2Type} color={IconColor.White} />
          </Link>
          <Link field={socialMediaLinks.Link3 || {}} editable={false}>
            <CardBaseIcon icon={icon3Type} color={IconColor.White} />
          </Link>
        </>
      );
    }

    return (
      <>
        {socialMediaLinks.Link1.value.href && (
          <Link
            field={socialMediaLinks.Link1}
            link_name={socialMediaLinks.Link1.value.text}
            social_platform={icon1Type}
          >
            <CardBaseIcon icon={icon1Type} color={IconColor.White} />
          </Link>
        )}
        {socialMediaLinks.Link2.value.href && (
          <Link
            field={socialMediaLinks.Link2}
            link_name={socialMediaLinks.Link2.value.text}
            social_platform={icon2Type}
          >
            <CardBaseIcon icon={icon2Type} color={IconColor.White} />
          </Link>
        )}
        {socialMediaLinks.Link3.value.href && (
          <Link
            field={socialMediaLinks.Link3}
            link_name={socialMediaLinks.Link3.value.text}
            social_platform={icon3Type}
          >
            <CardBaseIcon icon={icon3Type} color={IconColor.White} />
          </Link>
        )}
      </>
    );
  };

  return (
    <div
      link_component={linkComponent}
      className={classNames(
        'flex min-h-[130px] w-full items-center bg-bright-navy px-8 py-12 lg:w-[824px]'
      )}
    >
      <div
        className={classNames(
          'flex w-full flex-col items-center justify-between gap-4 text-left',
          isEditMode ? 'md:flex-col' : 'md:flex-row'
        )}
      >
        <CustomHeading className={classNames('font-roboto-700 text-2xl text-white')}>
          <Text field={Heading} />
        </CustomHeading>

        <div className={classNames('flex gap-8 text-white', { 'flex-row': isEditMode })}>
          {renderLinks()}
        </div>
      </div>
    </div>
  );
};

export default CardInfo13;
