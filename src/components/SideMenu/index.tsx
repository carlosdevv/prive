'use client'

import { FiAlertCircle, FiHome, FiLogOut, TbCalendarEvent } from '@/components/Icons';
import { APP_ROUTES } from '@/routes/appRoutes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Divider } from '../Divider';
import { MenuHeader } from './components/MenuHeader';
import { MenuItem } from './components/MenuItem';

export type MenuItemsProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const SideMenu = () => {
  const route = useRouter()

  function handleLogout() {
    route.push('/auth')
  }

  const menuItems = [
    {
      icon: <FiHome />,
      label: 'Home',
      href: APP_ROUTES.private.home,
    },
    {
      icon: <TbCalendarEvent />,
      label: 'Eventos',
      href: APP_ROUTES.private.events,
    }
  ]

  return (
    <aside className="flex w-[22.5%] py-6 px-4 flex-col items-start h-screen bg-white">

      <MenuHeader />

      <Divider />

      <div className='flex flex-col gap-1 w-full rounded-lg bg-[--background-dark] p-3 mb-4'>
        <div className='flex items-center gap-2 '>
          <FiAlertCircle color='var(--warning)' />
          <span className='text-[14px] text-[--primary]'>Cadastro não finalizado</span>
        </div>
        <p className='flex flex-wrap font-normal text-[12px] text-[--text-light]'>Lorem impsun Lorem impsun Lorem impsun Lorem impsun Lorem impsun Lorem impsun Lorem impsun.</p>
        <Link href={APP_ROUTES.private.profile} className='flex justify-end mt-1 text-[14px] text-[--primary]'>Finalizar cadastro</Link>
      </div>

      <MenuItem menuItems={menuItems} />

      <section className='mt-auto'>
        <button className='flex items-center gap-2 pl-2' onClick={handleLogout}>
          <FiLogOut />
          Sair
        </button>
      </section>
    </aside>
  )
}

export { SideMenu };

