import { BannerComponentProps } from './Banner.types';
import { BannerComponentContent } from './Banner.content';
import classNames from 'classnames';
import { useAnalytics } from 'lib/challenger/hooks';
import { ImageField, NextImage, RichText, RichTextField } from '@sitecore-content-sdk/nextjs';

const BannerTemplate20 = (props: BannerComponentProps) => {
  const { bgColorClass } = props?.rendering?.fields;
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const { linkComponent } = useAnalytics(props.rendering);

  function renderIconsTexts(icon: ImageField | undefined, text: RichTextField | undefined) {
    if (!icon?.value?.src && !text?.value) {
      return <></>;
    }

    return (
      <>
        <div className="hidden lg:block">
          <NextImage
            field={icon}
            width={70}
            height={70}
            onError={(event) => ((event.target as HTMLImageElement).style.display = 'none')}
          />
          <RichText
            tag="p"
            className="hyphens-auto break-words font-roboto-400 font-bold text-bright-navy"
            field={text}
          />
        </div>
      </>
    );
  }

  return (
    <div
      id={uniqueId}
      role="banner"
      link_component={linkComponent}
      className={classNames('relative flex w-full flex-col-reverse md:flex-row', bgColorClass)}
    >
      <div
        className={classNames(
          'min-h-[350px] w-full md:h-[480px]',
          'bg-challenger-green',
          'relative flex flex-col'
        )}
      >
        <div
          className={classNames(
            'absolute right-0 flex h-[296px] w-full overflow-hidden sm:w-[409px]'
          )}
        >
          <div
            className={classNames('absolute -top-10 left-4 z-50 h-full w-full sm:left-0 sm:top-0')}
          >
            <div
              className={classNames(
                'absolute z-50 h-full w-full from-challenger-green via-deep-green to-deep-green clip-path-polygon-[81%_34%,72%_0,90%_0] bg-gradient-170'
              )}
            ></div>
            <div
              className={classNames(
                'absolute z-50 h-full  w-full from-challenger-green via-deep-green to-deep-green clip-path-polygon-[90%_0,100%_0,100%_45%,81%_34%] bg-gradient-230'
              )}
            ></div>
            <div
              className={classNames(
                'absolute z-40 h-full w-full from-bright-navy via-blue to-blue clip-path-polygon-[0_0,81%_34%,90%_0] bg-gradient-140'
              )}
            ></div>
            <div
              className={classNames(
                'absolute z-30 h-full w-full from-blue via-blue to-bright-navy clip-path-polygon-[71%_0,100%_98%,_100%_0] bg-gradient-10'
              )}
            ></div>
          </div>
        </div>
        <div
          className={classNames(
            'mb-5 mt-16 px-6 pb-12 lg:mt-24 xl:pl-24',
            'sm:[&_h1]:line-clamp-3 sm:[&_h2]:line-clamp-3 sm:[&_h3]:line-clamp-3 sm:[&_h4]:line-clamp-3',
            'lg:[&_h1]:line-clamp-2 lg:[&_h2]:line-clamp-2 lg:[&_h3]:line-clamp-2 lg:[&_h4]:line-clamp-2',
            'sm:[&_p]:line-clamp-4',
            '[&_h1]:leading-11 mr-10 [&_h1]:text-[2.5rem] sm:[&_h1]:text-5xl',
            '[&_h2]:leading-11 mr-10 [&_h2]:font-roboto-900 [&_h2]:text-[2.5rem] sm:[&_h2]:text-5xl',
            '[&_h3]:leading-11 mr-10 [&_h3]:font-roboto-900 [&_h3]:text-[2.5rem] sm:[&_h3]:text-5xl',
            '[&_h4]:leading-11 mr-10 [&_h4]:font-roboto-900 [&_h4]:text-[2.5rem] sm:[&_h4]:text-5xl'
          )}
        >
          <BannerComponentContent {...props} />

          <div className="ml-0 mr-12 mt-[30px] grid gap-y-2 md:auto-cols-fr md:grid-flow-col">
            {renderIconsTexts(props.rendering.fields.Icon1, props.rendering.fields.Text1)}
            {renderIconsTexts(props.rendering.fields.Icon2, props.rendering.fields.Text2)}
            {renderIconsTexts(props.rendering.fields.Icon3, props.rendering.fields.Text3)}
            {renderIconsTexts(props.rendering.fields.Icon4, props.rendering.fields.Text4)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerTemplate20;
