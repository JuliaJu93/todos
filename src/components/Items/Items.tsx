import { memo, useCallback, useState, Dispatch, SetStateAction } from 'react';
import { List } from 'antd';
import { Filters, IItem } from '../../types';
import Item from './components/Item/Item';
import ItemsFilter from './components/ItemsFilter/ItemsFilter';

interface IItemsProps {
  items: IItem[];
  setItems: Dispatch<SetStateAction<IItem[]>>;
}

function Items({ items, setItems }: IItemsProps) {
  const [filter, setFilter] = useState<Filters>(Filters.all);

  const onClickItem = useCallback((id: number) => {
    setItems(prevItems => prevItems.map(item => (item.id === id ? { ...item, active: !item.active } : item)));
  }, []);

  const onChangeFilter = (newFilter: Filters) => {
    setFilter(newFilter);
  };

  const onDeleteItem = useCallback((itemId: number) => {
    setItems(prevItems => prevItems.filter(({ id }) => itemId !== id));
  }, []);

  const filteredItems =
    filter === Filters.all
      ? items
      : items.filter(({ active }) => (filter === Filters.active && active) || (filter === Filters.complete && !active));

  const sortedItems = filteredItems.sort((a, b) => {
    if (a.active && !b.active) {
      return -1;
    } else if (!a.active && b.active) {
      return 1;
    }
  });

  return (
    <div>
      <ItemsFilter filter={filter} changeFilter={onChangeFilter} />
      <List>
        {sortedItems.map(({ id, name, active }) => (
          <Item key={id} id={id} name={name} active={active} onClickItem={onClickItem} onDeleteItem={onDeleteItem} />
        ))}
      </List>
    </div>
  );
}

export default memo(Items);
