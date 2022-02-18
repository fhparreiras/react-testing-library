import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente ABOUT', () => {
  test('A página deve conter as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const arrayTextA = ['This application simulates a Pokédex',
      ' a digital encyclopedia containing all Pokémons'];
    const textA = [...arrayTextA];

    const arrayTextB = ['One can filter Pokémons by type',
      ' and see more details for each one of them'];
    const textB = [...arrayTextB];

    const paragraphOne = screen.getByText(textA);
    const paragraphTwo = screen.getByText(textB);

    expect(paragraphOne).toBeVisible();
    expect(paragraphTwo).toBeVisible();
  });

  test('A página deve conter um heading h2 com o texto "About Pokédex" ', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(heading).toBeDefined();
  });

  test('A página deve conter dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    // escrever o teste
  });

  test('A página deve conter uma imagem específica da Pokédex', () => {
    renderWithRouter(<About />);
    const imgSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagePokedex = screen.getByRole('img');

    expect(imagePokedex).toHaveAttribute('src', imgSource);
  });
});
