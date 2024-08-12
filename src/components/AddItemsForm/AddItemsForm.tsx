import { Form, Button, Input } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import './styles.scss';

interface IAddingItemsProps {
  onAddNewItem: (newItemName: string) => void;
}

const { Item } = Form;

function AddItemsForm({ onAddNewItem }: IAddingItemsProps) {
  const [form] = Form.useForm();

  const onClickInputBtnHandler = ({ newItem }: { newItem: string }) => {
    onAddNewItem(newItem);
    form.resetFields();
  };

  return (
    <Form form={form} className='addItemsForm' onFinish={onClickInputBtnHandler}>
      <Item name='newItem'>
        <Input />
      </Item>
      <Button htmlType='submit' type='primary' icon={<PlusCircleOutlined />} iconPosition='end'>
        Add
      </Button>
    </Form>
  );
}

export default AddItemsForm;
