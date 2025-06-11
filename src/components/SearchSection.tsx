import { Button, Form, Input, type FormProps } from "antd";
import { useFetchUsername } from "../hooks/useFetchUsername"

type FieldType = {
  username?: string;
};

const SearchSection = () => {
  const [form] = Form.useForm();
  const { setIsSearchEnabled } = useFetchUsername();

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    setIsSearchEnabled(true);
  };
  
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input the username!' }]}
      >
        <Input placeholder="Input username" />
      </Form.Item>
      <Button type="primary" htmlType="submit">Search</Button>
    </Form>
  )
}

export default SearchSection