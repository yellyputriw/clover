import Layout from '@/components/Layout';
import { useCreatePost } from '@/services/post';
import { useUsers } from '@/services/user';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Select } from 'antd';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { NextPageWithLayout } from '../_app';

const CreatePost: NextPageWithLayout = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { mutateAsync: createPostAsync } = useCreatePost();
  const { data: users } = useUsers();

  const options = useMemo(() => {
    const data = users?.data.map((user) => ({
      label: user.name,
      value: user.id,
    }));
    return data || [];
  }, [users?.data]);

  return (
    <div className="mx-auto max-w-screen-md px-4 py-6 md:px-10 lg:px-0">
      <Link href="/" className="hover:text-blue-500">
        <ArrowLeftOutlined className="mr-2" />
        <span>Back</span>
      </Link>
      <h2 className="my-5 text-center text-lg font-bold text-gray-900 lg:text-left lg:text-2xl">
        Create New Post
      </h2>
      <div className="rounded-md border-2 border-dashed border-gray-300 bg-white p-6">
        <Form
          form={form}
          className="flex flex-col gap-4"
          layout="vertical"
          autoComplete="off"
          onFinish={async (value) => {
            try {
              await createPostAsync(value);
              message.success('Successfully create a new post!');
              router.push('/');
            } catch (err) {
              if (err instanceof AxiosError) {
                // eslint-disable-next-line no-alert
                alert(err.response?.data.data.message);
              }
            }
          }}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Title is required!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="user_id"
            label="User"
            rules={[{ required: true, message: 'User is required!' }]}
          >
            <Select
              showSearch
              placeholder="Search user..."
              options={options}
              optionFilterProp="label"
              filterSort={(optionA, optionB) =>
                (optionA?.label ?? '')
                  .toLowerCase()
                  .localeCompare((optionB?.label ?? '').toLowerCase())
              }
            />
          </Form.Item>
          <Form.Item
            name="body"
            label="Content"
            rules={[{ required: true, message: 'Content is required!' }]}
            className=""
          >
            <Input.TextArea rows={10} count={{ show: true }} />
          </Form.Item>
          <Form.Item>
            <div className="mt-4 flex justify-end gap-2">
              <Button htmlType="reset">Reset</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

CreatePost.getLayout = (page) => {
  return <Layout title="Create New Post">{page}</Layout>;
};

export default CreatePost;
