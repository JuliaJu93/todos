import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todos from '../components/Todos/Todos';
import './matchMediaMock';

describe('todos component', () => {
  it('Renders todos component correctly', () => {
    const { baseElement} = render(<Todos />);

    const header = baseElement.querySelector('h1');
    expect(header).toBeDefined();

    const addItemsForm = baseElement.querySelector('form');
    expect(addItemsForm).toBeDefined();

    const filters = baseElement.querySelectorAll("input[type='radio']");
    expect(filters.length).toBe(3);

    const items = screen.getByTestId('items');
    expect(items).toBeDefined();
  });

  it('Adding new items', async () => {
    const { baseElement} = render(<Todos />);

    const NEW_ITEM_TEXT = 'test';
    const text = screen.queryByText(NEW_ITEM_TEXT);
    expect(text).toBeNull();

    const formInput = baseElement.querySelector("input[type='text']");
    formInput && fireEvent.change(formInput, { target: { value: NEW_ITEM_TEXT } });

    const submitBtn = baseElement.querySelector("button");
    submitBtn && fireEvent.click(submitBtn);

    await waitFor(async () => {
      const newItemText = screen.queryByText(NEW_ITEM_TEXT);
      expect(newItemText).not.toBeNull();
    });
  });

  it('Cleaning input before adding new item', async () => {
    const { baseElement} = render(<Todos />);

    const NEW_ITEM_TEXT = 'text';
    const formInput = baseElement.querySelector("input[type='text']");
    formInput && fireEvent.change(formInput, { target: { value: NEW_ITEM_TEXT } });

    const submitBtn = baseElement.querySelector("button");
    submitBtn && fireEvent.click(submitBtn);

    await waitFor(async () => {
      const formInput = baseElement.querySelector("input[type='text']");
      expect(formInput).toHaveValue('');
    });
  });

  it('No adding an empty items', async () => {
    const { baseElement} = render(<Todos />);

    const NEW_ITEM_TEXT = 'text';
    const formInput = baseElement.querySelector("input[type='text']");
    formInput && fireEvent.change(formInput, { target: { value: NEW_ITEM_TEXT } });

    const submitBtn = baseElement.querySelector("button");
    submitBtn && fireEvent.click(submitBtn);

    await waitFor(async () => {
      const newItemText = screen.queryByText(NEW_ITEM_TEXT);
      expect(newItemText).toBeNull();
    });
  });

  it('No adding an empty items with spaces', async () => {
    const { baseElement} = render(<Todos />);

    const NEW_ITEM_TEXT = '   ';
    const formInput = baseElement.querySelector("input[type='text']");
    formInput && fireEvent.change(formInput, { target: { value: NEW_ITEM_TEXT } });

    const submitBtn = baseElement.querySelector("button");
    submitBtn && fireEvent.click(submitBtn);

    await waitFor(async () => {
      const newItemText = screen.queryByText(NEW_ITEM_TEXT);
      expect(newItemText).toBeNull();
    });
  });
});
