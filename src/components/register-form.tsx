import { api } from '@/lib/axios'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const registerUserBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

type RegisterUserBodySchemaType = z.infer<typeof registerUserBodySchema>

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterUserBodySchemaType>({
    resolver: zodResolver(registerUserBodySchema),
  })

  async function handleRegisterNewUser({
    name,
    email,
    password,
  }: RegisterUserBodySchemaType) {
    try {
      await api.post('/users', { name, email, password })
    } catch (error) {
      alert('This e-mail aready exists.')
    }
  }

  return (
    <section className="">
      <h2 className="mb-4 text-4xl font-medium text-zinc-900">
        Create an account
      </h2>
      <form
        className="space-y-6"
        onSubmit={handleSubmit(handleRegisterNewUser)}
      >
        <fieldset className="flex flex-col space-y-2">
          <label className="text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="rounded border border-zinc-200 bg-zinc-100 px-4 py-2 transition-colors ease-linear focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-300 "
            placeholder="John doe"
            {...register('name')}
          />
        </fieldset>
        <fieldset className="flex flex-col space-y-2">
          <label className="text-sm font-medium" htmlFor="email">
            E-mail
          </label>
          <input
            type="text"
            id="email"
            className="rounded border border-zinc-200 bg-zinc-100 px-4 py-2 transition-colors ease-linear focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-300 "
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
            className="rounded border border-zinc-200 bg-zinc-100 px-4 py-2 transition-colors ease-linear focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-300 "
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
