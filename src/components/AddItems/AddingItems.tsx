import { Button, Input } from 'antd';
import './styles.scss';

function AddingItems() {
  return (
    <div className='addingItems'>
      <Input />
      <Button type='primary'> Add </Button>
    </div>
  );
}

export default AddingItems;
