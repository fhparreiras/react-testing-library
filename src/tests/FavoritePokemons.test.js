import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente FavoritePokemons ', () => {
  test('Exibe "No favorite pokemon found" na tela se não tiver favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeDefined();
  });

  test('Exibe os cards dos pokémons favoritados', () => {
    renderWithRouter(<App />);

    const pokeDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(pokeDetails);

    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck);

    const navFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(navFavorite);

    const imageCard = screen.getByRole('img',
      { name: /pikachu is marked as favorite/i });
    expect(imageCard).toBeDefined();
    expect(imageCard).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
