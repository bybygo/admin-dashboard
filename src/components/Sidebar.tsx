import React from 'react';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import clsx from 'clsx';
import { MdOutlineCancel } from 'react-icons/md';
import { SiShopware } from 'react-icons/si';
import { Link, NavLink } from 'react-router-dom';

import { useStateContext } from '@/contexts/ContextProvide';
import { links } from '@/data/dummy';

const Sidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } = useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && typeof screenSize !== 'undefined' && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    clsx(
      'text-md m-2 flex items-center gap-5 rounded-lg pt-3 pb-2.5 pl-4',
      isActive
        ? 'font-extrabold'
        : 'text-gray-700 hover:bg-light-gray dark:text-gray-200 dark:hover:text-black',
    );

  return (
    <div className="ml-3 h-screen overflow-auto pb-10 md:overflow-hidden md:hover:overflow-auto">
      {activeMenu && (
        <>
          <div className="flex items-center justify-between">
            <Link
              to="/"
              onClick={() => setActiveMenu(!activeMenu)}
              className="mt-4 ml-3 flex items-center gap-3 text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
            >
              <SiShopware /> <span>Shoppy</span>
            </Link>

            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="hover:bg-light-gray mt-4 block rounded-full p-3 text-xl"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="m-3 mt-4 text-gray-400 uppercase">{item.title}</p>

                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : '',
                    })}
                    className={navLinkClasses}
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
