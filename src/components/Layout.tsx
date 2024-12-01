import delay from '@/utils/delay';
import { Button, Form, Input, message, Modal } from 'antd';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import Header from './Header';

type LayoutProps = {
  title?: string;
  children?: React.ReactNode;
};

const Layout = ({ children, title }: LayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      setIsModalOpen(true);
    } else {
      const data = JSON.parse(user);
      setUserName(data.name);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Clover {title ? `- ${title}` : ''}</title>
        <meta name="description" content="Clover Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo.png" />
      </Head>
      {contextHolder}
      <Header userName={userName} />
      <main>{children}</main>
      <Modal
        open={isModalOpen}
        title="Welcome to Clover"
        centered
        closable={false}
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
            name="form_in_modal"
            clearOnDestroy
            onFinish={async (data) => {
              setConfirmLoading(true);
              await delay(1500);

              localStorage.setItem('user', JSON.stringify(data));
              setUserName(data.name);

              setConfirmLoading(false);
              setIsModalOpen(false);
              messageApi.open({
                type: 'success',
                content: 'Data Saved!',
              });
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
