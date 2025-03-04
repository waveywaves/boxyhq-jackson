import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Head from 'next/head';

import { Sidebar } from '@components/Sidebar';
import { Navbar } from '@components/Navbar';

export const AccountLayout = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession({ required: true });

  const [isOpen, setIsOpen] = useState(false);

  if (status === 'loading') {
    return null;
  }

  return (
    <>
      <Head>
        <title>Admin Portal | BoxyHQ</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <div className='flex flex-1 flex-col md:pl-64'>
        <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 border-b bg-white'>
          <button
            onClick={() => {
              setIsOpen(!isOpen);
            }}
            type='button'
            className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset md:hidden'>
            <span className='sr-only'>Open sidebar</span>
            <svg
              className='h-6 w-6'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              aria-hidden='true'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h7' />
            </svg>
          </button>
          <Navbar session={session} />
        </div>
        <main>
          <div className='py-6'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>{children}</div>
          </div>
        </main>
      </div>
    </>
  );
};
