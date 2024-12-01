import Layout from '@/components/Layout';
import { NextPageWithLayout } from '@/pages/_app';
import { useDeletePost, useGetPost } from '@/services/post';
import { useUser } from '@/services/user';
import { ArrowLeftOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Skeleton, Tag } from 'antd';
import { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

const PostDetail: NextPageWithLayout = () => {
  const router = useRouter();
  const postId = router.query.id as string;

  const { data: post, isFetching: isFetchingPost } = useGetPost(postId);
  const { data: user, isFetching: isFetchingUser } = useUser(post?.data.user_id as number);
  const { mutateAsync: deletePostAsync } = useDeletePost();

  return (
    <div className="mx-auto max-w-screen-lg px-10 py-6 lg:px-0">
      <div className="mb-6 flex items-center justify-between">
        <Link href="/" className="hover:text-blue-500">
          <ArrowLeftOutlined className="mr-2" />
          <span>Back</span>
        </Link>
        <div className="flex gap-2">
          <Button
            type="primary"
            variant="filled"
            color="default"
            icon={<EditOutlined />}
            onClick={() => {
              router.push(`/post/${router.query.id}/edit`);
            }}
          >
            Edit
          </Button>
          <Popconfirm
            placement="bottom"
            title={'Are you sure to delete this post?'}
            description={'Delete the post'}
            okText="Yes"
            cancelText="No"
            onConfirm={async () => {
              try {
                await deletePostAsync(postId);
                alert(`Success delete post ${router.query.id}`);
                router.push('/');
              } catch (err) {
                if (err instanceof AxiosError) {
                  alert(err.response?.data.data.message);
                }
              }
            }}
            onCancel={() => {}}
          >
            <Button type="primary" variant="filled" color="danger" icon={<DeleteOutlined />}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      </div>
      {isFetchingPost || isFetchingUser ? (
        <div className="py-6">
          <Skeleton active={isFetchingPost || isFetchingUser} />
        </div>
      ) : (
        <div className="flex w-full flex-col gap-6 md:flex-row">
          <div className="w-full rounded-md bg-white p-6 shadow-md md:w-8/12 lg:w-9/12">
            <h2 className="mb-6 text-2xl font-bold">{post?.data.title}</h2>
            <p className="text-slate-600">{post?.data.body}</p>
          </div>
          <div className="h-fit w-full rounded-md bg-white p-6 shadow-md md:w-4/12 lg:w-3/12">
            <p className="mb-2 text-xl font-semibold">Author:</p>
            <div className="flex items-center gap-2">
              <p className="mb-1 cursor-pointer text-base text-blue-500 hover:underline">
                {user?.data.name || 'Anonymous'}
              </p>
              <Tag color={user?.data.status === 'active' ? 'green' : 'red'}>
                {user?.data.status}
              </Tag>
            </div>
            <p className="whitespace-wrap overflow-hidden text-ellipsis text-sm text-gray-600">
              {user?.data.email || 'Anonymous'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

PostDetail.getLayout = (page) => {
  return <Layout title="Detail Post">{page}</Layout>;
};

export default PostDetail;
