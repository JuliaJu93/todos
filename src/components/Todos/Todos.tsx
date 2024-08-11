import AddingItems from '../AddItems/AddingItems';
import './styles.scss';

function Todos() {
  return (
    <div className='todos'>
      <h1> todos </h1>
      <AddingItems />
    </div>
  );
}

export default Todos;
