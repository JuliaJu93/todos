import { memo } from 'react';
import { Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { IItem } from '../../../../types';
import './styles.scss';

interface IItemProps extends IItem {
  onClickItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
}

function Item({ id, name, active, onClickItem, onDeleteItem }: IItemProps) {
  const notActive = active ? '' : 'item_notActive';

  const onClickItemHandler = () => {
    onClickItem(id);
  };

  const onClickDeleteBtnHandler = () => {
    onDeleteItem(id);
  };

  return (
    <div className='item'>
      <div className={`item_content ${notActive}`} onClick={onClickItemHandler}>
        {name}
      </div>
      <Button danger icon={<DeleteOutlined />} onClick={onClickDeleteBtnHandler} />
    </div>
  );
}

export default memo(Item);
