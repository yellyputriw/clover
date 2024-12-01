import Layout from '@/components/Layout';
import { useGetPosts } from '@/services/post';
import { getToken } from '@/utils/getToken';
import {
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  PlusOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import type { GetProps } from 'antd';
import {
  Button,
  FloatButton,
  Input,
  message,
  Pagination,
  PaginationProps,
  Skeleton,
  Tooltip,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { NextPageWithLayout } from './_app';

type SearchProps = GetProps<typeof Input.Search>;

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(15);
  const [searchQuery, setSearchQuery] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [token, setToken] = useState('');

  const { data, isFetching } = useGetPosts(currentPage, limit, searchQuery, token);

  const [messageApi] = message.useMessage();

  const handleSearch: SearchProps['onSearch'] = (value) => {
    setSearchQuery(value);
  };

  const handlePagination: PaginationProps['onChange'] = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      setToken('');
    } else {
      const data = JSON.parse(user);
      setToken(data.token);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="">
        <div className="w-full overflow-hidden bg-gradient-to-bl from-primary to-green-500 px-10 py-28 xl:px-0">
          <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between lg:flex-row lg:items-center">
            <div className="pattern absolute -right-72 -top-72 h-96 w-96 rounded-full bg-green-100 bg-opacity-20"></div>
            <div className="pattern absolute -right-96 -top-80 h-96 w-96 rounded-full bg-green-100 bg-opacity-20"></div>
            <div className="pattern absolute -bottom-72 -left-72 h-96 w-96 rounded-full bg-green-100 bg-opacity-20"></div>
            <div className="pattern absolute -bottom-80 -left-96 h-96 w-96 rounded-full bg-green-100 bg-opacity-20"></div>
            <div className="z-20 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <p className="mb-2 text-sm font-semibold text-white">Blog</p>
                <h1 className="max-w-3xl text-2xl font-bold tracking-wide text-white lg:text-5xl">
                  The Journal: Design Resources, Interviews and Industry News
                </h1>
              </div>
              <div className="mb-5 max-w-sm">
                <Input
                  placeholder="Enter your email"
                  allowClear
                  size="large"
                  onChange={(evt) => {
                    setInputEmail(evt.currentTarget.value);
                  }}
                  value={inputEmail}
                  suffix={
                    <Button
                      type="primary"
                      onClick={() => {
                        messageApi.success('Thank you for subscribing.');
                        setInputEmail('');
                      }}
                    >
                      Subscribe
                    </Button>
                  }
                />
              </div>
            </div>
            <p className="max-w-sm text-sm text-white">
              Vestibulum eget felis in libero hendrerit sagittis a et nisi. Nulla id ligula nec
              augue pharetra posuere. Praesent ut ipsum porta, tincidunt purus non, facilisis massa.
            </p>
          </div>
        </div>
        <div className="my-10 flex flex-col gap-2">
          <h2 className="text-center text-2xl font-bold text-primary lg:text-4xl">
            Discover Articles
          </h2>
          <p className="text-center text-base text-gray-500">
            Search for your favorite articles here.
          </p>
        </div>
        <div className="mx-auto my-6 flex max-w-screen-lg justify-center">
          <div className="w-full max-w-80 md:max-w-screen-sm">
            <Input.Search
              placeholder="Search post title..."
              onSearch={handleSearch}
              allowClear
              enterButton
              size="large"
            />
          </div>
        </div>
        {isFetching ? (
          <div className="mx-auto mb-12 grid max-w-screen-lg grid-cols-3 gap-4">
            {new Array(9).fill('').map((_, i) => (
              <div key={i} className="rounded-md p-4 shadow-md">
                <Skeleton active={isFetching} />
              </div>
            ))}
          </div>
        ) : (
          <div>
            <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-4 px-10 md:grid-cols-2 lg:grid-cols-3 xl:px-0">
              {data?.data.map((post) => (
                <div key={post.id} className="flex flex-col justify-start rounded-md p-4">
                  <div className="mb-5 h-56">
                    <Image
                      src={`https://picsum.photos/1920/1080?random${post.id}`}
                      alt="Cover"
                      className="h-full w-full object-cover object-center"
                      width={384}
                      height={224}
                    />
                  </div>
                  <Link
                    href={`/post/${post.id}`}
                    className="mb-2 line-clamp-2 h-16 cursor-pointer text-2xl font-semibold text-black hover:text-primary"
                  >
                    {post.title}
                  </Link>
                  <p className="line-clamp-5 text-justify text-sm text-gray-700">{post.body}</p>
                </div>
              ))}
            </div>
            <div className="my-10">
              <Pagination
                align="center"
                total={data?.meta.pagination.total}
                showTotal={(total, range) => `${range[0]}-${range[1]} of ${total} items`}
                onChange={handlePagination}
                defaultPageSize={limit}
                onShowSizeChange={(current, size) => {
                  setLimit(size);
                }}
                defaultCurrent={currentPage}
              />
            </div>
            <Tooltip placement="left" title="Create New Post">
              <FloatButton
                icon={<PlusOutlined />}
                type="primary"
                style={{ insetInlineEnd: 32, insetBlockEnd: 64 }}
                onClick={() => {
                  router.push('/post/create');
                }}
              />
            </Tooltip>
          </div>
        )}
      </div>
      <footer className="mx-auto flex max-w-7xl flex-col items-center border-t border-t-gray-500 px-10 py-6 sm:flex-row sm:justify-between xl:px-0">
        <p className="mb-4 text-sm sm:mb-0">Copyright &copy; 2024 Yelly Putri</p>
        <div className="flex items-center gap-4">
          <a href="https://github.com">
            <GithubOutlined className="transition-colors hover:text-green-500" />
          </a>
          <a href="https://linkedin.com">
            <LinkedinOutlined className="transition-colors hover:text-green-500" />
          </a>
          <a href="https://x.com">
            <TwitterOutlined className="transition-colors hover:text-green-500" />
          </a>
          <a href="https://instagram.com">
            <InstagramOutlined className="transition-colors hover:text-green-500" />
          </a>
        </div>
      </footer>
    </React.Fragment>
  );
};

Home.getLayout = (page) => {
  return <Layout>{page}</Layout>;
};

export default Home;
