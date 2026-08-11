import IconButton from 'components/IconButton/IconButton';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import CardBaseImage from './Card.base.image';
import classNames from 'classnames';
import { ImageField, LinkField, RichText, Text } from '@sitecore-content-sdk/nextjs';
import CardInfo14Details from './Card.info14.details';
import { CardTab } from './Card.types';
import CardInfo14Tags from './Card.info14.tags';
import { MutableRefObject, useRef, useState } from 'react';
import { useMediaQuery, useOnClickOutside } from 'usehooks-ts';
import { MOBILE_MEDIA_QUERY } from 'components/constants';
import CardInfo14Product from './Card.info14.product';

interface CardInfo14ProfileProps {
  title?: string;
  profileImage: ImageField;
  heading: string;
  content: string;
  overview?: string;
  strategy?: string;
  result?: string;
  goal?: string;
  productHeading?: string;
  productContent?: string;
  productImage?: ImageField;
  productLink?: LinkField;
  tag1?: string;
  tag2?: string;
  tag3?: string;
  onClose: () => void;
}

const CardInfo14Profile = (props: CardInfo14ProfileProps) => {
  const {
    onClose,
    profileImage,
    productImage = {},
    heading,
    content,
    overview = '',
    productHeading,
    productContent,
    productLink,
    goal,
    title,
    tag1,
    tag2,
    tag3,
    strategy = '',
    result = '',
  } = props;
  const [selectedTab, setSelectedTab] = useState<CardTab>(CardTab.Profile);
  const ref = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;
  const isMobile = useMediaQuery(MOBILE_MEDIA_QUERY);

  useOnClickOutside(ref, () => {
    onClose();
  });

  const handleClick = () => {
    onClose();
  };

  const handleTabClick = (tab: CardTab) => {
    setSelectedTab(tab);
  };

  const renderTabItem = (name: string, tab: CardTab) => {
    return (
      <li
        onClick={() => handleTabClick(tab)}
        className={classNames(
          'w-1/2 border-b-[6px] py-4 text-center',
          selectedTab === tab ? 'border-b-challenger-green font-roboto-700' : 'border-b-transparent'
        )}
      >
        {name}
      </li>
    );
  };

  return (
    <div
      link_component="modal"
      className={classNames(
        'fixed left-0 top-0 z-[90] flex h-screen w-full flex-col px-6 py-4 lg:pb-5 lg:pt-8',
        '!items-center justify-between overflow-y-auto text-left',
        'bg-deep-blue'
      )}
    >
      <div
        ref={ref}
        className="relative flex h-full w-full flex-col !items-center xl:h-auto xl:w-[1240px]"
      >
        <div className="flex w-full pr-8 pt-10 xl:pt-0">
          <h3 className="font-roboto-700 text-[32px] leading-10 text-white">
            <Text field={{ value: title }}></Text>
          </h3>
        </div>
        <div className="absolute right-0 top-0">
          <IconButton
            type="CloseIcon"
            iconColor={IconColor.White}
            iconSize={IconSize.Xl}
            onClick={handleClick}
          />
        </div>
        <div className="mt-10 flex w-full flex-col items-center gap-7 xl:flex-row">
          {(selectedTab === CardTab.Profile || !isMobile) && (
            <div className="flex w-full flex-col xl:w-1/2 xl:rounded-sm">
              <div className="flex w-full flex-col gap-6 rounded-b-none rounded-t-sm bg-blue p-6 lg:rounded-t-sm lg:p-7">
                <div className="flex w-full flex-col gap-6 lg:flex-row">
                  <div className="flex gap-6">
                    <div className="relative h-[104px] w-[104px] lg:h-[225px] lg:w-[225px]">
                      <CardBaseImage image={profileImage} className="rounded-sm" />
                    </div>
                    <div className="flex w-[calc(100%-150px)] flex-col lg:w-[290px]">
                      <h3 className="mt-px font-roboto-700 text-3xl text-white">
                        <Text field={{ value: heading }}></Text>
                      </h3>
                      <div className="my-2 flex flex-wrap gap-2 text-sm">
                        <CardInfo14Tags
                          tag1={tag1}
                          tag2={tag2}
                          tag3={tag3}
                          className="border-white text-white"
                        />
                      </div>
                      <RichText
                        field={{ value: content }}
                        className={classNames(
                          'persona-content hidden text-sm text-white lg:block [&_h3]:text-white [&_p]:m-0 [&_p]:text-xs [&_span]:block [&_span]:text-xs'
                        )}
                      />
                    </div>
                  </div>

                  <div className="flex w-full flex-col lg:hidden lg:w-[290px]">
                    <RichText
                      field={{ value: content }}
                      className={classNames(
                        'persona-content text-white [&_h3]:text-white [&_p]:m-0 [&_p]:text-sm [&_span]:block [&_span]:text-sm'
                      )}
                    />
                  </div>
                </div>
                <p className="mb-14 text-2xl text-white lg:mb-6 lg:pr-3">
                  <Text field={{ value: goal }} />
                </p>
              </div>
              {
                <CardInfo14Product
                  productContent={productContent}
                  productHeading={productHeading}
                  productImage={productImage}
                  productLink={productLink}
                  onClose={onClose}
                />
              }
            </div>
          )}
          {(selectedTab === CardTab.Strategy || !isMobile) && (
            <div className="mb-5 h-full w-full rounded-sm bg-grey-light xl:mb-0 xl:flex xl:w-1/2">
              <CardInfo14Details overview={overview} strategy={strategy} result={result} />
            </div>
          )}
        </div>
        <div className="relative mt-auto w-full pt-5 lg:hidden">
          <ul className="relative flex w-full cursor-pointer items-center gap-3 border-b-2 border-b-grey-dark text-white">
            {renderTabItem('Profile', CardTab.Profile)}
            {renderTabItem('Strategy', CardTab.Strategy)}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CardInfo14Profile;
