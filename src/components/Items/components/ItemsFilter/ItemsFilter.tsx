import { ChangeEvent } from 'react';
import { Radio } from 'antd';
import { Filters } from '../../../../types';
import './styles.scss';

interface IItemsFilterProps {
  filter: Filters;
  changeFilter: (newFilter: string) => void;
}

const { Group } = Radio;

function ItemsFilter({ filter, changeFilter }: IItemsFilterProps) {
  const onChangeRadioGroup = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    changeFilter(value);
  };

  return (
    <Group className='itemsFilter' value={filter} onChange={onChangeRadioGroup}>
      <Radio value={Filters.all}>{Filters.all}</Radio>
      <Radio value={Filters.active}>{Filters.active}</Radio>
      <Radio value={Filters.complete}>{Filters.complete}</Radio>
    </Group>
  );
}

export default ItemsFilter;
