'use client'

import { Emptylist } from '@/components/empty-list'
import { Header } from '@/components/header'
import { api } from '@/lib/axios'
import { useQuery } from '@tanstack/react-query'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import Image from 'next/image'

type Picture = {
  id: string
  userId: string
  pictureUrl: string
  createdAt: string
}

export default function Dashboard() {
  const { data } = useQuery({
    queryKey: ['pictures'],
    queryFn: () => api.get('http://localhost:5000/pictures'),
  })

  return (
    <div className="flex h-screen flex-col scroll-smooth">
      <Header shownAddButton />

      {data?.data.pictures.length === 0 && <Emptylist />}

      <main className="sm: container mx-auto mt-6 grid animate-fadeDown grid-cols-1 gap-2 p-4 pb-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.data.pictures.map((picture: Picture) => (
          <Dialog.Root key={picture.id}>
            <Dialog.Trigger asChild>
              <Image
                className="aspect-square rounded object-cover shadow-md transition-transform hover:cursor-zoom-in hover:brightness-110 "
                src={picture.pictureUrl}
                alt="cover"
                width={600}
                height={200}
                priority
              />
            </Dialog.Trigger>
            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-zinc-950/90 backdrop-blur-md" />
              <Dialog.Content className="fixed left-[50%] top-[50%] w-[820px] translate-x-[-50%] translate-y-[-50%] focus:outline-none">
                <Image
                  className="h-full w-full rounded object-cover"
                  src={picture.pictureUrl}
                  alt="cover"
                  width={1920}
                  height={1280}
                />
                <Dialog.Close
                  asChild
                  className="absolute right-[10px] top-[10px] items-center justify-center rounded-full hover:cursor-pointer focus:shadow-[0_0_0_2px]"
                >
                  <div className="bg-zinc-900/80 p-2 hover:brightness-90">
                    <X className="h-4 w-4 text-zinc-100" />
                  </div>
                </Dialog.Close>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
        ))}
      </main>
    </div>
  )
}
