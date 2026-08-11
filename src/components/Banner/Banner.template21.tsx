import { BannerComponentProps } from './Banner.types';
import classNames from 'classnames';
import RatesCard from 'components/RatesCard/RatesCard';
import { NextImage, Placeholder, RichText } from '@sitecore-content-sdk/nextjs';
import { useAnalytics } from 'lib/challenger/useAnalytics';

const BannerTemplate21 = (props: BannerComponentProps) => {
  const BannerImage = props?.rendering?.fields?.BannerImage;
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const { linkComponent } = useAnalytics(props.rendering);
  const phKey = `banner-button`;

  return (
    <div
      id={uniqueId}
      role="banner"
      link_component={linkComponent}
      className={classNames('relative flex w-full bg-transparent')}
    >
      <div className={classNames('relative min-h-[350px] w-full bg-transparent md:h-[480px]')}>
        <div
          className={classNames(
            'flex',
            'clip-path-polygon-[0%_0%,0%_30%,12%_0%]',
            'md:clip-path-polygon-[0%_0%,0%_50%,6%_0%]',
            'z-70 absolute h-full w-full',
            'from-bright-navy via-blue to-blue bg-gradient-60'
          )}
        ></div>

        <div
          className={classNames(
            'flex',
            'clip-path-polygon-[0%_0%,0%_10%,25%_0%]',
            'md:clip-path-polygon-[0%_0%,0%_14%,20%_0%]',
            'z-70 absolute h-full w-full',
            'from-bright-navy via-blue to-blue bg-gradient-60'
          )}
        ></div>

        <div
          className={classNames(
            'flex',
            'clip-path-polygon-[0%_4%,0%_9%,9.5%_6.2%]',
            'md:clip-path-polygon-[0%_6%,0%_15%,4.8%_10.6%]',
            'z-60 absolute h-full w-full',
            'from-challenger-green via-deep-green to-deep-green bg-gradient-80'
          )}
        ></div>

        <div
          className={classNames(
            'flex',
            'clip-path-polygon-[0%_0%,0%_4.1%,9.5%_6.3%,13%_0%]',
            'md:clip-path-polygon-[0%_0%,0%_6.1%,4.7%_10.7%,7%_0%]',
            'z-60 absolute h-full w-full',
            'from-challenger-green via-deep-green to-deep-green bg-gradient-90'
          )}
        ></div>
        <div
          className={classNames(
            'flex min-h-[350px] w-full flex-col items-center justify-center bg-transparent sm:gap-4 md:h-full md:gap-0 lg:gap-4'
          )}
        >
          <div className="pt-10 text-center md:px-24 md:pt-3 lg:px-0 lg:pt-10">
            <RichText
              tag="h1"
              field={props.rendering.fields.BannerHeading}
              className="text-bright-navy"
            />
            <RichText
              tag="h3"
              field={props.rendering.fields.BannerSubHeading}
              className="text-challenger-green"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <RatesCard />

            {BannerImage?.value?.src ? (
              <NextImage field={BannerImage} height={250} width={350} className="hidden md:block" />
            ) : (
              <></>
            )}
          </div>
          <div className={`flex w-full flex-row justify-center px-4`}>
            <Placeholder key={phKey} name={phKey} rendering={props?.rendering} />
          </div>

          <RichText
            field={props?.rendering?.fields?.DisclaimerText}
            className="px-4 py-2 text-sm text-bright-navy"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate21;
