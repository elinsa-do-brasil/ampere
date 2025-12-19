import { getServerSession } from "@/auth/actions/session";
import { getAllDashboardsByOrganization } from "@/auth/actions/dashboards";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { DashboardsManagement } from "./dashboards-management";

export default async function DashboardsAdminPage() {
  const session = await getServerSession();

  // Se não há organização ativa, redireciona para home
  if (!session?.session?.activeOrganizationId) {
    notFound()
  }

  // Verifica se o usuário é admin ou owner
  const member = await db.member.findFirst({
    where: {
      userId: session.user.id,
      organizationId: session.session.activeOrganizationId,
    },
  });

  const userRole = member?.role || "member";

  // Só admin e owner podem acessar
  if (userRole !== "admin" && userRole !== "owner") {
    notFound()
  }

  // Busca todos os dashboards da organização
  const dashboards = await getAllDashboardsByOrganization(
    session.session.activeOrganizationId
  );

  // Busca o nome da organização
  const organization = await db.organization.findUnique({
    where: { id: session.session.activeOrganizationId },
    select: { name: true },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="scroll-m-20 text-2xl font-semibold tracking-tight">Gerenciar dashboards</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie os dashboards Power BI de {organization?.name || "sua organização"}
        </p>
      </div>

      <DashboardsManagement
        dashboards={dashboards}
        organizationId={session.session.activeOrganizationId}
      />
    </div>
  );
}
