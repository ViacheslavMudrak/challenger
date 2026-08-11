import { render } from '@testing-library/react';
import mock from '../mocks/gallery.container.json';
import GalleryContainer from '../GalleryContainer';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  ComponentParams: jest.fn(),
  ComponentRendering: jest.fn(),
}));
describe('GalleryContainer', () => {
  it('renders correctly', () => {
    render(<GalleryContainer {...mock} />);
  });
});
