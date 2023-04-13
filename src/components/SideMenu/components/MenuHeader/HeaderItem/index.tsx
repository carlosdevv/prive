import { Divider } from '@/components/Divider';
import { BiMoon, BiSun } from '@/components/Icons';
import * as Switch from '@radix-ui/react-switch';
import Link from 'next/link';
import { useState } from 'react';
import { HeaderItemsProps } from '..';


type HeaderItemParams = {
  headerItems: HeaderItemsProps[];
}

const HeaderItem = ({ headerItems }: HeaderItemParams) => {

  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <section className='w-full'>
      <span className='text-[15px] text-[--text]'>Configurações</span>
      <Divider my='6px' />
      <ul className='flex flex-col gap-1'>
        <li className='w-full rounded-lg hover:bg-[--background] p-2 flex items-center gap-2 text-[--text-light] hover:text-[--text]'>
          {isDarkMode ? <BiMoon /> : <BiSun />}
          <span className='text-[14px]'>Dark Mode</span>
          <Switch.Root
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="ml-auto w-9 h-5 bg-[--border] rounded-full relative  focus:shadow-[0_0_0_2px] focus:shadow-[--border] data-[state=checked]:bg-black outline-none cursor-default"
            id="dark-mode"
            style={{ WebkitTapHighlightColor: 'var(--background-dark)' }}
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full shadow-[0_2px_2px] shadow-blackA7 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
          </Switch.Root>
        </li>
        {headerItems.map((item) => (
          <Link href={item.href} className='w-full rounded-lg hover:bg-[--background] p-2 '>
            <li key={item.href} className='flex items-center gap-2 text-[--text-light] hover:text-[--text]'>
              {item.icon}
              <span className='text-[14px]'>{item.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </section >
  )
}

export { HeaderItem };
