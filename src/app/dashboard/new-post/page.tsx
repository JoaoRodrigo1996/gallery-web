'use client'

import { Header } from '@/components/header'
import { api } from '@/lib/axios'
import { ArrowLeft, ImageIcon, Loader, UploadCloud } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useId, useMemo, useState } from 'react'

export default function NewPost() {
  const id = useId()
  const [files, setFiles] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  function onFilesSelected(files: File[], multiple = true) {
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
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)

    const fileUpload = formData.get('pictureUrl')

    let pictureUrl = ''

    if (fileUpload) {
      const uploadFormData = new FormData()
      uploadFormData.set('file', fileUpload)

      const uploadResponse = await api.post('/upload', uploadFormData)

      pictureUrl = uploadResponse.data.fileUrl
    }

    await api.post('/pictures', { pictureUrl })

    setIsLoading(false)

    router.push('/dashboard')
  }

  return (
    <div className="flex flex-col scroll-smooth ">
      <Header />
      <main className="container mx-auto mt-6 animate-fadeDown space-y-4 px-4 pb-8">
        <Link
          href="/dashboard"
          className="group flex items-center justify-start gap-2"
        >
          <ArrowLeft className="h-4 w-4 text-zinc-600 transition-colors group-hover:text-zinc-900" />
          <span className="text-sm text-zinc-600 transition-colors group-hover:text-zinc-900">
            voltar
          </span>
        </Link>

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-center">
          <div className="flex h-[395px] w-full flex-col items-center justify-center overflow-hidden rounded-md border border-zinc-200">
            {previewURL === null ? (
              <div className="flex flex-col items-center justify-center gap-3">
                <ImageIcon className="h-5 w-5 text-zinc-600" />
                <span className="text-xs font-medium text-zinc-700">
                  Select an image to see the preview
                </span>
              </div>
            ) : (
              <img
                className="aspect-auto w-full rounded-md object-cover"
                src={previewURL}
                alt="image preview"
              />
            )}
          </div>

          <form
            className="flex w-full flex-col gap-3"
            onSubmit={handleCreatePicture}
          >
            <fieldset>
              <label
                className="group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-md border-2 border-zinc-200 p-8 shadow-sm outline-none transition-colors hover:border-emerald-500"
                htmlFor={id}
              >
                <div className="border-6 rounded-full border-zinc-50 bg-zinc-100 p-2 transition-colors group-hover:border-violet-50 group-hover:bg-violet-100">
                  <UploadCloud className="h-6 w-6 text-zinc-600 transition-colors group-hover:text-emerald-600" />
                </div>
                <div className="flex flex-col items-center gap-1">
                  <span className="text-sm">
                    <span className="font-semibold tracking-wider text-emerald-600">
                      Click to upload
                    </span>{' '}
                    or drag and drop
                  </span>
                  <span className="text-xs">
                    SVG, PNG, JPG or GIF (max. 800x400px)
                  </span>
                </div>
              </label>
              <input
                className="sr-only"
                type="file"
                id={id}
                name="pictureUrl"
                onChange={handleFileSelected}
                multiple
              />
            </fieldset>
            <fieldset>
              <textarea
                className="h-[164px] w-full resize-none rounded-md border-2 border-zinc-200 px-2 py-1 text-sm shadow-sm placeholder:text-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring focus:ring-emerald-300"
                name="description"
                id="description"
                placeholder="Add a description for your picture..."
              />
            </fieldset>
            <button
              disabled={isLoading}
              className="flex items-center justify-center rounded-md bg-emerald-500 px-4 py-2 text-sm font-medium text-zinc-100 disabled:cursor-not-allowed disabled:opacity-80"
            >
              {isLoading ? (
                <Loader className="h-4 w-4 animate-spin text-zinc-900" />
              ) : (
                <span className="">Add</span>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
