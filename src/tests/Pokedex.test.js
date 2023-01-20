import { React } from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/RenderWithRounter';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const headText = screen.getByRole('heading', { name: /encountered pokémon/i });
    expect(headText).toBeInTheDocument();
  });
  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(nextButton).toBeInTheDocument();
    userEvent.click(nextButton);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    // userEvent.click(nextButton);
    // userEvent.click(nextButton);
    // userEvent.click(nextButton);
    // userEvent.click(nextButton);
    // userEvent.click(nextButton);
    // userEvent.click(nextButton);
    // userEvent.click(nextButton);
    // userEvent.click(nextButton);
    // userEvent.click(nextButton);
    // const pikachu = screen.getByText(/pikachu/i);
    // expect(pikachu).toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const charmander = screen.queryByText(/charmander/i);
    expect(charmander).not.toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton).toBeDefined();
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const fireButton = screen.getByRole('button', { name: /fire/i });
    userEvent.click(fireButton);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    const rapidash = screen.getByText(/rapidash/i);
    expect(rapidash).toBeInTheDocument();
    userEvent.click(nextButton);
    expect(charmander).toBeInTheDocument();
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(nextButton);
    const charmander = screen.queryByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    userEvent.click(nextButton);
    const caterpie = screen.getByText(/caterpie/i);
    expect(caterpie).toBeInTheDocument();
  });
});
