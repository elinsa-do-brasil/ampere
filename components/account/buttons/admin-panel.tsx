//bibliotecas, libs e funções:
import { authClient } from "@/lib/auth-client";

// componentes:
import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// ícones:
import { IdCardLanyard } from "lucide-react";

export function AdminPanel(){
  const { data: activeOrganization } = authClient.useActiveOrganization();
  return(
    // TODO: implementar checagem de roles
    <DropdownMenuItem asChild>
      <Link href={`/org/${activeOrganization?.slug}`}>
        <IdCardLanyard />
        Gerenciar Organização
      </Link>
    </DropdownMenuItem>
  )
}