import { React } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/RenderWithRounter';
import FavoritePokemon from '../pages/FavoritePokemon';
import App from '../App';

describe('Teste o componente <FavoritePokemon.js />', () => {
  test(`Teste se é exibida na tela a mensagem 
    No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos`, () => {
    renderWithRouter(<FavoritePokemon />);
    const text = screen.getByText(/no favorite pokémon found/i);
    expect(text).toBeInTheDocument();
  });
  test('Teste se apenas são exibidos os Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const checkFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkFavorite);
    const favoritePokemon = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemon);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
