import Image from 'next/image';

type HeaderProps = {
  userName: string;
};

const Header = ({ userName }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 h-16 flex-row bg-white px-4 shadow-md">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Image src="/logo.png" alt="Logo" className="hover:animate-spin" width={32} height={32} />
          <p className="text-primary text-lg font-semibold">Clover</p>
        </div>
        <nav className="flex flex-row items-center">
          <div className="flex flex-row items-center gap-2">
            <img src="/user-avatar.png" alt="User Photo" className="w-8" />
            <p className="text-black">Howdy, {userName || 'Anonymous'}!</p>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
