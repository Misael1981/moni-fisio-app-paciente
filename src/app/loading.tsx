import Image from "next/image"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#ebe5cc] p-6 select-none">
      {/* Container Centralizado */}
      <div className="animate-fade-in flex max-w-xs flex-col items-center text-center">
        {/* Logo da Moni Fisio com Animação Suave de Respiração/Pulsar */}
        <div className="relative mb-6 flex h-28 w-28 animate-pulse items-center justify-center rounded-3xl border border-[#1b3d54]/10 bg-white/40 p-4 shadow-sm">
          <Image
            src="/logo.svg"
            alt="Logo Moni Fisio"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>

        {/* Título da Aplicação */}
        <h1 className="mb-2 text-xl font-bold tracking-tight text-[#1b3d54]">
          Moni Fisio
        </h1>

        {/* Frase Acolhedora */}
        <p className="mb-8 text-sm leading-relaxed font-medium text-[#1b3d54]/80">
          Preparando o seu espaço de cuidado...
        </p>

        {/* Spinner/Indicador de Carregamento Elegante */}
        <div className="flex items-center space-x-2">
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#1b3d54] [animation-delay:-0.3s]"></div>
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#1b3d54] [animation-delay:-0.15s]"></div>
          <div className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#1b3d54]"></div>
        </div>
      </div>

      {/* Rodapé sutil com a especialidade */}
      <div className="absolute bottom-8 text-center">
        <p className="text-xs font-semibold tracking-wider text-[#1b3d54]/50 uppercase">
          Fisioterapia Especializada em Reabilitação de Face, Cabeça e Pescoço
        </p>
      </div>
    </div>
  )
}
