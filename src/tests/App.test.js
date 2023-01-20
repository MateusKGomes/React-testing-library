import { React } from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/RenderWithRounter';

describe(' Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /Home/i });
    const about = screen.getByRole('link', { name: /About/i });
    const favoritePokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favoritePokemon).toBeInTheDocument();
  });

  test(`Teste se a aplicação é redirecionada para a 
  página correta, na URL / ao clicar no link da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const { pathname } = history.location;
    const home = screen.getByRole('link', { name: /Home/i });
    userEvent.click(home);
    expect(pathname).toBe('/');
  });
  test(`se a aplicação é redirecionada para a 
  página de About, na URL /about, ao clicar no link About da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /About/i });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  test(`se a aplicação é redirecionada para a 
   URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação`, () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemon = screen.getByRole('link', { name: /Favorite Pokémon/i });
    userEvent.click(favoritePokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it(`se a aplicação é redirecionada para a 
  página Not Found ao entrar em uma URL desconhecida`, () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina-que-nao-existe/');
    });
    const getPageNotFound = screen.getByRole('heading', { name: /Page requested not found/i });
    expect(getPageNotFound).toBeInTheDocument();
  });
});
