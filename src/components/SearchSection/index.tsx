import { Button, Form, Spin, type FormProps } from "antd";
import { useFetchUsername } from "../../hooks/useFetchUsername"
import './index.css'

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
    <header>
      <Form
        form={form}
        layout="inline"
        onFinish={onFinish}
        autoComplete="off"
        className="form"
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
            placeholder="Search Github username..."
          />
        </Form.Item>
        <Form.Item>
          <Button className="button" type="primary" htmlType="submit">Search</Button>
        </Form.Item>
      </Form>
      <Spin fullscreen spinning={isLoading || isFetching} />
      {!isLoading && !isFetching && (data?.items?.length ?? 0) > 0
        ? <p>Showing users for <strong>{isSearchEnabled ? username : '...'}</strong></p>
        : <div style={{ height: '70px' }}></div>
      }
    </header>
  )
}

export default SearchSection