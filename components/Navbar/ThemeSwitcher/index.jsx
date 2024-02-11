'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'
import { RiMoonClearFill, RiSunFill } from 'react-icons/ri'

function ThemeSwitcher() {
  const storedTheme = window.localStorage.getItem('prefered-theme');
  const checkTheme = () => {
    if (storedTheme === 'darkTheme') {
      return false;
    }
    return true;
  };
  const [isLight, setIsLight] = useState(checkTheme);
  const setLightTheme = () => {
    setIsLight(true);
    window.localStorage.setItem('prefered-theme', 'lightTheme');
  }
  const setDarkTheme = () => {
    setIsLight(false);
    window.localStorage.setItem('prefered-theme', 'darkTheme');
  }

  const toggleSwitch = () => {
    if (isLight) {
      setDarkTheme();
    } else {
      setLightTheme();
    }
  }
  useEffect(() => {
    const setTheme = () => {
      const root = window.document.documentElement;
      const operatingSystemThemeDark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      );
      if (storedTheme === 'darkTheme' && operatingSystemThemeDark.matches) {
        root.classList.add('dark');
      }
      if (storedTheme === 'darkTheme') {
        root.classList.add('dark');
      }
      if (storedTheme === 'lightTheme') {
        root.classList.remove('dark');
      }
    };
    setTheme();
  }, [storedTheme]);

  const spring = {
    type: 'spring',
    stiffness: 700,
    damping: 30,
  }
  return (
    // <div className='theme-switcher items-center ml-12'>
    <div onClick={toggleSwitch} className={`bg-transparent  flex-start flex h-[30px] w-[70px] rounded-[50px] bg p-[5px] shadow-md hover:cursor-pointer  ${isLight && 'place-content-end'}`}>

      <motion.div
        className="flex h-[20px] w-[40px] items-center justify-center rounded-full"
        layout
        transition={spring}
      >
        <motion.div whileTap={{ rotate: 360 }}>
          {isLight ? (<RiSunFill className="h-6 w-6 text-[#181720]" />) : (<RiMoonClearFill className="h-6 w-6 text-slate-200" />)}
        </motion.div>

      </motion.div>

    </div>
    // </div>
  );
}
export default ThemeSwitcher;