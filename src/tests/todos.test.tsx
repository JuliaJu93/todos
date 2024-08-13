import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todos from '../components/Todos/Todos';
import './matchMediaMock';

function createNewItem(baseElement: HTMLElement, text: string) {
  const formInput = baseElement.querySelector("input[type='text']");
  formInput && fireEvent.change(formInput, { target: { value: text } });

  const submitBtn = baseElement.querySelector('button');
  submitBtn && fireEvent.click(submitBtn);
}

function completedItem(text: string) {
  const newItem = screen.queryByText(text);
  newItem && fireEvent.click(newItem);
}

describe('todos component', () => {
  it('Renders todos component correctly', () => {
    const { baseElement } = render(<Todos />);

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
    const { baseElement } = render(<Todos />);

    const NEW_ITEM_TEXT = 'test';
    const text = screen.queryByText(NEW_ITEM_TEXT);
    expect(text).toBeNull();

    const formInput = baseElement.querySelector("input[type='text']");
    formInput && fireEvent.change(formInput, { target: { value: NEW_ITEM_TEXT } });

    const submitBtn = baseElement.querySelector('button');
    submitBtn && fireEvent.click(submitBtn);

    await waitFor(async () => {
      const newItem = screen.queryByText(NEW_ITEM_TEXT);
      expect(newItem).not.toBeNull();
    });
  });

  it('Cleaning input before adding new item', async () => {
    const { baseElement } = render(<Todos />);

    const NEW_ITEM_TEXT = 'text';
    createNewItem(baseElement, NEW_ITEM_TEXT);

    await waitFor(async () => {
      const formInput = baseElement.querySelector("input[type='text']");
      expect(formInput).toHaveValue('');
    });
  });

  it('No adding an empty items', async () => {
    const { baseElement } = render(<Todos />);

    const NEW_ITEM_TEXT = '';
    createNewItem(baseElement, NEW_ITEM_TEXT);

    await waitFor(async () => {
      const items = screen.getByTestId('items');
      const buttonsInItems = items.querySelector('button');
      expect(buttonsInItems).toBeNull();
    });
  });

  it('No adding an empty items with spaces', async () => {
    const { baseElement } = render(<Todos />);

    const NEW_ITEM_TEXT = '   ';
    createNewItem(baseElement, NEW_ITEM_TEXT);

    await waitFor(async () => {
      const newItem = screen.queryByText(NEW_ITEM_TEXT);
      expect(newItem).toBeNull();
    });
  });

  it('Transition of an item to a completed state', async () => {
    const { baseElement } = render(<Todos />);

    const NEW_ITEM_TEXT = 'test';
    createNewItem(baseElement, NEW_ITEM_TEXT);

    await waitFor(async () => {
      completedItem(NEW_ITEM_TEXT);
      const notActiveNewItem = baseElement.querySelector('.item_notActive');
      expect(notActiveNewItem).toBeDefined();
    });
  });
});

describe('filters', () => {
  it('Working all filters', async () => {
    const { baseElement } = render(<Todos />);

    const NEW_ITEM_TEXT1 = 'test1';
    createNewItem(baseElement, NEW_ITEM_TEXT1);

    const NEW_ITEM_TEXT2 = 'test2';
    createNewItem(baseElement, NEW_ITEM_TEXT2);

    await waitFor(async () => {
      completedItem(NEW_ITEM_TEXT1);

      const activeItem = baseElement.querySelector('.item_active');
      expect(activeItem).toBeDefined();
      const notActiveItem = baseElement.querySelector('.item_notActive');
      expect(notActiveItem).toBeDefined();
    });
  });

  it('Working complete filters', async () => {
    const { baseElement } = render(<Todos />);

    const NEW_ITEM_TEXT1 = 'test1';
    createNewItem(baseElement, NEW_ITEM_TEXT1);

    const NEW_ITEM_TEXT2 = 'test2';
    createNewItem(baseElement, NEW_ITEM_TEXT2);

    await waitFor(async () => {
      completedItem(NEW_ITEM_TEXT1);

      const radioInputCompleted = screen.getByRole('radio', { name: 'Complete' });
      radioInputCompleted && fireEvent.change(radioInputCompleted);

      const activeItem = baseElement.querySelector('.item_active');
      expect(activeItem).toBeNull();
      const notActiveItem = baseElement.querySelector('.item_notActive');
      expect(notActiveItem).toBeDefined();
    });
  });

  it('Working active filters', async () => {
    const { baseElement } = render(<Todos />);

    const NEW_ITEM_TEXT1 = 'test1';
    createNewItem(baseElement, NEW_ITEM_TEXT1);

    const NEW_ITEM_TEXT2 = 'test2';
    createNewItem(baseElement, NEW_ITEM_TEXT2);

    await waitFor(async () => {
      completedItem(NEW_ITEM_TEXT1);

      const radioInputCompleted = screen.getByRole('radio', { name: 'Active' });
      radioInputCompleted && fireEvent.change(radioInputCompleted);

      const activeItem = baseElement.querySelector('.item_active');
      expect(activeItem).toBeDefined();
      const notActiveItem = baseElement.querySelector('.item_notActive');
      expect(notActiveItem).toBeNull();
    });
  });
});
