import { memo } from 'react';
import { IItem } from '../../types';
import './styles.scss';

interface IItemProps extends IItem {
  onClickItem: (id: number) => void;
}

function Item({ id, name, active, onClickItem }: IItemProps) {
  const notActive = active ? '' : 'item_notActive';

  const onClick = () => {
    onClickItem(id);
  };

  return (
    <div className={`item ${notActive}`} onClick={onClick}>
      {name}
    </div>
  );
}

export default memo(Item);
