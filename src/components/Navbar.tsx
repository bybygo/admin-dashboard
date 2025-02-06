import React, { useEffect } from 'react';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { AiOutlineMenu } from 'react-icons/ai';
import { BsChatLeft } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { RiNotification3Line } from 'react-icons/ri';

import { Cart, Chat, Notification, UserProfile } from '@/components/index';
import { useStateContext } from '@/contexts/ContextProvide';
import { avatar } from '@/data/dummy';

interface NavButtonProps {
  title: string;
  customFunc: () => void;
  icon: React.ReactNode;
  color: string;
  dotColor?: string;
}

const NavButton: React.FC<NavButtonProps> = ({ title, customFunc, icon, color, dotColor }) => {
  return (
    <TooltipComponent content={title} position="BottomCenter">
      <button
        type="button"
        onClick={customFunc}
        style={{ color }}
        className="hover:bg-light-gray relative rounded-full p-3 text-xl"
        title={title}
      >
        <span
          style={{ background: dotColor }}
          className="absolute top-2 right-2 inline-flex h-2 w-2 rounded-full"
        />
        {icon}
      </button>
    </TooltipComponent>
  );
};

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof screenSize !== 'undefined' && screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="relative flex justify-between p-2 md:mx-6">
      <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
        color="blue"
        icon={<AiOutlineMenu />}
      />

      <div className="flex">
        <NavButton
          title="Cart"
          customFunc={() => handleClick('cart')}
          color="blue"
          icon={<FiShoppingCart />}
        />

        <NavButton
          title="Chat"
          customFunc={() => handleClick('chat')}
          color="blue"
          dotColor="#03C9D7"
          icon={<BsChatLeft />}
        />

        <NavButton
          title="Notifications"
          customFunc={() => handleClick('notification')}
          color="blue"
          dotColor="#03C9D7"
          icon={<RiNotification3Line />}
        />

        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="hover:bg-light-gray flex cursor-pointer items-center gap-2 rounded-lg p-1"
            onClick={() => handleClick('userProfile')}
          >
            <img src={avatar} className="h-8 w-8 rounded-full" alt="avatar" />

            <p>
              <span className="text-14 text-gray-400">Hi, </span>{' '}
              <span className="text-14 ml-1 font-bold text-gray-400">Michale</span>
            </p>

            <MdKeyboardArrowDown className="text-14 text-gray-400" />
          </div>
        </TooltipComponent>

        {isClicked.cart && <Cart />}
        {isClicked.chat && <Chat />}
        {isClicked.notification && <Notification />}
        {isClicked.userProfile && <UserProfile />}
      </div>
    </div>
  );
};

export default Navbar;
