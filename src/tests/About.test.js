import { React } from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/RenderWithRounter';
import { About } from '../pages';

describe(' Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutPokedex = screen.queryByRole('heading', { name: 'About Pokédex' });
    expect(aboutPokedex).toBeInTheDocument();
    const text = screen
      .getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    expect(text).toBeInTheDocument();
    const moreText = screen
      .getByText(/one can filter pokémon by type, and see more details for each one of them/i);
    expect(moreText).toBeInTheDocument();
    const img = screen.getByRole('img', { name: /pokédex/i });
    expect(img.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
