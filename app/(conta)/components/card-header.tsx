// componentes:
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// arquivos:
import Logo from "@/public/logo.png";

interface RaauthCardHeaderProps {
  login?:  boolean;
}

// TODO: Após o primeiro deploy, substituir a importação de Logo por uma importação via CDN da Vercel, apontando o link para o arquivo logo.png que estará no domínio do projeto.

export function AmperCardHeader({ login = false }: RaauthCardHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="flex justify-center items-center">
        <Link href="/">
          <Image src={Logo} alt="Logo" width={60} height={60} />
        </Link>
      </CardTitle>
      <CardDescription className="text-center">
        { login 
          ? "Bem-vindo(a) de volta. Entre para continuar." 
          : "Crie uma conta para começar." }
      </CardDescription>
    </CardHeader>
  );
};
