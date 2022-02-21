import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente NOTFOUND', () => {
  test('A página deve conter um h2 com o texto "Page requested not found 😭" ', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { level: 2 });
    const headingText = screen.getByText(/Page requested not found/i);
    const headingEmoji = screen.getByText('😭');

    expect(heading).toBeDefined();
    expect(headingText).toBeDefined();
    expect(headingEmoji).toBeDefined();
  });

  test('A página deve possuir a imagem com uma source específica', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    const imgSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imgNotFound).toHaveAttribute('src', imgSource);
  });
});
