import { memo, useCallback, useState, Dispatch, SetStateAction } from 'react';
import { List } from 'antd';
import { Filters, IItem } from '../../types';
import Item from './components/Item/Item';
import ItemsFilter from './components/ItemsFilter/ItemsFilter';

function activeItemsFirst(a: boolean, b: boolean) {
  if (a && !b) {
    return -1;
  } else if (!a && b) {
    return 1;
  }

  return 0;
}

interface IItemsProps {
  items: IItem[];
  setItems: (cb: (prevItems: IItem[]) => IItem[]) => void;
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

  const sortedItems = filteredItems.sort((a: IItem, b: IItem) => {
    return activeItemsFirst(a.active, b.active);
  });

  return (
    <div>
      <ItemsFilter filter={filter} onChangeFilter={onChangeFilter} />
      <List data-testid='items'>
        {sortedItems.map(({ id, name, active }) => (
          <Item key={id} id={id} name={name} active={active} onClickItem={onClickItem} onDeleteItem={onDeleteItem} />
        ))}
      </List>
    </div>
  );
}

export default memo(Items);
