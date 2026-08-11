import dayjs from 'dayjs';
import dayjsPluginUTC from 'dayjs/plugin/utc';
dayjs.extend(dayjsPluginUTC);

/**
 * Gets formatted date
 * @param date current date should be in ISO8601 e.g.'2020-04-02T08:02:17-05:00'
 * @param formatter default 'MMMM DD, YYYY' e.g september 01, 2024
 * @returns string
 */
export const getFormattedDate = (date?: string, formatter = 'MMM DD, YYYY'): string => {
  const formattedDate = dayjs(date);

  if (!date || date.length === 0 || !formattedDate.isValid() || formattedDate.year() <= 1) {
    return '';
  }

  return dayjs(date).format(formatter);
};

export const getFormattedDateInUTC = (date?: string, formatter = 'MMM DD, YYYY'): string => {
  const formattedDate = dayjs(date);

  if (!date || date.length === 0 || !formattedDate.isValid() || formattedDate.year() <= 1) {
    return '';
  }

  return dayjs.utc(date).format(formatter);
};

export const isValidDate = (date: string): boolean => {
  const formattedDate = dayjs(date);

  if (!date || date.length === 0 || !formattedDate.isValid() || formattedDate.year() <= 1) {
    return false;
  }

  return true;
};

export const getFormattedAmount = (amount: number, precision = 2): string => {
  return amount == null
    ? '0'
    : amount.toLocaleString('en-AU', {
        style: 'currency',
        currency: 'AUD',
        maximumFractionDigits: precision,
      });
};
