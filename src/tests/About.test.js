import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente ABOUT', () => {
  test('a página deve conter as informações sobre a Pokédex', () => {
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
});
