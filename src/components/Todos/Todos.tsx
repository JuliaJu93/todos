import { List } from 'antd';
import AddingItems from '../AddItems/AddingItems';
import Item from '../Item/Item';
import './styles.scss';

const itemsMock = [
  { name: 'ddddd', active: true },
  { name: '1xfseds', active: false },
];

function Todos() {
  return (
    <div className='todos'>
      <h1> todos </h1>
      <AddingItems />
      <List>
        {itemsMock.map(({ name, active }, i) => (
          <Item key={i} name={name} active={active} />
        ))}
      </List>
    </div>
  );
}

export default Todos;
