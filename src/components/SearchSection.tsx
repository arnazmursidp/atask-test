import { Button, Form, type FormProps } from "antd";
import { useFetchUsername } from "../hooks/useFetchUsername"

type FieldType = {
  username?: string;
};

const SearchSection = () => {
  const [form] = Form.useForm();
  const { setIsSearchEnabled, setUsername, username } = useFetchUsername();

  const onFinish: FormProps<FieldType>['onFinish'] = () => {
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
        {username}
        <input 
          value={username}
          onChange={(event) => {
            setIsSearchEnabled(false);
            setUsername(event.target.value)
          }}
          placeholder="Input username"
        />
      </Form.Item>
      <Button type="primary" htmlType="submit">Search</Button>
    </Form>
  )
}

export default SearchSection