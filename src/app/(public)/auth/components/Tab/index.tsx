'use client'

import * as Tabs from '@radix-ui/react-tabs';
import { LoginTab } from './LoginTab';
import { RegisterTab } from './RegisterTab';

const TabContainer = () => {

  return (
    <Tabs.Root
      className="flex flex-col bg-white rounded-md shadow-[0_2px_8px] shadow-zinc-400"
      defaultValue="tab1"
    >
      <Tabs.List className="shrink-0 flex border-b border-mauve6" aria-label="Login">
        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-base font-light leading-none select-none first:rounded-tl-md last:rounded-tr-md hover:text-[--primary] data-[state=active]:text-[--primary] data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-[--primary] data-[state=active]:focus:relative outline-none cursor-default"
          value="tab1"
        >
          Login
        </Tabs.Trigger>

        <Tabs.Trigger
          className="bg-white px-5 h-[45px] flex-1 flex items-center justify-center text-base font-light leading-none select-none first:rounded-tl-md last:rounded-tr-md hover:text-[--primary] data-[state=active]:text-[--primary] data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-[--primary] data-[state=active]:focus:relative outline-none cursor-default"
          value="tab2"
        >
          Registrar
        </Tabs.Trigger>
      </Tabs.List>

      <LoginTab />
      <RegisterTab />

    </Tabs.Root>
  )
}

export { TabContainer };
