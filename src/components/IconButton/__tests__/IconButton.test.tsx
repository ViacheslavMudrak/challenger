import { render, screen } from '@testing-library/react';
import IconButton from '../IconButton';
import '@testing-library/jest-dom';

describe('IconButton', () => {
  test('should render correctly', () => {
    render(<IconButton type="ArrowLeftIcon">Test</IconButton>);

    const button = screen.getByRole('button');
    const imgArrowLeftIcon = screen.getAllByTitle('Arrow Left Icon');

    expect(button).toBeInTheDocument();
    expect(imgArrowLeftIcon[0]).toBeInTheDocument();
  });
});
