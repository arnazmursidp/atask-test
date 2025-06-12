import { Button, Form, type FormProps } from "antd";
import { useFetchUsername } from "../hooks/useFetchUsername"

type FieldType = {
  username?: string;
};

const SearchSection = () => {
  const [form] = Form.useForm();
  const { setIsSearchEnabled, setUsername, username, usernameList, isSearchEnabled } = useFetchUsername();

  const { isLoading, isFetching, data } = usernameList

  const onFinish: FormProps<FieldType>['onFinish'] = () => {
    setIsSearchEnabled(true);
  };
  
  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          name="username"
          rules={[{ required: true, message: 'Please input the username!' }]}
        >
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
      {!isLoading && !isFetching && (data?.items?.length ?? 0) > 0 && <p>Showing users for {isSearchEnabled ? username : '...'}</p>}
    </>
  )
}

export default SearchSection