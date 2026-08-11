import classNames from 'classnames';
import { Image as JssImage, Link as JssLink } from '@sitecore-content-sdk/nextjs';
import { CardFields, CardProps } from './Card.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';

const CardInfo6 = (props: CardProps<CardFields>): React.JSX.Element => {
  const { CardImage = {}, Link } = props.rendering.fields;
  const { isEditMode } = useSitecore();
  const { linkComponent } = useAnalytics(props.rendering);

  const renderCard = () => {
    if (isEditMode) {
      return (
        <JssLink field={Link || {}}>
          <JssImage
            field={CardImage}
            width={100}
            height={100}
            className="h-full w-fit object-cover"
          />
        </JssLink>
      );
    }

    if (Link && Link.value.href && !isEditMode) {
      return (
        <JssLink field={Link} link_name={Link.value.text}>
          <JssImage
            field={CardImage}
            width={100}
            height={100}
            className="h-full w-fit object-cover"
          />
        </JssLink>
      );
    }

    return (
      <JssImage field={CardImage} width={100} height={100} className="h-full w-fit object-cover" />
    );
  };

  return (
    <div
      link_component={linkComponent}
      className={classNames(
        'relative flex min-h-[204px_!important] w-full flex-col items-center justify-center bg-white shadow-lg lg:w-[294px]'
      )}
    >
      <div
        className={classNames(
          'absolute flex h-[156px] w-[80%] justify-center bg-center text-center lg:w-[240px]',
          { 'h-auto w-auto flex-col-reverse lg:w-auto': isEditMode }
        )}
      >
        {renderCard()}
      </div>
    </div>
  );
};

export default CardInfo6;
