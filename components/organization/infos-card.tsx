import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { ChartNoAxesColumnIncreasing, Users, LayoutDashboard, Calendar } from "lucide-react";
import { Member } from "@/prisma/client/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface InfosCardProps {
  organization: {
    name: string;
    slug: string;
    logo?: string | null;
    createdAt: Date;
    members: Member[];
    _count: {
      dashboards: number;
      invitations: number;
    };
  };
}

function StatsItem({ label, value, icon: Icon }: { label: string; value: number; icon: any }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-muted/50 border border-transparent hover:border-border transition-colors gap-y-3 aspect-square">
      <Icon className="size-4 text-muted-foreground" />
      <span className="text-2xl font-bold tabular-nums leading-none">{value}</span>
      <span className="text-xs uppercase text-muted-foreground font-semibold tracking-wider text-center">{label}</span>
    </div>
  );
}

export function InfosCard({ organization }: InfosCardProps) {
  const formattedDate = new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(organization.createdAt));

  return (
    <Card className="shadow-md border-border/50">
      <CardHeader className="space-y-4 pb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 rounded-xl border-2 border-muted shadow-sm">
            <AvatarImage src={organization.logo || ""} alt={organization.name} className="object-cover" />
            <AvatarFallback className="rounded-xl bg-primary/10 text-primary font-bold text-xl">
              {organization.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0.5">
            <CardTitle className="text-2xl font-extrabold tracking-tight text-foreground line-clamp-1">
              {organization.name}
            </CardTitle>
            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-muted rounded-md w-fit">
              <span className="text-sm font-bold text-muted-foreground">@</span>
              <span className="text-sm font-semibold text-muted-foreground">
                {organization.slug}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-3">
          <StatsItem
            label={organization.members.length === 1 ? "Membro" : "Membros"}
            value={organization.members.length}
            icon={Users}
          />
          <StatsItem
            label={organization._count.dashboards === 1 ? "Dashboard" : "Dashboards"}
            value={organization._count.dashboards}
            icon={LayoutDashboard}
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2.5 px-1">
            <div className="p-1.5 rounded-md bg-primary/5">
              <Calendar className="h-4 w-4 text-primary/70" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase text-muted-foreground font-bold tracking-wider">Organização criada em</span>
              <span className="text-sm font-medium text-foreground">{formattedDate}</span>
            </div>
          </div>

          <Separator className="bg-border/60" />

          <Button asChild>
            <Link href="/dashboards">
              <ChartNoAxesColumnIncreasing />
              <span className="font-semibold">Gerenciar dashboards</span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}