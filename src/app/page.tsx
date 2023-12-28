'use client'

import { LogInForm } from '@/components/log-in-form'

import { RegisterForm } from '@/components/register-form'
import * as Tabs from '@radix-ui/react-tabs'

export default function Home() {
  return (
    <div className="relative flex h-screen animate-fade items-center justify-center gap-8 overflow-hidden">
      <section className=" hidden sm:flex sm:max-w-lg sm:flex-1 sm:animate-fadeDown sm:flex-col sm:justify-center sm:space-y-6 sm:p-8">
        <h2 className="flex items-center gap-3 text-4xl font-bold text-zinc-900 ">
          Gallery of Dreams
        </h2>
        <p className="text-xl leading-relaxed text-zinc-600">
          Welcome to Gallery, where your images become a sanctuary of memories.
          This is your personal haven to upload, organize, and share your
          cherished moments.
        </p>
      </section>

      <Tabs.Root
        className="flex h-[536px] max-w-lg flex-1 animate-fadeDown flex-col justify-center p-8"
        defaultValue="login"
      >
        <Tabs.List className="flex shrink-0 items-center justify-around border-b border-zinc-400">
          <Tabs.Trigger
            className=" flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center bg-white px-5 text-[15px] font-medium leading-none text-zinc-400 outline-none transition-colors hover:text-zinc-900 data-[state=active]:text-zinc-900  data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black data-[state=active]:focus:outline-none"
            value="login"
          >
            Log in
          </Tabs.Trigger>
          <Tabs.Trigger
            className="flex h-[45px] flex-1  cursor-pointer select-none items-center justify-center bg-white px-5 text-[15px] font-medium leading-none text-zinc-400 outline-none transition-colors hover:text-zinc-900 data-[state=active]:text-zinc-900  data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current data-[state=active]:focus:relative data-[state=active]:focus:shadow-[0_0_0_2px] data-[state=active]:focus:shadow-black"
            value="register"
          >
            Register
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content className="grow animate-fade p-5" value="login">
          <LogInForm />
        </Tabs.Content>

        <Tabs.Content className="grow animate-fade p-5" value="register">
          <RegisterForm />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}
