import { useCallback, useState } from 'react';
import { List } from 'antd';
import { IItem, Filters } from '../../types';
import AddingItems from '../AddItems/AddingItems';
import Item from '../Item/Item';
import ItemsFilter from '../ItemsFilter/ItemsFilter';
import './styles.scss';

function Todos() {
  const [items, setItems] = useState<IItem[]>([]);
  const [filter, setFilter] = useState<Filters>(Filters.all);

  const onClickItem = useCallback((id: number) => {
    setItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, active: !item.active } : item)));
  }, []);

  const onAddNewItem = (newItemName: string) => {
    setItems(prevItems => [{ id: Date.now(), name: newItemName, active: true }, ...prevItems]);
  };

  const changeFilter = (newFilter: Filters) => {
    setFilter(newFilter);
  };

  const onDeleteItem = useCallback((itemId: number) => {
    setItems(prevItems => prevItems.filter(({ id }) => itemId !== id));
  }, []);

  const filteredItems =
    filter === Filters.all
      ? items
      : items.filter(({ active }) => (filter === Filters.active && active) || (filter === Filters.complete && !active));

  return (
    <div className='todos'>
      <h1> todos </h1>
      <AddingItems onAddNewItem={onAddNewItem} />
      <ItemsFilter changeFilter={changeFilter} />
      <List>
        {filteredItems.map(({ id, name, active }) => (
          <Item key={id} id={id} name={name} active={active} onClickItem={onClickItem} onDeleteItem={onDeleteItem} />
        ))}
      </List>
    </div>
  );
}

export default Todos;
