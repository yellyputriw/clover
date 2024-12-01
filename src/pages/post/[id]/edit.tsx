import Layout from '@/components/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import { useGetPost, useUpdatePost } from '@/services/post';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const EditPost: NextPageWithLayout = () => {
  const router = useRouter();
  const postId = router.query.id as string;
  const [form] = Form.useForm();
  const { data: post } = useGetPost(postId);
  const { mutateAsync: updatePostAsync } = useUpdatePost();

  return (
    <div className="mx-auto max-w-screen-md px-10 py-6 lg:px-0">
      <Link href={`/post/${postId}`} className="hover:text-blue-500">
        <ArrowLeftOutlined className="mr-2" />
        <span>Back</span>
      </Link>
      <h2 className="my-5 text-center text-lg font-bold text-gray-900 lg:text-left lg:text-2xl">
        Edit Post
      </h2>
      <div className="rounded-md border-2 border-dashed border-gray-300 bg-white p-6">
        <Form
          form={form}
          name="validateOnly"
          className="flex flex-col gap-4"
          layout="vertical"
          autoComplete="off"
          initialValues={{
            title: post?.data.title,
            body: post?.data.body,
          }}
          onFinish={async (value) => {
            try {
              await updatePostAsync({ id: postId, payload: value });
              message.success('Successfully update post!');
              router.push('/');
            } catch (err) {
              if (err instanceof AxiosError) {
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

EditPost.getLayout = (page) => {
  return <Layout title="Edit Post">{page}</Layout>;
};

export default EditPost;
