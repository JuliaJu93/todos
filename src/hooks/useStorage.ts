import { IItem } from '../types';

interface IStorage {
  getStorage: () => IItem[] | null;
  setStorage: (items: IItem[]) => void;
}

export const useStorage = (): IStorage => {
  const getStorage = (): IItem[] | null => {
    const lsItems = localStorage.getItem('items');
    return lsItems ? JSON.parse(lsItems) : null;
  };

  const setStorage = (items: IItem[]): void => {
    localStorage.setItem('items', JSON.stringify(items));
  };

  return { getStorage, setStorage };
};
