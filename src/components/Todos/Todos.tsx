import { useCallback } from 'react';
import { List } from 'antd';
import { useState } from 'react';
import { IItem } from '../../types';
import AddingItems from '../AddItems/AddingItems';
import Item from '../Item/Item';
import './styles.scss';

const itemsMock = [
  { id: 1, name: 'ddddd', active: true },
  { id: 2, name: '1xfseds', active: false },
];

function Todos() {
  const [items, setItems] = useState<IItem[]>(itemsMock);

  const onClickItem = useCallback((id: number) => {
    setItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, active: !item.active } : item)));
  }, []);

  const onAddNewItem = (newItemName: string) => {
    setItems(prevItems => [{ id: 197, name: newItemName, active: true }, ...prevItems]);
  };

  return (
    <div className='todos'>
      <h1> todos </h1>
      <AddingItems onAddNewItem={onAddNewItem} />
      <List>
        {items.map(({ id, name, active }) => (
          <Item key={id} id={id} name={name} active={active} onClick={onClickItem} />
        ))}
      </List>
    </div>
  );
}

export default Todos;
