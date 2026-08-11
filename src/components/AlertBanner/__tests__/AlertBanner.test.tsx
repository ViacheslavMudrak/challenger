import { render } from '@testing-library/react';
import AlertBanner from '../AlertBanner';
import alertBannerMockData from '../mocks/alertbanner.json';
import '@testing-library/jest-dom';

describe('AlertBanner', () => {
  test('should render correctly', () => {
    render(<AlertBanner {...alertBannerMockData}></AlertBanner>);

    // const button = screen.getByRole('button');
    // expect(button).toBeInTheDocument();
  });
});
