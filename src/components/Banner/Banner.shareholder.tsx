/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const BannerShareholder = () => {
  const [sharePrice, setSharePrice] = useState<any>();

  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`${process.env.PUBLIC_URL}/api/sharePrice`);
      const message = await res.text();

      try {
        setSharePrice(JSON.parse(message || ''));
      } catch (error) {
        setSharePrice('');
      }
    };

    getData();
  }, []);

  const renderRate = (amount: string, text: string) => {
    return (
      <div
        className={classNames(
          'flex flex-col items-center justify-center gap-5 rounded-sm bg-white text-bright-navy',
          'h-[186px] w-full md:w-[250px] xl:w-[296px]',
          'p-4 md:mt-28 xl:mt-[88px]'
        )}
      >
        <div className="flex flex-col items-center gap-1 leading-none">
          <span className="font-roboto-700 text-[64px]">{amount}</span>
          <span className="mt-5 font-roboto-700 text-2xl">current price</span>
          <span className="text-base text-blue">{text}</span>
        </div>
      </div>
    );
  };

  if (sharePrice) {
    const stock = sharePrice?.ASX.stock[0];
    const currentRate = `$${parseFloat(stock.last[0]).toFixed(2)}`;
    const lastUpdatedDate = dayjs(stock.date[0].split('/').reverse().join('')).format(
      'DD MMM YYYY'
    );
    const text = `${stock.code[0]} at ${stock.time[0]}, ${lastUpdatedDate}`;

    return <>{renderRate(currentRate, text)}</>;
  }

  return <></>;
};

export default BannerShareholder;
