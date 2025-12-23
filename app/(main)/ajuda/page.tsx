import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Building2,
  HelpCircle,
  ChevronRight,
} from "lucide-react";

type HelpCategory = {
  slug: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const helpCategories: HelpCategory[] = [
  {
    slug: "adicionar-dashboards",
    title: "Como adicionar dashboards",
    description:
      "Aprenda a adicionar e configurar dashboards Power BI para sua organização.",
    icon: <LayoutDashboard className="h-6 w-6" />,
  },
  {
    slug: "gerenciar-organizacoes",
    title: "Gerenciando organizações",
    description:
      "Saiba como criar, editar e administrar organizações no Ampere.",
    icon: <Building2 className="h-6 w-6" />,
  },
  {
    slug: "permissoes-roles",
    title: "Permissões e roles",
    description:
      "Entenda o sistema de permissões: Member, Admin e Owner.",
    icon: <ShieldCheck className="h-6 w-6" />,
  },
  {
    slug: "gerenciar-membros",
    title: "Gerenciando membros",
    description:
      "Adicione, remova e altere permissões dos membros da sua organização.",
    icon: <Users className="h-6 w-6" />,
  },
];

const HelpCategoryCard = ({ slug, title, description, icon }: HelpCategory) => {
  return (
    <Card className="group border-border/70 bg-card/80 backdrop-blur transition-all hover:border-primary/50 hover:shadow-md">
      <Link href={`/ajuda/${slug}`} className="block h-full">
        <CardHeader className="flex flex-row items-start gap-4 pb-3">
          <div className="rounded-lg bg-primary/10 p-3 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
            {icon}
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-lg group-hover:text-primary">
              {title}
            </CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </CardHeader>
      </Link>
    </Card>
  );
};

export const metadata = {
  title: "Central de ajuda",
};

export default function Page() {
  return (
    <div className="space-y-12">
      {/* Header Card */}
      <Card className="relative overflow-hidden border border-border bg-gradient-to-br from-primary/5 via-background to-accent/20 p-8 shadow-lg">
        <div
          className="absolute inset-x-10 -top-10 h-32 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div className="relative space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Suporte
          </p>
          <CardTitle className="text-3xl font-semibold">
            Central de ajuda
          </CardTitle>
          <CardDescription className="max-w-3xl text-sm">
            Encontre respostas para as perguntas mais frequentes sobre o Ampere.
            Selecione uma categoria abaixo para acessar tutoriais e guias
            detalhados.
          </CardDescription>
          <div className="flex flex-wrap gap-3 text-xs">
            <Button asChild size="sm" variant="outline">
              <Link href="/licencas">
                <HelpCircle className="mr-1 h-4 w-4" />
                Licenças de código aberto
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      {/* Help Categories Grid */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Categorias de ajuda</h2>
          <p className="text-sm text-muted-foreground">
            Escolha um tópico para ver tutoriais e informações detalhadas.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {helpCategories.map((category) => (
            <HelpCategoryCard key={category.slug} {...category} />
          ))}
        </div>
      </section>

      {/* Quick FAQ Section */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Perguntas frequentes</h2>
          <p className="text-sm text-muted-foreground">
            Respostas rápidas para dúvidas comuns.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                O que é o Ampere?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                O Ampere é uma plataforma para hospedar e gerenciar dashboards
                Power BI de forma organizada, com controle de acesso por
                organizações e roles.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Preciso de uma conta Microsoft?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sim! O login no Ampere é feito através da sua conta Microsoft
                corporativa (Azure AD/Entra ID).
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Como entro em uma organização?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Um administrador ou dono da organização precisa convidá-lo.
                Após o convite, você verá a organização disponível no seu menu.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
