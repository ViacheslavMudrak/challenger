import { RichText } from '@sitecore-content-sdk/nextjs';
import { CardTab } from './Card.types';
import { useState } from 'react';
import classNames from 'classnames';

interface CardInfo14DetailsProps {
  overview: string;
  strategy?: string;
  result?: string;
}

const CardInfo14Details = (props: CardInfo14DetailsProps) => {
  const { overview, strategy = '', result = '' } = props;
  const [selectedTab, setSelectedTab] = useState<CardTab>(CardTab.Overview);

  const handleTabClick = (tab: CardTab) => {
    setSelectedTab(tab);
  };

  const renderTabItem = (name: string, tab: CardTab) => {
    return (
      <li
        onClick={() => handleTabClick(tab)}
        className={classNames(
          'w-1/3 border-b-[6px] py-6 text-center',
          selectedTab === tab ? 'border-b-challenger-green font-roboto-700' : 'border-b-transparent'
        )}
      >
        {name}
      </li>
    );
  };

  const renderTabPanel = (content: string, tab: CardTab) => {
    if (selectedTab === tab) {
      return (
        <div className="w-full rounded-b-sm bg-grey-light p-6 lg:h-[700px] lg:overflow-y-auto [&_p]:mb-4">
          <RichText field={{ value: content }} />
        </div>
      );
    }

    return null;
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="w-full rounded-t-sm bg-white">
        <ul
          className={classNames(
            'relative flex w-full cursor-pointer items-center gap-3',
            'border-b-2 border-b-grey-dark text-bright-navy'
          )}
        >
          {renderTabItem('Overview', CardTab.Overview)}
          {renderTabItem('Strategy', CardTab.Strategy)}
          {renderTabItem('Result', CardTab.Result)}
        </ul>
      </div>
      {renderTabPanel(overview, CardTab.Overview)}
      {renderTabPanel(strategy, CardTab.Strategy)}
      {renderTabPanel(result, CardTab.Result)}
    </div>
  );
};

export default CardInfo14Details;
