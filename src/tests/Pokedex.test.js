import React from 'react';
import { getByRole, screen } from '@testing-library/react';
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
});
