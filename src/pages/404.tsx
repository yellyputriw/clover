import { Button, Result } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={router.back}>
            Back
          </Button>
        }
      />
    </div>
  );
};

export default NotFound;
