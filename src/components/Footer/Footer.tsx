import classNames from 'classnames';
import { FooterProps } from './Footer.types';
import { Placeholder } from '@sitecore-content-sdk/nextjs';
import { DESKTOP_MAX_WIDTH } from 'components/constants';
import { useAnalytics } from 'lib/challenger/hooks';

const Footer = (props: FooterProps): React.JSX.Element => {
  const { rendering } = props;
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || 'footer';
  const { linkComponent } = useAnalytics(props.rendering);

  return (
    <footer id={uniqueId} link_component={linkComponent} className="relative mt-auto w-full">
      <div className="flex w-full items-center justify-center bg-deep-blue px-6 pb-11 pt-7 text-white xl:px-0 ">
        <div
          className={classNames(
            'flex flex-col gap-10 xl:min-w-[1050px] xl:px-24',
            DESKTOP_MAX_WIDTH
          )}
        >
          <div className="flex flex-col gap-2 lg:flex-row">
            <div className="flex flex-col gap-1 lg:w-4/12">
              {rendering && <Placeholder name="footer-top-left" rendering={rendering} />}
            </div>
            <div className="mt-6 flex flex-col gap-2 lg:mt-7 lg:w-4/12">
              {rendering && <Placeholder name="footer-top-middle" rendering={rendering} />}
            </div>
            <div className="mt-5 lg:w-4/12 xl:mt-7">
              {rendering && <Placeholder name="footer-top-right" rendering={rendering} />}
            </div>
          </div>
          {rendering && <Placeholder name="footer-middle" rendering={rendering} />}
          <div className="mt-3 flex flex-col items-start gap-4 border-t border-light-blue text-xs lg:flex-row lg:items-start lg:justify-between">
            <div className="mt-9 w-full lg:w-3/12">
              {rendering && <Placeholder name="footer-bottom-left" rendering={rendering} />}
            </div>
            <div className="flex w-full items-end lg:mt-9 lg:w-9/12 lg:justify-end">
              {rendering && <Placeholder name="footer-bottom-right" rendering={rendering} />}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
