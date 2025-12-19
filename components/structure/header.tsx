// componentes:
import { Logo } from "@/components/structure/logo";

// ícones:
import { ThemeToggle } from "../ui/theme-toggle";
import { Account } from "@/components/account/account";


export function Header() {
  return (
    <>
      {/* Espaçador para compensar o header fixed */}
      <div className="h-14" />
      <header className="fixed h-14 min-w-dvw max-w-dvw top-0 left-0 flex justify-center items-center bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60 border-b border-border z-50">
        <nav className="container flex items-center justify-between">
          <Logo />

          <div className="flex items-center gap-2">
            <Account />
            <ThemeToggle />
          </div>
        </nav>
      </header>
    </>
  );
}
