import { memo } from 'react';
import './styles.scss';

function Item({ name, active }) {
  const notActive = active ? '' : 'item_notActive';

  return <div className={`item ${notActive}`}>{name}</div>;
}

export default memo(Item);
