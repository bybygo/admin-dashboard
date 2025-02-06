import React, { useEffect } from 'react';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import clsx from 'clsx';
import { FiSettings } from 'react-icons/fi';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useStateContext } from '@/contexts/ContextProvide';

import { Footer, Navbar, Sidebar, ThemeSettings } from './components';
import {
  Area,
  Bar,
  Calendar,
  ColorMapping,
  ColorPicker,
  Customers,
  Ecommerce,
  Editor,
  Employees,
  Financial,
  Kanban,
  Line,
  Orders,
  Pie,
  Pyramid,
  Stacked,
} from './pages';

const App: React.FC = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <>
      <div className={currentMode === 'Dark' ? 'dark' : ''}>
        <BrowserRouter>
          <div className="dark:bg-main-dark-bg relative flex">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent content="Settings" position="TopCenter">
                <button
                  type="button"
                  onClick={() => setThemeSettings(!themeSettings)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                  className="hover:bg-light-gray p-3 text-3xl text-white hover:drop-shadow-xl"
                >
                  <FiSettings
                    className={`${themeSettings ? 'rotate-90' : ''} transition-transform duration-300`}
                  />
                </button>
              </TooltipComponent>
            </div>

            {themeSettings && <ThemeSettings />}

            <div
              className={clsx('dark:bg-secondary-dark transition-all duration-300', {
                'sidebar fixed w-72 bg-white': activeMenu,
                'hidden w-0': !activeMenu,
              })}
            >
              <Sidebar />
            </div>

            <div
              className={clsx(
                'dark:bg-primary bg-primary min-h-screen w-full transition-all duration-300',
                {
                  'md:ml-72': activeMenu,
                  'flex-2': !activeMenu,
                },
              )}
            >
              <div className="bg-main-bg dark:bg-main-dark-bg navbar fixed z-10 w-full md:static">
                <Navbar />
              </div>

              <div className="w-full">
                <Routes>
                  {/* Dashboard */}
                  <Route path="/" element={<Ecommerce />} />
                  <Route path="/ecommerce" element={<Ecommerce />} />

                  {/* Pages */}
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/customers" element={<Customers />} />

                  {/*  Apps */}
                  <Route path="/kanban" element={<Kanban />} />
                  <Route path="/editor" element={<Editor />} />
                  <Route path="/calendar" element={<Calendar />} />
                  <Route path="/color-picker" element={<ColorPicker />} />

                  {/* Charts */}
                  <Route path="/line" element={<Line />} />
                  <Route path="/area" element={<Area />} />
                  <Route path="/bar" element={<Bar />} />
                  <Route path="/pie" element={<Pie />} />
                  <Route path="/financial" element={<Financial />} />
                  <Route path="/color-mapping" element={<ColorMapping />} />
                  <Route path="/pyramid" element={<Pyramid />} />
                  <Route path="/stacked" element={<Stacked />} />
                </Routes>
              </div>

              <Footer />
            </div>
          </div>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
