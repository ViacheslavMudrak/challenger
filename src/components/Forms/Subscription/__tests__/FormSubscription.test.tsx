import { render } from '@testing-library/react';
import FormSubscription from '../Form.subscription';
import formSubscriptionData from '../mocks/form.subscription.json';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  ComponentParams: jest.fn(),
  ComponentRendering: jest.fn(),
  Field: jest.fn(),
  Placeholder: jest.fn(),
}));
describe('Forms', () => {
  it('renders correctly', () => {
    render(<FormSubscription {...formSubscriptionData} />);
  });
});
