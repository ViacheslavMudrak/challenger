import { SyntheticEvent } from 'react';

interface RatesTableDropDownProps {
  onClick: (val: string) => void;
}

export const RatesTableDropDown = (props: RatesTableDropDownProps) => {
  const handleClick = (e: SyntheticEvent<HTMLSelectElement>) => {
    props.onClick(e.currentTarget.value);
  };

  return (
    <div className="flex w-full flex-col items-start gap-1 md:max-w-60">
      <label
        htmlFor="genderList"
        className="mb-2 block w-full text-left text-base font-medium text-bright-navy"
      >
        Show rates for
      </label>
      <select
        id="genderList"
        className="drop-down w-full md:min-w-60 md:max-w-60"
        onChange={handleClick}
      >
        <option selected value="F">
          Female
        </option>
        <option value="M">Male</option>
      </select>
    </div>
  );
};
