import {
  CONTENT_VAR_FIXED_TERM_RATE,
  CONTENT_VAR_ONE_YEAR_FIXED_TERM_RATE,
  CONTENT_VAR_TWO_YEAR_FIXED_TERM_RATE,
  CONTENT_VAR_THREE_YEAR_FIXED_TERM_RATE,
  CONTENT_VAR_FOUR_YEAR_FIXED_TERM_RATE,
  CONTENT_VAR_FIVE_YEAR_FIXED_TERM_RATE,
} from 'components/constants';

const DEFAULT_FIXED_TERM_VALUE = '3';

type RatesObject = {
  oneYearFixedTermRate: string | undefined;
  twoYearFixedTermRate: string | undefined;
  threeYearFixedTermRate: string | undefined;
  fourYearFixedTermRate: string | undefined;
  fiveYearFixedTermRate: string | undefined;
};

export const getFixedTermValue = (content = '', isEditMode = false) => {
  if (isEditMode) return [];

  const terms = new Array<string>();
  const snippets = [
    CONTENT_VAR_ONE_YEAR_FIXED_TERM_RATE,
    CONTENT_VAR_TWO_YEAR_FIXED_TERM_RATE,
    CONTENT_VAR_THREE_YEAR_FIXED_TERM_RATE,
    CONTENT_VAR_FOUR_YEAR_FIXED_TERM_RATE,
    CONTENT_VAR_FIVE_YEAR_FIXED_TERM_RATE,
  ];
  snippets.map((snippet, i) => content.includes(snippet) && terms.push((i + 1).toString()));
  if (!terms.includes(DEFAULT_FIXED_TERM_VALUE) && content.includes(CONTENT_VAR_FIXED_TERM_RATE))
    terms.push(DEFAULT_FIXED_TERM_VALUE);
  return terms;
};

export const getUpdatedContentReplacedWithRate = (content = '', rates: RatesObject) => {
  if (!content) return '';
  const regex = new RegExp(
    `(${CONTENT_VAR_FIXED_TERM_RATE}|${CONTENT_VAR_THREE_YEAR_FIXED_TERM_RATE})`,
    'gi'
  );
  if (rates?.oneYearFixedTermRate)
    content = content.replaceAll(
      CONTENT_VAR_ONE_YEAR_FIXED_TERM_RATE,
      rates?.oneYearFixedTermRate || ''
    );
  if (rates?.twoYearFixedTermRate)
    content = content.replaceAll(
      CONTENT_VAR_TWO_YEAR_FIXED_TERM_RATE,
      rates?.twoYearFixedTermRate || ''
    );
  if (rates?.fourYearFixedTermRate)
    content = content.replaceAll(
      CONTENT_VAR_FOUR_YEAR_FIXED_TERM_RATE,
      rates?.fourYearFixedTermRate || ''
    );
  if (rates?.fiveYearFixedTermRate)
    content = content.replaceAll(
      CONTENT_VAR_FIVE_YEAR_FIXED_TERM_RATE,
      rates?.fiveYearFixedTermRate || ''
    );
  if (rates?.threeYearFixedTermRate)
    content = content.replaceAll(regex, rates?.threeYearFixedTermRate || '');
  return content;
};
