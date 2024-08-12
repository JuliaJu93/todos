import { Radio, RadioChangeEvent } from 'antd';
import { Filters } from '../../../../types';
import './styles.scss';

interface IItemsFilterProps {
  filter: Filters;
  changeFilter: (newFilter: Filters) => void;
}

const { Group } = Radio;

function ItemsFilter({ filter, changeFilter }: IItemsFilterProps) {
  const onChangeRadioGroup = ({ target: { value } }: RadioChangeEvent) => {
    changeFilter(value as Filters);
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
