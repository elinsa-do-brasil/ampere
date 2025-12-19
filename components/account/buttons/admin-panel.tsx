//bibliotecas, libs e funções:
import { authClient } from "@/lib/auth-client";

// componentes:
import Link from "next/link";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

// ícones:
import { ChartNoAxesColumnIncreasing, IdCardLanyard } from "lucide-react";

export function AdminPanel() {
  const { data: activeOrganization } = authClient.useActiveOrganization();
  const { data: session } = authClient.useSession();

  // Encontra o membro ativo na organização
  const activeMember = activeOrganization?.members.find(
    (member) => member.userId === session?.user?.id
  );

  const memberRole = activeMember?.role;

  // Só mostra o botão se houver organização ativa e o usuário for admin ou owner
  if (!activeOrganization || !memberRole || (memberRole !== "admin" && memberRole !== "owner")) {
    return null;
  }

  // TODO: Realoca os dashboards para dentro de uma rota com slug
  return (
    <>
    <DropdownMenuItem asChild>
      <Link href={`/org/${activeOrganization.slug}`}>
        <IdCardLanyard />
        Gerenciar Organização
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
      <Link href={`/dashboards`}>
        <ChartNoAxesColumnIncreasing />
        Gerenciar Dashboards
      </Link>
    </DropdownMenuItem>
    </>
  )
}