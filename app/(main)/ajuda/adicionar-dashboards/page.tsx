import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import {
  ArrowLeft,
  LayoutDashboard,
  Plus,
  Link as LinkIcon,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export const metadata = {
  title: "Como adicionar dashboards",
};

type Step = {
  number: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  details?: string[];
};

const steps: Step[] = [
  {
    number: 1,
    title: "Acesse a página de Dashboards",
    description:
      "Navegue até a página de dashboards da sua organização através do menu principal.",
    icon: <LayoutDashboard className="h-5 w-5" />,
    details: [
      "Certifique-se de estar logado com sua conta Microsoft",
      "Selecione a organização desejada no menu de organizações",
      'Clique em "Dashboards" no menu lateral ou de navegação',
    ],
  },
  {
    number: 2,
    title: 'Clique em "Novo Dashboard"',
    description:
      "No canto superior direito da página, clique no botão para adicionar um novo dashboard.",
    icon: <Plus className="h-5 w-5" />,
    details: [
      "O botão só aparece para usuários com permissão de Admin ou Owner",
      "Um modal será aberto com o formulário de criação",
    ],
  },
  {
    number: 3,
    title: "Preencha o nome do dashboard",
    description:
      "Dê um nome descritivo ao seu dashboard para fácil identificação.",
    icon: <FileText className="h-5 w-5" />,
    details: [
      'Exemplo: "Inventário de TI", "Vendas Q4 2024", "KPIs Operacionais"',
      "O nome aparecerá nos cards de dashboard para todos os usuários",
    ],
  },
  {
    number: 4,
    title: "Cole a URL do iframe do Power BI",
    description:
      "Obtenha o link de embed do seu relatório Power BI e cole no campo correspondente.",
    icon: <LinkIcon className="h-5 w-5" />,
    details: [
      'No Power BI, clique em "Arquivo" > "Inserir relatório" > "Site ou portal"',
      "Copie apenas a URL do iframe (começa com https://app.powerbi.com/)",
      "A URL deve ser a versão de embed, não o link direto do relatório",
    ],
  },
  {
    number: 5,
    title: "Configure as permissões",
    description:
      "Escolha qual role mínima é necessária para visualizar o dashboard.",
    icon: <ShieldCheck className="h-5 w-5" />,
    details: [
      "Member: todos os membros da organização podem ver",
      "Admin: apenas administradores e owners podem ver",
      "Owner: somente owners da organização têm acesso",
    ],
  },
  {
    number: 6,
    title: "Salve o dashboard",
    description:
      'Clique em "Criar Dashboard" para finalizar. O dashboard aparecerá imediatamente na lista.',
    icon: <CheckCircle2 className="h-5 w-5" />,
  },
];

const StepCard = ({ number, title, description, icon, details }: Step) => {
  return (
    <Card className="border-border/70 bg-card/80 backdrop-blur">
      <CardHeader className="flex flex-row items-start gap-4 pb-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
          {number}
        </div>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-primary">{icon}</span>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <CardDescription className="text-sm">{description}</CardDescription>
        </div>
      </CardHeader>
      {details && details.length > 0 && (
        <CardContent className="pt-0">
          <ul className="ml-14 space-y-1">
            {details.map((detail, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                {detail}
              </li>
            ))}
          </ul>
        </CardContent>
      )}
    </Card>
  );
};

export default function Page() {
  return (
    <div className="space-y-8">
      {/* Header Card */}
      <Card className="relative overflow-hidden border border-border bg-gradient-to-br from-primary/5 via-background to-accent/20 p-8 shadow-lg">
        <div
          className="absolute inset-x-10 -top-10 h-32 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div className="relative space-y-3">
          <Button asChild variant="ghost" size="sm" className="-ml-2 mb-2">
            <Link href="/ajuda">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Voltar para Central de Ajuda
            </Link>
          </Button>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3 text-primary">
              <LayoutDashboard className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Tutorial
              </p>
              <CardTitle className="text-2xl font-semibold">
                Como adicionar dashboards
              </CardTitle>
            </div>
          </div>
          <CardDescription className="max-w-3xl text-sm">
            Aprenda a adicionar e configurar dashboards Power BI para sua
            organização no Ampere. Siga os passos abaixo para começar.
          </CardDescription>
        </div>
      </Card>

      {/* Prerequisites */}
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardHeader className="flex flex-row items-center gap-3 pb-3">
          <AlertCircle className="h-5 w-5 text-amber-500" />
          <div>
            <CardTitle className="text-base">Pré-requisitos</CardTitle>
            <CardDescription className="text-sm">
              Antes de começar, certifique-se de que:
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="ml-8 space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className="px-2 py-0.5">
                Admin
              </Badge>
              <span className="text-muted-foreground">ou</span>
              <Badge variant="outline" className="px-2 py-0.5">
                Owner
              </Badge>
              <span className="text-muted-foreground">
                da organização onde deseja adicionar o dashboard
              </span>
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Acesso ao relatório no Power BI Service (app.powerbi.com)
            </li>
            <li className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-green-500" />
              Permissão para gerar links de embed no Power BI
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Steps */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Passo a passo</h2>
          <p className="text-sm text-muted-foreground">
            Siga as etapas abaixo para adicionar um novo dashboard.
          </p>
        </div>
        <div className="space-y-4">
          {steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </div>
      </section>

      <Separator />

      {/* Tips Section */}
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">Dicas úteis</h2>
          <p className="text-sm text-muted-foreground">
            Informações adicionais para aproveitar ao máximo os dashboards.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Onde encontrar a URL do iframe?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                No Power BI Service, abra seu relatório e vá em{" "}
                <strong>Arquivo → Inserir relatório → Site ou portal</strong>.
                Copie a URL que começa com{" "}
                <code className="rounded bg-muted px-1">
                  https://app.powerbi.com/reportEmbed
                </code>
                .
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Hierarquia de permissões
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                As roles seguem uma hierarquia:{" "}
                <strong>Owner &gt; Admin &gt; Member</strong>. Isso significa
                que um Owner tem acesso a todos os dashboards, mesmo aqueles
                configurados apenas para Admins.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Editando dashboards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Após criar um dashboard, você pode editá-lo a qualquer momento
                clicando no menu de ações (três pontos) ao lado do dashboard na
                lista.
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-card/80 backdrop-blur">
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Problemas de visualização?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Se o dashboard não carregar, verifique se a URL está correta e
                se você tem permissão de visualização no Power BI. Dashboards
                privados podem precisar de autenticação adicional.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
