import IconButton from 'components/IconButton/IconButton';
import { IconColor, IconSize } from 'components/Icons/icon.types';
import classNames from 'classnames';
import { MutableRefObject, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { Text } from '@sitecore-content-sdk/nextjs';

interface CardInfo4ModalProps {
  bio: string;
  role: string;
  fullName: string;
  onClose: () => void;
}

const CardInfo4Modal = (props: CardInfo4ModalProps) => {
  const { onClose, bio, role, fullName } = props;
  const ref = useRef(null) as unknown as MutableRefObject<HTMLDivElement>;

  useOnClickOutside(ref, () => {
    onClose();
  });

  const handleClick = () => {
    onClose();
  };

  return (
    <div
      link_component="modal"
      className={classNames(
        'fixed left-0 top-0 z-[90] flex h-screen w-full flex-col px-6 py-4 lg:pb-5 lg:pt-8',
        'items-center justify-between overflow-y-auto text-left',
        'bg-black-25'
      )}
    >
      <div
        ref={ref}
        className="relative m-auto flex h-full w-full flex-col items-center rounded-md bg-white px-14 py-12 xl:h-auto xl:min-h-[408px] xl:w-[612px]"
      >
        <div className="flex w-full pr-8 xl:pt-0">
          <h3 className="font-roboto-700 text-[40px] leading-10 text-deep-blue">
            <Text field={{ value: fullName }}></Text>
          </h3>
        </div>
        <div className="absolute right-14 top-6 md:top-10">
          <IconButton
            type="CloseIcon"
            iconColor={IconColor.Navy}
            iconSize={IconSize.Lg}
            onClick={handleClick}
          />
        </div>
        <div className="mt-6 flex w-full flex-col items-start gap-12 overflow-y-auto lg:pr-5">
          <p className="text-2xl text-blue">
            <Text field={{ value: role }} />
          </p>
          <Text field={{ value: bio }} />
        </div>
      </div>
    </div>
  );
};

export default CardInfo4Modal;
