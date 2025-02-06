import React from 'react';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BsCheck } from 'react-icons/bs';
import { MdOutlineCancel } from 'react-icons/md';

import { useStateContext } from '@/contexts/ContextProvide';
import { themeColors } from '@/data/dummy';

const ThemeSettings = () => {
  const { setColor, setMode, currentMode, currentColor, setThemeSettings } = useStateContext();

  return (
    <div className="fixed right-0 top-0 z-50 h-screen">
      <div className="h-full w-80 overflow-auto border-l border-gray-200 bg-white shadow-lg transition-transform dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100">
        <div className="sticky top-0 z-10 bg-white p-6 dark:bg-gray-800">
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold dark:text-gray-100">Settings</p>
            <button
              type="button"
              onClick={() => setThemeSettings(false)}
              className="rounded-full p-2 text-2xl text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
            >
              <MdOutlineCancel />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="border-t border-gray-200 py-6 dark:border-gray-700">
            <p className="mb-4 text-lg font-semibold dark:text-gray-100">Theme Option</p>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="light"
                  name="theme"
                  value="Light"
                  className="h-4 w-4 cursor-pointer border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                  onChange={setMode}
                  checked={currentMode === 'Light'}
                />
                <label htmlFor="light" className="ml-2 cursor-pointer text-sm dark:text-gray-300">
                  Light
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="dark"
                  name="theme"
                  value="Dark"
                  onChange={setMode}
                  className="h-4 w-4 cursor-pointer border-gray-300 text-primary focus:ring-primary dark:border-gray-600 dark:bg-gray-700"
                  checked={currentMode === 'Dark'}
                />
                <label htmlFor="dark" className="ml-2 cursor-pointer text-sm dark:text-gray-300">
                  Dark
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 py-6 dark:border-gray-700">
            <p className="mb-4 text-lg font-semibold dark:text-gray-100">Theme Colors</p>
            <div className="grid grid-cols-5 gap-3">
              {themeColors.map((item, index) => (
                <TooltipComponent key={index} content={item.name} position="TopCenter">
                  <button
                    type="button"
                    className="relative h-10 w-10 cursor-pointer rounded-full transition-all hover:ring-2 hover:ring-offset-2 dark:hover:ring-offset-gray-800"
                    style={{ 
                      backgroundColor: item.color,
                      boxShadow: item.color === currentColor ? '0 0 0 2px white, 0 0 0 4px ' + item.color : 'none'
                    }}
                    onClick={() => setColor(item.color)}
                  >
                    {item.color === currentColor && (
                      <BsCheck className="absolute inset-0 m-auto text-2xl text-white" />
                    )}
                  </button>
                </TooltipComponent>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;
