import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import Image from 'next/image';

type HeaderProps = {
  userName?: string;
  onClick?: () => void;
};

const Header = ({ userName, onClick }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 h-16 flex-row bg-white px-4 shadow-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Image src="/logo.png" alt="Logo" className="hover:animate-spin" width={32} height={32} />
          <p className="text-lg font-semibold text-primary">Clover</p>
        </div>
        <nav className="flex flex-row items-center">
          <Image
            src="/user-avatar.png"
            alt="User Avatar"
            className="mr-2 w-8"
            width={32}
            height={32}
          />
          <Dropdown
            menu={{ items: [{ label: 'Update Token', key: 0 }], onClick }}
            trigger={['click']}
            placement="bottom"
            arrow
          >
            <div className="flex flex-row items-center gap-2">
              <p className="cursor-pointer text-black hover:text-primary">Howdy, {userName}</p>
              <DownOutlined className="text-xs" />
            </div>
          </Dropdown>
        </nav>
      </div>
    </header>
  );
};

export default Header;
