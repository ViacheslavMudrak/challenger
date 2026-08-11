/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames';
import { usePricing } from 'lib/challenger/usePricing';

const BannerRate = () => {
  const { rate } = usePricing();

  return (
    <div
      className={classNames(
        'flex flex-col items-center justify-center gap-5 rounded-sm bg-white text-bright-navy',
        'h-[186px] w-full md:w-[250px] xl:w-[296px]',
        'p-4 md:mt-28 xl:mt-[88px]'
      )}
    >
      <div className="flex items-start leading-none">
        <span className="font-roboto-700 text-[64px]">{rate}</span>
        <div className="relative flex flex-col">
          <span className="pt-1 font-roboto-700 text-[40px] leading-none">%</span>
          <span className="absolute top-10 text-base">p.a.</span>
        </div>
        <span className="font-roboto-700 text-[40px]">*</span>
      </div>
      <div>
        <span className="font-roboto-700 text-2xl">3 year fixed term</span>
      </div>
    </div>
  );
};

export default BannerRate;
