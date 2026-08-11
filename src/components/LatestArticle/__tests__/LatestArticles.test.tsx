/* eslint-disable @typescript-eslint/no-explicit-any */
import { render } from '@testing-library/react';
import LatestArticle from '../LatestArticles';
import mock from '../mocks/mock.json';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  ComponentParams: jest.fn(),
  ComponentRendering: jest.fn(),
}));
describe('Forms', () => {
  it('renders correctly', () => {
    render(<LatestArticle {...(mock as any)} />);
  });
});
