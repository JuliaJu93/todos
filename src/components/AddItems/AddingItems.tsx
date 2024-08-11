import { ChangeEvent, useState } from 'react';
import { Button, Input } from 'antd';
import './styles.scss';

interface IAddingItemsProps {
  onAddNewItem: (newItemName: string) => void;
}

function AddingItems({ onAddNewItem }: IAddingItemsProps) {
  const [newItem, setNewItem] = useState('');

  const onChangeInput = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setNewItem(value);
  };

  const onClearInput = () => {
    setNewItem('');
  };

  const onClickInputBtn = () => {
    onAddNewItem(newItem);
    onClearInput();
  };

  return (
    <div className='addingItems'>
      <Input onChange={onChangeInput} value={newItem} />
      <Button type='primary' disabled={!newItem} onClick={onClickInputBtn}>
        Add
      </Button>
    </div>
  );
}

export default AddingItems;
