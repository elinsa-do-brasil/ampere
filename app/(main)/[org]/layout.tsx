import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";

/**
 * Layout para rotas dentro de uma organização.
 *
 * IMPORTANTE (Next.js 15):
 * - `params` agora é uma Promise e precisa ser aguardado com `await`
 * - O nome da propriedade dentro de params deve corresponder ao nome da pasta dinâmica:
 *   pasta `[org]` → propriedade `org` (não `orgSlug`)
 * - Usamos desestruturação com renomeação `{ org: orgSlug }` para manter
 *   a variável `orgSlug` no restante do código
 *
 * @see https://nextjs.org/docs/app/building-your-application/upgrading/version-15#async-request-apis-breaking-change
 */
export default async function OrgLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  // Next.js 15: params é uma Promise, não mais um objeto síncrono
  params: Promise<{ org: string }>;
}) {
  // Aguarda os params e extrai 'org', renomeando para 'orgSlug'
  const { org: orgSlug } = await params;
  const h = await headers();

  // há sessão?
  const session = await auth.api.getSession({ headers: h });
  if (!session) redirect("/entrar");

  // é membro dessa org?
  const orgs = await auth.api.listOrganizations({
    headers: h, // precisa dos cookies da sessão
  }); // lista só as orgs do usuário :contentReference[oaicite:0]{index=0}

  const org = orgs?.find((o) => o.slug === orgSlug);
  if (!org) notFound(); // ou redirect("/no-access")

  return <>{children}</>;
}
