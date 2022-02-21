import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente POKEDEX', () => {
  test('A página deve possuir um h2 com o texto "Encountered pokémons" ', () => {
    renderWithRouter(<App />);

    const head = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(head).toBeDefined();
  });

  test('Deve exibir o Pokémon da lista ao clicar no botão "Próximo pokémon" ', () => {
    renderWithRouter(<App />);
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });

    userEvent.click(btnNext);
    const charmanderText = screen.getByText(/charmander/i);
    expect(charmanderText).toBeDefined();

    const clicks = 7;
    for (let i = 1; i <= clicks; i += 1) {
      userEvent.click(btnNext);
    }
    const dragonairText = screen.getByText(/dragonair/i);
    expect(dragonairText).toBeDefined();

    userEvent.click(btnNext);
    const pikachuText = screen.getByText(/pikachu/i);
    expect(pikachuText).toBeDefined();
  });

  test('É mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const detailsBtn = screen.getAllByRole('link', { name: /more details/i });
    expect(detailsBtn).toHaveLength(1);
  });

  test('A página deve conter os botões de filtro', () => {
    renderWithRouter(<App />);
    const btnArray = ['Electric', 'Fire', 'Bug',
      'Poison', 'Psychic', 'Normal', 'Dragon'];

    btnArray.forEach((btn, index) => {
      const filterBtn = screen.getByRole('button', { name: btn });
      expect(filterBtn).toBeDefined();
      const dataIdTest = screen.getAllByTestId('pokemon-type-button')[index];
      expect(dataIdTest).toBeInTheDocument();
    });

    const btnPoison = screen.getByRole('button', { name: /poison/i });
    userEvent.click(btnPoison);
    const ekansText = screen.getByText(/ekans/i);
    expect(ekansText).toBeDefined();

    const btnPsychic = screen.getByRole('button', { name: /psychic/i });
    userEvent.click(btnPsychic);
    const psychicText = screen.getAllByText(/psychic/i);
    expect(psychicText[0]).toBeDefined();
    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(btnNext);
    expect(psychicText[0]).toBeDefined();
  });

  test('A Pokédex deve conter um botão que reseta o filtro', () => {
    renderWithRouter(<App />);
    // expect(filterPokemons).toHaveBeenCalledWith('all');
    const resetBtn = screen.getByRole('button', { name: /all/i });
    expect(resetBtn).toBeVisible();

    const btnNext = screen.getByRole('button', { name: /próximo pokémon/i });
    const pikachuText = screen.getByText(/pikachu/i);
    expect(pikachuText).toBeDefined();
    userEvent.click(btnNext);
    const charmanderText = screen.getByText(/charmander/i);
    expect(charmanderText).toBeDefined();
    userEvent.click(resetBtn);
    expect(resetBtn).toBeInTheDocument();
  });
});
