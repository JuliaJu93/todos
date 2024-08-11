import { memo } from 'react';
import { IItem } from '../../types';
import './styles.scss';

interface IItemProps extends IItem {
  onClick: (id: number) => void;
}

function Item({ id, name, active, onClick }: IItemProps) {
  const notActive = active ? '' : 'item_notActive';

  return (
    <div className={`item ${notActive}`} onClick={() => onClick(id)}>
      {name}
    </div>
  );
}

export default memo(Item);
