import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente POKEMONDETAILS', () => {
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
});
