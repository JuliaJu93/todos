import { useState } from 'react';
import { useStorage } from '../../hooks/useStorage';
import { IItem } from '../../types';
import AddItemsForm from '../AddItemsForm/AddItemsForm';
import Items from '../Items/Items';
import './styles.scss';

function Todos() {
  const { getStorage, setStorage } = useStorage();
  const getInitialItems = () => getStorage() || [];
  const [items, setItemsLocal] = useState<IItem[]>(getInitialItems);

  const setItems = (cb: (prevItems: IItem[]) => IItem[]) => {
    setItemsLocal(prevItems => {
      const newItems = cb(prevItems);
      setStorage(newItems);
      return newItems;
    });
  };

  const onAddNewItem = (newItemName: string) => {
    setItems(prevItems => [{ id: Date.now(), name: newItemName, active: true }, ...prevItems]);
  };

  return (
    <div className='todos'>
      <h1> todos </h1>
      <AddItemsForm onAddNewItem={onAddNewItem} />
      <Items items={items} setItems={setItems} />
    </div>
  );
}

export default Todos;
