import React from 'react';
import { ComponentParams, ComponentRendering, Placeholder } from '@sitecore-content-sdk/nextjs';
import classNames from 'classnames';
import { DESKTOP_MAX_WIDTH } from 'components/constants';
import { useAnalytics } from 'lib/challenger/hooks';

interface ComponentProps {
  rendering: ComponentRendering & { params: ComponentParams } & { variant: Variant };
}

export enum Variant {
  // 2 Column Layouts
  Default = 'default',
  SixtyForty = 'SixtyForty',
  FortySixty = 'FortySixty',
  TwentyEighty = 'TwentyEighty',
  FullWidth = 'FullWidth',

  // 3 Column Layouts
  EqualThirds = 'EqualThirds',
  FiftyTwentyfiveTwentyfive = 'FiftyTwentyfiveTwentyfive',
  TwentyfiveTwentyfiveFifty = 'TwentyfiveTwentyfiveFifty',

  // 4 Column Layouts
  EqualQuarters = 'EqualQuarters',
}

// Column configuration type
interface ColumnConfig {
  columns: number;
  widthClasses: string[];
}

// Configuration mapping for each variant
const VARIANT_CONFIGS: Record<Variant, ColumnConfig> = {
  // 2 Column Layouts
  [Variant.Default]: {
    columns: 2,
    widthClasses: ['w-full lg:w-1/2', 'w-full lg:w-1/2'],
  },
  [Variant.SixtyForty]: {
    columns: 2,
    widthClasses: ['w-full lg:w-3/5', 'w-full lg:w-2/5'],
  },
  [Variant.FortySixty]: {
    columns: 2,
    widthClasses: ['w-full lg:w-2/5', 'w-full lg:w-3/5'],
  },
  [Variant.TwentyEighty]: {
    columns: 2,
    widthClasses: ['flex w-full lg:w-3/12', 'w-full lg:w-9/12'],
  },
  [Variant.FullWidth]: {
    columns: 1,
    widthClasses: ['w-full'],
  },

  // 3 Column Layouts
  [Variant.EqualThirds]: {
    columns: 3,
    widthClasses: ['w-full lg:w-1/3 ', 'w-full lg:w-1/3 ', 'w-full lg:w-1/3 '],
  },
  [Variant.FiftyTwentyfiveTwentyfive]: {
    columns: 3,
    widthClasses: ['w-full lg:w-1/2', 'w-full lg:w-1/4', 'w-full lg:w-1/4'],
  },
  [Variant.TwentyfiveTwentyfiveFifty]: {
    columns: 3,
    widthClasses: ['w-full lg:w-1/4', 'w-full lg:w-1/4', 'w-full lg:w-1/2'],
  },

  // 4 Column Layouts
  [Variant.EqualQuarters]: {
    columns: 4,
    widthClasses: ['w-full lg:w-1/4', 'w-full lg:w-1/4', 'w-full lg:w-1/4', 'w-full lg:w-1/4'],
  },
};

const BaseColumnContainer = (props: ComponentProps): React.JSX.Element => {
  const containerStyles = props?.rendering?.params?.Styles || '';
  const uniqueId = props?.rendering?.params?.RenderingIdentifier || props.rendering.uid || '';
  const noPadding = props.rendering.params['NoPadding'] === '1';

  const { linkComponent } = useAnalytics(props.rendering);

  if (!props.rendering) {
    return <></>;
  }

  const variant = props.rendering.variant as Variant;
  const config = VARIANT_CONFIGS[variant];

  // Generate column alignment parameters dynamically
  const getColumnParam = (index: number, paramType: 'horizontal' | 'vertical') => {
    const columnLetter = String.fromCharCode(65 + index); // A, B, C, D
    if (paramType === 'horizontal') {
      return props?.rendering?.params?.[`ColumnContainer${columnLetter}`] ?? '';
    }
    return props?.rendering?.params?.[`VerticalAlignColumnContainer${columnLetter}`] ?? 'Top-align';
  };

  // Render columns dynamically based on configuration
  const renderColumns = () => {
    return Array.from({ length: config.columns }, (_, index) => {
      const columnLetter = String.fromCharCode(97 + index); // a, b, c, d
      const horizontalAlignment = getColumnParam(index, 'horizontal');
      const verticalAlignment = getColumnParam(index, 'vertical');
      const placeholderName = `column-container-${columnLetter}`;

      return (
        <div
          key={index}
          className={classNames(
            `column-container-${columnLetter}`,
            'relative flex flex-col gap-7',
            config.widthClasses[index],
            horizontalAlignment,
            verticalAlignment,
            {
              '[&_>_div]:p-0': variant === Variant.TwentyEighty && index === 1,
            }
          )}
        >
          <Placeholder name={placeholderName} rendering={props.rendering} />
        </div>
      );
    });
  };

  return (
    <div
      id={uniqueId}
      link_component={linkComponent}
      className={classNames(
        'column-container',
        'h-fit w-full flex-col gap-10 xl:px-24',
        { 'p-5': !noPadding },
        { 'items-center': variant !== Variant.TwentyEighty },
        { 'lg:flex-row': variant !== Variant.FullWidth },
        variant ? variant : '',
        containerStyles,
        DESKTOP_MAX_WIDTH
      )}
    >
      {renderColumns()}
    </div>
  );
};

// Export functions for each variant
export const Default = (props: ComponentProps) => {
  props.rendering.variant = Variant.Default;
  return <BaseColumnContainer {...props} />;
};

export const SixtyForty = (props: ComponentProps) => {
  props.rendering.variant = Variant.SixtyForty;
  return <BaseColumnContainer {...props} />;
};

export const FortySixty = (props: ComponentProps) => {
  props.rendering.variant = Variant.FortySixty;
  return <BaseColumnContainer {...props} />;
};

export const FullWidth = (props: ComponentProps) => {
  props.rendering.variant = Variant.FullWidth;
  return <BaseColumnContainer {...props} />;
};

export const TwentyEighty = (props: ComponentProps) => {
  props.rendering.variant = Variant.TwentyEighty;
  return <BaseColumnContainer {...props} />;
};

// 3 Column Variants
export const EqualThirds = (props: ComponentProps) => {
  props.rendering.variant = Variant.EqualThirds;
  return <BaseColumnContainer {...props} />;
};

export const FiftyTwentyfiveTwentyfive = (props: ComponentProps) => {
  props.rendering.variant = Variant.FiftyTwentyfiveTwentyfive;
  return <BaseColumnContainer {...props} />;
};

export const TwentyfiveTwentyfiveFifty = (props: ComponentProps) => {
  props.rendering.variant = Variant.TwentyfiveTwentyfiveFifty;
  return <BaseColumnContainer {...props} />;
};

// 4 Column Variants
export const EqualQuarters = (props: ComponentProps) => {
  props.rendering.variant = Variant.EqualQuarters;
  return <BaseColumnContainer {...props} />;
};
