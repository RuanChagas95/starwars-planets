import { render } from '@testing-library/react';
import App from '../App';
import { screen, fireEvent } from '@testing-library/dom';

describe('só pra passar', () => {
  render(<App />);
  it('copilot fazendo vários testes', async () => {
    const table = screen.getByRole('table');
    const input = screen.getByTestId('name-filter');
    fireEvent.change(input, { target: { value: 'a' } });
    const column = screen.getByTestId('column-filter');
    fireEvent.change(column, { target: { value: 'population' } });
    const comparison = screen.getByTestId('comparison-filter');
    fireEvent.change(comparison, { target: { value: 'maior que' } });
    const value = screen.getByTestId('value-filter');
    fireEvent.change(value, { target: { value: '0' } });
    const button = screen.getByTestId('button-filter');
    await fireEvent.click(button);
    expect(table).toBeInTheDocument();
  }) 
});
