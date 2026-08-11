import classNames from 'classnames';
import CardBaseImage from './Card.base.image';
import ButtonLink from 'components/Button/Button.link';
import { Variant } from 'components/Button/Button.types';
import { ImageField, Link, LinkField, Text } from '@sitecore-content-sdk/nextjs';
import { IconBgColor } from 'components/IconButton/IconButton.types';
import IconButton from 'components/IconButton/IconButton';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import { useSitecore } from 'lib/challenger/useSitecore';

interface CardInfo14ProductProps {
  productHeading?: string;
  productContent?: string;
  productImage?: ImageField;
  productLink?: LinkField;
  onClose?: () => void;
}

const CardInfo14Product = (props: CardInfo14ProductProps) => {
  const { productImage = {}, productHeading, productContent, productLink, onClose } = props;
  const { isEditMode } = useSitecore();

  const onLinkClick = () => {
    if (!isEditMode && onClose !== undefined) onClose();
  };

  return (
    <>
      <div className="relative -mt-[3px] hidden h-[405px] w-full bg-white lg:flex lg:rounded-b-sm">
        <div
          className={classNames(
            'absolute z-40 h-full w-full bg-blue',
            'clip-path-polygon-[0_0,101%_0,100%_3%,43%_19%]'
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-40 h-full w-full bg-bright-navy',
            'clip-path-polygon-[0_0,0_7%,43%_19%]'
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-40 h-full w-full bg-challenger-green',
            'clip-path-polygon-[0_6%,0_15%,43%_19%]'
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-40 h-full w-full bg-challenger-green',
            'clip-path-polygon-[101%_14%,101%_2%,43%_19%]'
          )}
        ></div>
        <div
          className={classNames(
            'absolute z-40 h-full w-full bg-deep-teal',
            'clip-path-polygon-[27%_101%,35%_101%,43%_19%]'
          )}
        ></div>
        <div className="absolute h-full w-1/2">
          <CardBaseImage
            image={productImage}
            className={classNames(
              'absolute z-40 h-full w-full',
              'clip-path-polygon-[0_15%,86%_19%,55%_101%,0%_101%]'
            )}
          />
        </div>

        <div
          className={classNames(
            'absolute right-0 top-28 z-20 flex w-[340px] flex-col gap-4 px-6 pt-10 font-roboto-400 lg:w-[550px] xl:w-[340px]',
            'lg:[&_h1]:line-clamp-2 lg:[&_h2]:line-clamp-2 lg:[&_h3]:line-clamp-2',
            'lg:[&_p]:line-clamp-4'
          )}
        >
          <h3 className="font-roboto-700 text-bright-navy">
            <Text field={{ value: productHeading }} />
          </h3>
          <p>
            <Text field={{ value: productContent }} />
          </p>
          {productLink && (
            <ButtonLink
              LinkValue={productLink}
              Color={{ fields: { Type: { value: 'primary' } } }}
              HasArrow={{ value: true }}
              variant={Variant.Link}
              onClick={onLinkClick}
            />
          )}
        </div>
      </div>
      <div className="relative flex w-full rounded-b-sm bg-white p-5 lg:hidden [&_button]:w-fit">
        {productLink && (
          <Link
            field={productLink}
            className="flex w-full items-center justify-between gap-2"
            onClick={onLinkClick}
          >
            <h3 className="font-roboto-700 text-[28px] text-bright-navy">
              <Text field={{ value: productHeading }} />
            </h3>
            {productLink && (
              <IconButton
                type="ArrowRightIcon"
                bgColor={IconBgColor.Primary}
                iconColor={IconColor.Navy}
                iconSize={IconSize.Md}
              />
            )}
          </Link>
        )}
      </div>
    </>
  );
};

export default CardInfo14Product;
