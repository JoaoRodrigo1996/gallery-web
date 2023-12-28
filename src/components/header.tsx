'use client'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { LogOut, Plus, Settings, User } from 'lucide-react'
import * as Avatar from '@radix-ui/react-avatar'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

import { api } from '@/lib/axios'

type HeaderProps = {
  shownAddButton?: boolean
}

export function Header({ shownAddButton = false }: HeaderProps) {
  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get('http://localhost:5000/me'),
  })

  return (
    <header className="sticky top-0 flex animate-fade items-center justify-between bg-white/30 p-4 py-3 shadow-sm backdrop-blur-md ">
      <h1 className="text-3xl font-bold text-zinc-900">Gallery logo</h1>

      <div className="flex items-center gap-2 space-x-6">
        {shownAddButton && (
          <Link
            href="/dashboard/new-post"
            className="group flex items-center justify-center gap-3 rounded-md border-2 border-emerald-500 px-4 py-2 text-sm font-medium text-zinc-900 shadow-sm transition-colors ease-linear hover:border-emerald-600 hover:bg-emerald-50 hover:text-emerald-600 focus:outline-none focus:ring focus:ring-emerald-300 active:bg-emerald-700 "
          >
            <Plus className="h-4 w-4 text-zinc-900 transition-colors group-hover:text-emerald-600" />
            Add picture
          </Link>
        )}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar.Root className="inline-flex h-10 w-10 select-none items-center justify-center rounded-full align-middle">
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={data?.data.user.avatarUrl}
                alt="Profile image"
              />
              <Avatar.Fallback className="relative h-10 w-10 rounded-full bg-zinc-200">
                <User className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2" />
              </Avatar.Fallback>
            </Avatar.Root>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="min-w-[240px] space-y-2 rounded bg-zinc-100 p-[6px] shadow-sm ">
              <DropdownMenu.Item className="flex h-[25px] select-none items-center justify-between rounded-[3px] px-[5px] text-sm font-medium leading-none outline-none">
                {data?.data.user.name} <User className="h-4 w-4" />
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="m-[5px] h-[1px] bg-zinc-300" />
              <DropdownMenu.Item className=" flex h-[25px] cursor-pointer select-none items-center justify-between rounded-[3px] px-[5px] text-sm font-medium leading-none outline-none data-[highlighted]:bg-emerald-100 data-[highlighted]:text-emerald-500">
                <a href="/dashboard/profile">Profile</a>
                <Settings className="h-4 w-4" />
              </DropdownMenu.Item>
              <DropdownMenu.Item className="h-[25px] cursor-pointer select-none rounded-[3px] px-[5px] text-sm font-medium leading-none outline-none data-[highlighted]:bg-emerald-100 data-[highlighted]:text-emerald-500">
                <a
                  href="/api/auth/logout"
                  className="flex items-center justify-between"
                >
                  Sign out
                  <LogOut className="h-4 w-4" />
                </a>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </header>
  )
}
