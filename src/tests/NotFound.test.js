import { React } from 'react';
import { screen, act } from '@testing-library/react';
import renderWithRouter from './helper/RenderWithRounter';
import App from '../App';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina-que-nao-existe/');
    });
    const getErrorText = screen.getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(getErrorText).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/pagina-que-nao-existe/');
    });
    const img = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
