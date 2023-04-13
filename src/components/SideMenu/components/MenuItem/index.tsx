import Link from 'next/link';
import { MenuItemsProps } from '../..';

type MenuItemParams = {
  menuItems: MenuItemsProps[];
}

const MenuItem = ({ menuItems }: MenuItemParams) => {

  return (
    <section className='w-full'>
      <span className='text-[--primary] text-[12px] ml-1 mb-4'>MENU</span>
      <ul className='flex flex-col gap-1'>
        {menuItems.map((item) => (
          <Link key={item.href} href={item.href} className='w-full rounded-lg hover:bg-[--background] p-2'>
            <li className='flex items-center gap-2 text-[--text-light] hover:text-[--text]'>
              {item.icon}
              <span className='text-[15px]'>{item.label}</span>
            </li>
          </Link>
        ))}
      </ul>
    </section>
  )
}

export { MenuItem };
