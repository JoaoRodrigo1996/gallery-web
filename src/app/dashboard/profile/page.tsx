'use client'

import * as Avatar from '@radix-ui/react-avatar'

import { Header } from '@/components/header'
import { ArrowLeft, User } from 'lucide-react'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import { ChangeEvent, FormEvent, useId, useMemo, useState } from 'react'

export default function Profile() {
  const id = useId()
  const [files, setFiles] = useState<File[]>([])

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api.get('http://localhost:5000/me'),
  })

  function onFilesSelected(files: File[], multiple = false) {
    if (multiple) {
      setFiles((state) => [...state, ...files])
    } else {
      setFiles(files)
    }
  }

  const previewURL = useMemo(() => {
    if (files.length === 0) {
      return null
    }

    return URL.createObjectURL(files[0])
  }, [files])

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length) {
      return
    }

    const files = Array.from(event.target.files)

    onFilesSelected(files)
  }

  async function handleCreatePicture(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const fileUpload = formData.get('avatarUrl')

    let avatarUrl = ''

    if (fileUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      avatarUrl = uploadResponse.data.fileUrl
    }

    await api.put('/avatarUrl', { avatarUrl })
  }

  return (
    <div className="">
      <Header />

      <main className="container mx-auto mt-6 animate-fadeDown space-y-4  px-4 pb-8">
        <Link
          href="/dashboard"
          className="group flex items-center justify-start gap-2"
        >
          <ArrowLeft className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-zinc-900" />
          <span className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-900">
            voltar
          </span>
        </Link>

        <form
          className="mx-auto flex max-w-sm flex-col items-center justify-center space-y-6"
          onSubmit={handleCreatePicture}
        >
          <Avatar.Root className="inline-flex h-32 w-32 select-none items-center justify-center rounded-full align-middle ">
            {previewURL === null ? (
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={profile?.data.user.avatarUrl}
                alt="Profile image"
              />
            ) : (
              <Avatar.Image
                className="h-full w-full rounded-[inherit] object-cover"
                src={previewURL}
                alt="Profile image"
              />
            )}
            <Avatar.Fallback className="relative h-32 w-32 rounded-full bg-zinc-200">
              <User className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2" />
            </Avatar.Fallback>
          </Avatar.Root>

          <label
            htmlFor={id}
            className="mt-4 text-zinc-600 transition-colors hover:cursor-pointer hover:text-zinc-900"
          >
            Change avatar
          </label>
          <input
            type="file"
            id={id}
            className="sr-only"
            name="avatarUrl"
            onChange={handleFileSelected}
          />
          <fieldset className="flex w-full flex-col space-y-2">
            <label className="text-sm font-medium" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="rounded border border-zinc-200 bg-zinc-100 px-4 py-2 transition-colors ease-linear focus:border-emerald-500 focus:outline-none focus:ring focus:ring-emerald-300 "
              defaultValue={profile?.data.user.name}
            />
          </fieldset>
          <fieldset className=" flex w-full flex-col space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              E-mail
            </label>
            <input
              type="text"
              id="email"
              className="rounded border border-zinc-200 bg-zinc-100 px-4 py-2 transition-colors ease-linear focus:border-emerald-500 focus:outline-none focus:ring focus:ring-emerald-300 "
              defaultValue={profile?.data.user.email}
            />
          </fieldset>
          <div className="flex w-full items-center justify-end  gap-3">
            <button className="flex items-center justify-center rounded bg-zinc-50 px-4 py-2 font-medium text-zinc-900 shadow-sm transition-colors ease-linear hover:bg-zinc-300 focus:outline-none focus:ring focus:ring-emerald-300 active:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
              Cancel
            </button>
            <button className="flex items-center justify-center rounded bg-emerald-500 px-4 py-2 font-medium text-zinc-100 shadow-sm transition-colors ease-linear hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-300 active:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50">
              Save
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}
