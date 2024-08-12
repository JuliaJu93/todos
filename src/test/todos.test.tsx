import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom';
import '@testing-library/jest-dom';
import Todos from '../components/Todos/Todos';
import './matchMediaMock';

describe('todos component', () => {
  const { getByText, baseElement } = render(<Todos />);

  it('Renders todos component correctly', () => {
    const header = baseElement.querySelector('h1');
    expect(header).toBeDefined();

    const addItemsForm = baseElement.querySelector('form');
    expect(addItemsForm).toBeDefined();

    const filters = baseElement.querySelectorAll("input[type='radio']");
    expect(filters.length).toBe(3);

    const items = screen.getByTestId('items');
    expect(items).toBeDefined();
  });
});
