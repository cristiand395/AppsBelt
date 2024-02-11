import React from "react";
import Link from 'next/link';
import Logo from './Logo'
import dynamic from 'next/dynamic';

const ThemeSwitcher = dynamic(() => import('./ThemeSwitcher'), {
  ssr: false,
});

export default function App() {
  return (
    <nav className='navbar w-full px-20 py-3 shadow-lg'>
      <div className='flex items-center'>
        <section className='nav-left font-bold mr-auto text-xl'>
          <Logo />
        </section>
        <ul className='nav-links flex gap-16 items-center'>
          <Link href='/'>
            <li className="text--color_primary font-medium">Home</li>
          </Link>
          <Link href='/about'>
            <li className="text--color_primary font-medium">Games</li>
          </Link>
          <ThemeSwitcher />
        </ul>
      </div>
    </nav>
  );
}
