import { ImageOff } from 'lucide-react'

export function Emptylist() {
  return (
    <div className="mt-36 flex flex-col items-center justify-center">
      <ImageOff className="mb-2 h-20 w-20 text-zinc-700" />
      <h4 className="text-center text-sm font-semibold leading-relaxed text-zinc-900">
        Você ainda não pussui nenhuma foto.
        <br /> Comece a guardar suas memórias
      </h4>
    </div>
  )
}
