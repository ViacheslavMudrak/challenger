import { render } from '@testing-library/react';
import mock from '../mocks/mock.json';
import RelatedContent from '../RelatedContent';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  ComponentParams: jest.fn(),
  ComponentRendering: jest.fn(),
}));
describe('RelatedContent', () => {
  it('renders correctly', () => {
    render(<RelatedContent {...mock} />);
  });
});
