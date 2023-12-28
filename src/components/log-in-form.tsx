import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const sessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

type SessionBodySchemaType = z.infer<typeof sessionBodySchema>

export function LogInForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SessionBodySchemaType>({
    resolver: zodResolver(sessionBodySchema),
  })

  const router = useRouter()

  async function handleSignIn({ email, password }: SessionBodySchemaType) {
    try {
      await api.post('/sessions', { email, password })

      router.push('/dashboard')
    } catch (error) {
      alert('Email or password invalid!')
    }
  }

  return (
    <section className="">
      <h2 className="mb-4 text-4xl font-medium text-zinc-900">
        Enter your account
      </h2>
      <form className="space-y-6" onSubmit={handleSubmit(handleSignIn)}>
        <fieldset className="flex flex-col space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            E-mail
          </label>
          <input
            type="text"
            id="email"
            className="rounded border border-zinc-200 bg-zinc-100 px-4 py-2 transition-colors ease-linear focus:border-emerald-500 focus:outline-none focus:ring focus:ring-emerald-300 "
            placeholder="johndoe@example.com"
            {...register('email')}
          />
        </fieldset>
        <fieldset className="flex flex-col space-y-2">
          <label className="text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="rounded border border-zinc-200 bg-zinc-100 px-4 py-2 transition-colors ease-linear focus:border-emerald-500 focus:outline-none focus:ring focus:ring-emerald-300 "
            placeholder="***********"
            {...register('password')}
          />
        </fieldset>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded bg-emerald-500 py-3 font-medium text-zinc-100 shadow-sm transition-colors ease-linear hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-300 active:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin text-zinc-900" />
          ) : (
            <span className="">Create</span>
          )}
        </button>
      </form>
    </section>
  )
}
