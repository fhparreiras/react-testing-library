import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente POKEDEX', () => {
  test('A página deve possuir um h2 com o texto "Encountered pokémons" ', () => {
    renderWithRouter(<App />);

    const head = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(head).toBeDefined();
  });
});
