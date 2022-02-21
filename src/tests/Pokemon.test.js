import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente POKEMON', () => {
  test('O card do pokémon deve ser renderizado corretamente ', () => {
    renderWithRouter(<App />);
    const pikachuText = screen.getByText(/pikachu/i);
    const pikachuType = screen.getAllByText(/electric/i);
    const value = '6.0';
    const measurementUnit = 'kg';
    const pikachuInfo = `Average weight: ${value} ${measurementUnit}`;
    const imgSource = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    const imagePikachu = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(pikachuText).toBeDefined();
    expect(pikachuType[0]).toBeDefined();
    expect(pikachuInfo).toBeDefined();
    expect(imagePikachu).toHaveAttribute('src', imgSource);
    expect(imagePikachu).toHaveAttribute('alt', 'Pikachu sprite');
  });
});
