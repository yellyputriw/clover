/* eslint-disable react/no-unstable-nested-components */
import delay from '@/utils/delay';
import { useLocalStorageState } from 'ahooks';
import { Button, Form, Input, message, Modal } from 'antd';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from './Header';

type UserState = { name: string; token: string };

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
};

const Layout = ({ children, title }: LayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [mode, setMode] = useState('create');
  const [userName, setUserName] = useState('Guest');

  const [user, setUser] = useLocalStorageState<UserState>('user', {
    listenStorageChange: true,
  });

  useEffect(() => {
    if (!user) {
      setIsModalOpen(true);
    } else {
      setUserName(user.name);
    }
  }, [user]);

  return (
    <React.Fragment>
      <Head>
        <title>Clover {title ? `- ${title}` : ''}</title>
        <meta name="description" content="Clover Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      {contextHolder}
      <Header
        userName={userName}
        onClick={() => {
          setMode('edit');
          setIsModalOpen(true);
        }}
      />
      <main>{children}</main>
      <Modal
        open={isModalOpen}
        title="Welcome to Clover"
        centered
        closable={mode === 'edit'}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
        footer={(_, __) => (
          <Button type="primary" htmlType="submit" loading={confirmLoading}>
            Submit
          </Button>
        )}
        styles={{ mask: { backdropFilter: 'blur(10px)' } }}
        modalRender={(dom) => (
          <Form
            form={form}
            layout="vertical"
            {...(mode === 'edit' && { initialValues: user })}
            onFinish={async (data) => {
              setConfirmLoading(true);
              try {
                await delay(1500);
                setUser(data);
                messageApi.open({
                  type: 'success',
                  content: 'Data Saved!',
                });
              } finally {
                setConfirmLoading(false);
                setIsModalOpen(false);
              }
            }}
          >
            {dom}
          </Form>
        )}
      >
        <div className="mb-4">
          <p className="">Before continue, please fill the form below</p>
        </div>
        <Form.Item name="name" label="Name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="token" label="Go REST Token" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
      </Modal>
    </React.Fragment>
  );
};

export default Layout;
