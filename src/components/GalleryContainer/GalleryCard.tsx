import classNames from 'classnames';
import { RichText, Text } from '@sitecore-content-sdk/nextjs';
import CardBaseImage from '../Card/Card.base.image';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { useAnalytics, useSitecore } from 'lib/challenger/hooks';
import { useState } from 'react';
import GalleryCardModal from './GalleryCard.modal';
import { GalleryCardFields, GalleryCardProps, HeadingType } from './GalleryContainer.types';
import { getGalleryCardBgColor } from './Gallery.helpers';

const GalleryCard = (props: GalleryCardProps<GalleryCardFields>): React.JSX.Element => {
  const {
    Content,
    Heading,
    HeadingLevel,
    WithShadow,
    Alignment,
    CardImage = {},
    UseModal,
    LinkText,
    UseProfileShard,
    BackgroundColor,
  } = props.rendering.fields;

  const CustomHeading = (HeadingLevel?.fields?.Level?.value as HeadingType) || 'h3';
  const alignment = (Alignment?.fields?.Alignment?.value || '').toLowerCase() || 'left';
  const showCardShadow = !!WithShadow?.value;
  const showProfileShard = !!UseProfileShard?.value;

  const { isEditMode } = useSitecore();
  const useModal = !!UseModal?.value;
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  const { linkComponent } = useAnalytics(props.rendering);

  const renderShards = () => {
    return (
      <>
        <div
          className={classNames(
            'absolute z-30 h-full w-full',
            'clip-path-polygon-[0_91%,0%_100%,70%_100%]',
            'from-deep-green to-challenger-green bg-gradient-270'
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-30 h-full w-full',
            'clip-path-polygon-[100%_93%,100%_100%,70%_100%]',
            'from-bright-navy via-blue to-blue bg-gradient-240'
          )}
        ></div>
      </>
    );
  };

  const handleToggleModal = () => {
    document.body.className = 'disable-scroll';
    setToggleModal(true);
  };

  const handleModalClose = () => {
    document.body.className = '';
    setToggleModal(false);
  };

  return (
    <>
      <div
        link_component={linkComponent}
        className={classNames(
          'flex min-h-[180px] min-w-[250px] flex-col gap-4 p-4',
          'items-start',
          'rounded-sm border-white',
          { 'items-start': alignment === 'left' },
          { 'items-center': alignment === 'center' },
          { 'shadow-lg': showCardShadow },
          getGalleryCardBgColor(BackgroundColor?.fields.Color?.value),
          props?.rendering?.params?.Styles
        )}
      >
        <div
          className={classNames('relative flex aspect-[4/3] h-full w-full', {
            'cursor-pointer': !isEditMode && useModal,
          })}
          onClick={useModal && !isEditMode ? handleToggleModal : undefined}
        >
          {showProfileShard && renderShards()}
          <CardBaseImage image={CardImage} className={'absolute z-10 h-full w-full'} />
        </div>
        {(isEditMode || Heading?.value || Content?.value || (LinkText?.value && useModal)) && (
          <div className={'relative flex w-full flex-col justify-between px-4'}>
            <div
              className={classNames(
                'relative flex flex-col justify-start gap-2',
                { 'items-start': alignment === 'left' },
                { 'items-center': alignment === 'center' }
              )}
            >
              {(Heading?.value || isEditMode) && (
                <CustomHeading
                  className={classNames(
                    'min-h-[32px] font-roboto-700 text-2xl text-blue',
                    { 'text-left': alignment === 'left' },
                    { 'text-center': alignment === 'center' },
                    { 'line-clamp-1': !isEditMode }
                  )}
                >
                  <Text field={Heading} />
                </CustomHeading>
              )}
              {(Content?.value || isEditMode) && (
                <RichText
                  className={classNames(
                    'custom-content text-black',
                    'text-base',
                    { 'text-left': alignment === 'left' },
                    { 'text-center': alignment === 'center' },
                    { 'line-clamp-1 [&_*]:!pb-0': !isEditMode }
                  )}
                  field={Content}
                />
              )}
            </div>
            {isEditMode && (
              <div className={classNames('mt-5 flex')}>
                <Text field={LinkText} className="py-4 text-lg" />
              </div>
            )}
            {!isEditMode && useModal && LinkText && LinkText?.value !== '' && (
              <div
                className={classNames(
                  '[&_a]:text-md mt-2 flex [&_a]:py-2',
                  { 'justify-start': alignment === 'left' },
                  { 'justify-center': alignment === 'center' }
                )}
              >
                <ButtonLink
                  LinkValue={{
                    value: { target: '_self', href: '#modal', text: LinkText?.value?.toString() },
                  }}
                  Color={{ fields: { Type: { value: 'primary' } } }}
                  HasArrow={{ value: true }}
                  className="text-md py-4"
                  onClick={useModal ? handleToggleModal : undefined}
                  variant={Variant.Link}
                />
              </div>
            )}
          </div>
        )}
      </div>
      {toggleModal && (
        <GalleryCardModal
          Heading={Heading}
          Content={Content}
          onClose={handleModalClose}
          Image={CardImage}
        />
      )}
    </>
  );
};

export default GalleryCard;
