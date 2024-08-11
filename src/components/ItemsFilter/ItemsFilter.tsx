import { Radio } from 'antd';
import { ChangeEvent } from 'react';
import { IItem, Filters } from '../../types';
import './styles.scss';

interface IItemsFilterProps extends IItem {
  changeFilter: (newFilter: string) => void;
}

const { Group } = Radio;

function ItemsFilter({ changeFilter }: IItemsFilterProps) {
  const onChangeRadioGroup = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    changeFilter(value);
  };

  return (
    <Group className='itemsFilter' defaultValue={Filters.all} onChange={onChangeRadioGroup}>
      <Radio value={Filters.all}>{Filters.all}</Radio>
      <Radio value={Filters.active}>{Filters.active}</Radio>
      <Radio value={Filters.complete}>{Filters.complete}</Radio>
    </Group>
  );
}

export default ItemsFilter;
