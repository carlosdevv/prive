
import { BsThreeDotsVertical, FiX, RiUserSettingsLine } from '@/components/Icons';
import { APP_ROUTES } from '@/routes/appRoutes';
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';
import { HeaderItem } from './HeaderItem';

export type HeaderItemsProps = {
  icon: React.ReactNode;
  label: string;
  href: string;
}

const MenuHeader = () => {

  const headerItems = [
    {
      icon: <RiUserSettingsLine />,
      label: 'Perfil',
      href: APP_ROUTES.private.profile,
    },
  ]

  return (
    <section className="flex items-center gap-2 w-full">
      <Avatar.Root className="inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <Avatar.Image
          className="h-full w-full rounded-[inherit] object-cover"
          src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
          alt="Colm Tuite"
        />
      </Avatar.Root>

      <div className='flex flex-col items-start'>
        <span className="font-medium">Antonio Carlos</span>
        <span className="text-[13px] font-medium text-zinc-400">4treevos@gmail.com</span>
      </div>


      <Popover.Root>
        <Popover.Trigger asChild className='ml-auto'>
          <button
          >
            <BsThreeDotsVertical size={18} color='var(--background-dark)' />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            className="rounded p-4 w-56 bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
          >
            <div className="flex flex-col gap-2.5">
              <HeaderItem headerItems={headerItems} />
            </div>
            <Popover.Close
              className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-[--primary] absolute top-[5px] right-[5px] hover:bg-[--background] outline-none cursor-pointer"
              aria-label="Close"
            >
              <FiX />
            </Popover.Close>
            <Popover.Arrow className="fill-white" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </section>
  )
}

export { MenuHeader };
