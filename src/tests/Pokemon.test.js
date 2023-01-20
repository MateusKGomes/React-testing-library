import { React } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/RenderWithRounter';

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/Electric/i);
    const averageWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(averageWeight).toBeInTheDocument();
    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    expect(img.src).toBe('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });
  test('contém um link de navegação para exibir detalhes deste Pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const getLink = screen.getByRole('link', { name: /more details/i });
    expect(getLink).toBeInTheDocument();
    userEvent.click(getLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');
    const checkBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkBox);
    const favoriteImg = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoriteImg.src).toBe('http://localhost/star-icon.svg');
  });
});
