import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente PokemonDetails', () => {
  test('As informações detalhadas do Pokemon selecionado devem aparecer na tela', () => {
    renderWithRouter(<App />);
    const detailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsBtn);
    const pokeDetails = screen.getByText(/pikachu details/i);
    expect(pokeDetails).toBeDefined();
    expect(detailsBtn).not.toBeInTheDocument();
    const summaryHeading = screen.getByRole('heading', { name: /summary/i, level: 2 });
    expect(summaryHeading).toBeInTheDocument();
    const detailsTextArray = ['This intelligent Pokémon roasts',
      'hard berries with electricity to make them tender enough to eat.'];
    const detailsText = `${detailsTextArray[0]} ${detailsTextArray[1]}`;
    const detailsSection = screen.getByText(detailsText);
    expect(detailsSection).toBeInTheDocument();
  });

  test('Deve existir uma seção com os mapas de localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const locationsHeading = screen.getByRole('heading',
      { name: /game locations of pikachu/i, level: 2 });
    const mapImages = screen.getAllByRole('img', { name: /pikachu location/i });
    const imageSrcOne = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
    const imageSrcTwo = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
    const locationNameOne = screen.getByText(/kanto viridian forest/i);
    const locationNameTwo = screen.getByText(/kanto power plant/i);
    expect(mapImages).toBeDefined();
    expect(locationsHeading).toBeDefined();
    expect(locationNameOne).toBeVisible();
    expect(locationNameTwo).toBeVisible();
    expect(mapImages[0]).toHaveAttribute('src', imageSrcOne);
    expect(mapImages[1]).toHaveAttribute('src', imageSrcTwo);
  });

  test('O usuário deve poder favoritar o pokémon na página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favoriteCheck = screen.getByRole('checkbox');
    expect(favoriteCheck).toBeDefined();
    const checkLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(checkLabel).toBeDefined();

    userEvent.click(favoriteCheck);
    const favIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favIcon).toBeInTheDocument();

    userEvent.click(favoriteCheck);
    expect(favIcon).not.toBeInTheDocument();
  });
});
