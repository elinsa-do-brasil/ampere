import { MoveRightIcon } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex main-container w-full items-center justify-center gap-4">
      <h1 className="text-5xl font-mono border-r border-black dark:border-white pr-4">404</h1>
      <div>
        <p>Hum... Não temos esta página.</p>
        {/* Utiliza a tag <a> para forçar o recarregamento da página e garantir a troca correta de layout ao sair da página 404. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/"
          className="underline flex items-center gap-2"
        >
          <p>Voltar à página inicial</p>
          <MoveRightIcon size={18} />
        </a>
      </div>
    </main>
  );
};