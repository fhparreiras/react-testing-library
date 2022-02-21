import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente POKEMON', () => {
  test('O card do pokémon deve ser renderizado corretamente ', () => {
    renderWithRouter(<App />);
    const pikachuText = screen.getByText(/pikachu/i);
    const pikachuType = screen.getByTestId('pokemon-type');
    const value = '6.0';
    const measurementUnit = 'kg';
    const pikachuInfo = `Average weight: ${value} ${measurementUnit}`;
    const imgSource = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const imagePikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuText).toBeDefined();
    expect(pikachuType).toBeDefined();
    expect(pikachuType).toHaveTextContent('Electric');
    expect(pikachuInfo).toBeDefined();
    expect(imagePikachu).toHaveAttribute('src', imgSource);
    expect(imagePikachu).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('O card precisa ter o link "more details" e a URL /pokemons/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    expect(detailsBtn).toBeInTheDocument();
    expect(detailsBtn).toHaveAttribute('href', '/pokemons/25');

    userEvent.click(detailsBtn);
    const heading = screen.getByRole('heading', { name: /pikachu details/i });
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
    expect(heading).toBeDefined();

    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck);
    const favImg = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    const favImgSource = '/star-icon.svg';
    expect(favImg).toHaveAttribute('src', favImgSource);
    expect(favImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
