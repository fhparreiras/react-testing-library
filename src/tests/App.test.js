import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('O topo da aplicação deve conter os links: Home, About e Favorite Pokémons', () => {
  renderWithRouter(<App />);
  const navBar = screen.getAllByRole('link');
  const navHome = navBar[0];
  const navAbout = navBar[1];
  const navFavorite = navBar[2];

  expect(navHome).toHaveTextContent('Home');
  expect(navAbout).toHaveTextContent('About');
  expect(navFavorite).toHaveTextContent('Favorite Pokémons');
});

test('Ao clicar no link Home,deve ser renderizada a página inicial com a URL "/"', () => {
  renderWithRouter(<App />);
  const { history } = renderWithRouter(<App />);
  const { location: { pathname } } = history;
  const btnNav = screen.getAllByRole('link');
  const btnHome = btnNav[0];

  userEvent.click(btnHome);
  expect(pathname).toBe('/');
});

test('Ao clicar no link About,deve ser renderizada a página com a URL "/about"', () => {
  const { history } = renderWithRouter(<App />);
  const btnNav = screen.getAllByRole('link');
  const btnAbout = btnNav[1];

  userEvent.click(btnAbout);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/about');
});

test('Ao clicar no link Favorite Pokémons,aparece a URL "/favorites"', () => {
  const { history } = renderWithRouter(<App />);
  const btnNav = screen.getAllByRole('link');
  const btnFavorites = btnNav[2];

  userEvent.click(btnFavorites);
  const { location: { pathname } } = history;
  expect(pathname).toBe('/favorites');
});

test('Ao entrar em uma URL desconhecida, é redirecionado para a página Not Found', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pagina-xablau');

  const notFound = screen.getByRole(
    'heading',
    { name: /Page requested not found/i, level: 2 },
  );
  expect(notFound).toBeInTheDocument();
});
