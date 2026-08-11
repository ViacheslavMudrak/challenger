import { render } from '@testing-library/react';
import mock from '../mocks/galleryCard.json';
import GalleryCard from '../GalleryContainer';

jest.mock('@sitecore-content-sdk/nextjs', () => ({
  ComponentParams: jest.fn(),
  ComponentRendering: jest.fn(),
}));
describe('GalleryCard', () => {
  it('renders correctly', () => {
    render(<GalleryCard {...mock} />);
  });
});
