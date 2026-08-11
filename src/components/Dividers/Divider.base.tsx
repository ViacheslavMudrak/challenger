import { ComponentParams, ComponentRendering } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { getDividerColor } from './Divider.helpers';
import { DividerFields, Variant } from './Divider.types';

export interface DividerProps {
  rendering: ComponentRendering & { params: ComponentParams } & {
    fields: DividerFields;
  };
}

export const DividerBase = (props: DividerProps): React.JSX.Element => {
  const containerStyles = props?.rendering?.params?.Styles || '';
  const dividerType = props?.rendering?.params?.FieldNames || '';

  const defaultColor = {
    fields: {
      Color: {
        value: '',
      },
    },
  };

  const {
    DividerColorTop1 = defaultColor,
    DividerColorTop2 = defaultColor,
    DividerColorBottom1 = defaultColor,
    DividerColorBottom2 = defaultColor,
    DividerTopBgColor = defaultColor,
    DividerBottomBgColor = defaultColor,
  } = props.rendering.fields;

  let colorTop1 = getDividerColor(DividerColorTop1?.fields.Color.value);
  let colorTop2 = getDividerColor(DividerColorTop2?.fields.Color.value);
  const topBgColor = DividerTopBgColor?.fields?.Color?.value;

  let colorBottom1 = getDividerColor(DividerColorBottom1?.fields.Color.value);
  let colorBottom2 = getDividerColor(DividerColorBottom2?.fields.Color.value);
  const bottomBgColor = DividerBottomBgColor?.fields?.Color?.value;

  if (!props.rendering) {
    return <></>;
  }

  if (dividerType === Variant.Divider1Top) {
    colorTop1 = colorTop1 || 'bg-challenger-green';
    colorTop2 = colorTop2 || 'bg-deep-blue';

    return (
      <div className={classNames('relative h-16 w-full lg:h-[87px]', containerStyles, topBgColor)}>
        <div
          className={classNames(
            'absolute z-10 h-full w-full',
            'clip-path-polygon-[100%_0%,0%_100%,100%_44%]',
            colorTop1
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-20 h-full w-full',
            'clip-path-polygon-[100%_42%,0%_100%,100%_100%]',
            colorTop2
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider1Bottom) {
    colorBottom1 = colorBottom1 || 'bg-deep-blue';
    colorBottom2 = colorBottom2 || 'bg-blue';

    return (
      <div
        className={classNames('relative h-16 w-full lg:h-[87px]', containerStyles, bottomBgColor)}
      >
        <div
          className={classNames(
            'absolute z-10 h-full w-full clip-path-polygon-[100%_0,0_0,100%_77%]',
            colorBottom1
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-20 h-full w-full clip-path-polygon-[100%_59%,0%_0%,100%_100%]',
            colorBottom2
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider2Top) {
    colorTop1 = colorTop1 || 'bg-deep-blue';
    colorTop2 = colorTop2 || 'bg-challenger-green';

    return (
      <div className={classNames('relative h-16 w-full lg:h-[87px]', containerStyles, topBgColor)}>
        <div
          className={classNames(
            'absolute z-10 h-full w-full clip-path-polygon-[0%_44%,0%_100%,100%_100%]',
            colorTop1
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-20 h-full w-full clip-path-polygon-[0%_0%,0%_44%,100%_100%]',
            colorTop2
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider2Bottom) {
    colorBottom1 = colorBottom1 || 'bg-deep-blue';
    colorBottom2 = colorBottom2 || 'bg-blue';

    return (
      <div
        className={classNames('relative h-16 w-full lg:h-[87px]', containerStyles, bottomBgColor)}
      >
        <div
          className={classNames(
            'absolute z-10 h-full w-full clip-path-polygon-[0%_0%,0_77%,100%_0%]',
            colorBottom1
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-20 h-full w-full clip-path-polygon-[0%_59%,0%_100%,100%_0%]',
            colorBottom2
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider3Top) {
    colorTop1 = colorTop1 || 'bg-deep-blue';

    return (
      <div
        className={classNames('relative h-[70px] w-full lg:h-[90px]', containerStyles, topBgColor)}
      >
        <div
          className={classNames(
            'absolute z-10 h-full w-full',
            colorTop1,
            'lg:clip-path-polygon-[75%_0,0%_100%,100%_100%]',
            'clip-path-polygon-[43%_0%,100%_82%,100%_100%,0_100%,0_25%]'
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider3Bottom) {
    colorBottom1 = colorBottom1 || 'bg-deep-blue';

    return (
      <div
        className={classNames('relative h-12 w-full lg:h-[82px]', containerStyles, bottomBgColor)}
      >
        <div
          className={classNames(
            'absolute z-10 h-full w-full',
            colorBottom1,
            'lg:clip-path-polygon-[84%_100%,0_0,100%_0]',
            'clip-path-polygon-[100%_0,100%_60%,87%_100%,0_59%,0_0]'
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider4Top) {
    colorTop1 = colorTop1 || 'bg-white';

    return (
      <div className={classNames('relative h-12 w-full lg:h-[90px]', containerStyles, topBgColor)}>
        <div
          className={classNames(
            'absolute z-10 h-full w-full',
            colorTop1,
            'clip-path-polygon-[50%_0,0%_100%,100%_100%]'
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider4Bottom) {
    colorBottom1 = colorBottom1 || 'bg-white';

    return (
      <div
        className={classNames('relative h-12 w-full lg:h-[90px]', containerStyles, bottomBgColor)}
      >
        <div
          className={classNames(
            'absolute z-10 h-full w-full',
            colorBottom1,
            'clip-path-polygon-[50%_100%,0_0,100%_0]'
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider5Top) {
    colorTop1 = colorTop1 || 'bg-white';

    return (
      <div className={classNames('relative h-12 w-full lg:h-[88px]', containerStyles, topBgColor)}>
        <div
          className={classNames(
            'absolute z-10 h-full w-full',
            colorTop1,
            'clip-path-polygon-[34%_0,0%_100%,100%_100%]'
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider5Bottom) {
    colorBottom1 = colorBottom1 || 'bg-white';

    return (
      <div
        className={classNames('relative h-12 w-full lg:h-[90px]', containerStyles, bottomBgColor)}
      >
        <div
          className={classNames(
            'absolute z-10 h-full w-full',
            colorBottom1,
            'clip-path-polygon-[17%_100%,0_0,100%_0]'
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider6Top) {
    colorTop1 = colorTop1 || 'bg-white';

    return (
      <div className={classNames('relative h-12 w-full lg:h-[88px]', containerStyles, topBgColor)}>
        <div
          className={classNames(
            'absolute z-10 h-full w-full',
            colorTop1,
            'clip-path-polygon-[62%_0,0%_100%,100%_100%]'
          )}
        ></div>
      </div>
    );
  }

  if (dividerType === Variant.Divider6Bottom) {
    colorBottom1 = colorBottom1 || 'bg-white';

    return (
      <div
        className={classNames('relative h-12 w-full lg:h-[90px]', containerStyles, bottomBgColor)}
      >
        <div
          className={classNames(
            'absolute z-10 h-full w-full',
            colorBottom1,
            'clip-path-polygon-[62%_100%,0_0,100%_0]'
          )}
        ></div>
      </div>
    );
  }

  return <></>;
};
