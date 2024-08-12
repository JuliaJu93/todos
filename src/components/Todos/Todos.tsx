import { useState } from 'react';
import { IItem } from '../../types';
import AddingItems from '../AddItems/AddingItems';
import Items from '../Items/Items';
import './styles.scss';

function Todos() {
  const [items, setItems] = useState<IItem[]>([]);

  const onAddNewItem = (newItemName: string) => {
    setItems(prevItems => [{ id: Date.now(), name: newItemName, active: true }, ...prevItems]);
  };

  return (
    <div className='todos'>
      <h1> todos </h1>
      <AddingItems onAddNewItem={onAddNewItem} />
      <Items items={items} setItems={setItems} />
    </div>
  );
}

export default Todos;
