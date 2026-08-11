import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { FormBgColor } from '../Form.types';

export interface FormSubscriptionProps {
  rendering: ComponentRendering & { params: ComponentParams };
}

const FormSubscription = (props: FormSubscriptionProps) => {
  const phKeyForm = 'form-subscription-main';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || '';
  const bgcolor = props?.rendering?.params?.FormHeaderBgColor || 'None';

  return (
    <div id={uniqueId} role="form" className={classNames('relative w-full')}>
      <div className="relative flex min-h-[410px] flex-col">
        <div className="relative z-40 flex min-h-[160px] w-full ">
          <div
            className={classNames('relative z-30 flex w-full flex-row', getBgFormColor(bgcolor))}
          >
            <div
              className={classNames(
                'clip-path-polygon-[56%_0%,100%_45%,100%_100%,0_100%,0%_23%]',
                'sm:clip-path-polygon-[50%_0,100%_59%,100%_100%,-39%_100%]',
                'bg-bright-navy',
                'absolute z-30 flex h-full min-h-[162px] w-full'
              )}
            ></div>
            <div
              className={classNames(
                'clip-path-polygon-[53%_1%,0_15%,0%_25%]',
                'sm:clip-path-polygon-[50%_0%,0_45%,0_60%]',
                'from-deep-green via-deep-green to-challenger-green bg-gradient-250',
                'absolute z-40 flex h-full w-full'
              )}
            ></div>
            <div
              className={classNames(
                'clip-path-polygon-[56%_0%,100%_25%,100%_46%]',
                'sm:clip-path-polygon-[50%_0%,100%_28%,100%_60%]',
                'from-deep-green to-challenger-green bg-gradient-170',
                'absolute z-40 h-full w-full'
              )}
            ></div>
          </div>
        </div>
        <div
          className={classNames(
            'relative z-40 w-full sm:left-0 sm:right-0 sm:top-0 sm:mx-auto',
            'bg-gradient-to-t from-bright-navy-light to-bright-navy',
            'h-auto min-h-[430px]',
            'w-full'
          )}
        >
          <div className={classNames('flex w-full flex-col')}>
            <Placeholder key={phKeyForm} name={phKeyForm} rendering={props.rendering} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const getBgFormColor = (bgColor: string | undefined): FormBgColor => {
  if (bgColor) {
    switch (bgColor.toLowerCase()) {
      case 'grey':
        return FormBgColor.Grey;
      case 'navy':
        return FormBgColor.Navy;
      case 'green':
        return FormBgColor.Green;
      case 'white':
        return FormBgColor.White;
      case 'teal':
        return FormBgColor.Teal;
      case 'blue':
        return FormBgColor.Blue;
      case 'lighblue':
        return FormBgColor.LightBlue;
      case 'deepblue':
        return FormBgColor.DeepBlue;

      default:
        return FormBgColor.None;
    }
  }
  return FormBgColor.None;
};

export default FormSubscription;
