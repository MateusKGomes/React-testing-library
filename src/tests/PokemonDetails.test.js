import { React } from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helper/RenderWithRounter';

describe(' Teste o componente <PokemonDetails.js />', () => {
  test('se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemon/4');
    });
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/4');
    const charmander = screen.getByRole('heading', { name: /charmander details/i });
    expect(charmander).toBeInTheDocument();
    const getLink = screen.queryByRole('link', { name: /more details/i });
    expect(getLink).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(summary).toBeInTheDocument();
    const description = screen.getByText(/the flame on its tail shows the strength of its life force\. if it is weak, the flame also burns weakly\./i);
    expect(description).toBeInTheDocument();
  });
  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemon/143');
    });
    const location = screen.getByRole('heading', { name: /game locations of Snorlax/i });
    expect(location).toBeInTheDocument();
    const locations = screen.getByText(/Kanto Vermillion City/i);
    expect(locations).toBeInTheDocument();
    const img = screen.getByRole('img', { name: /Snorlax location/i });
    expect(img.src).toContain('https://archives.bulbagarden.net/media/upload/5/54/Kanto_Vermilion_City_Map.png');
  });
  test('Teste se o usuário pode favoritar um Pokémon através da página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pokemon/143');
    });
    const favoriteCheck = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);
    const snorlaxImg = screen.getByRole('img', { name: /Snorlax is marked as favorite/i });
    expect(snorlaxImg).toBeInTheDocument();
    userEvent.click(favoriteCheck);
    expect(snorlaxImg).not.toBeInTheDocument();
  });
});
