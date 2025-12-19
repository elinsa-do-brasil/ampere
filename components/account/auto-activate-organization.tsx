"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { persistActiveOrganization } from "@/lib/account-actions/persist-active-organization";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

interface AutoActivateOrganizationProps {
  organizationId: string;
}

export function AutoActivateOrganization({ organizationId }: AutoActivateOrganizationProps) {
  const router = useRouter();
  const attemptedRef = useRef(false);

  useEffect(() => {
    if (attemptedRef.current) return;
    attemptedRef.current = true;

    const activate = async () => {
      try {
        await authClient.organization.setActive({ organizationId });
        const persisted = await persistActiveOrganization(organizationId);
        
        if (!persisted.ok) {
           console.error("Failed to persist organization:", persisted.reason);
           // Optional: Show error toast? For now, we might just want to silently fail or retry logic
           // but since this is "Auto Activate", valid active org is key.
        }
        
        router.refresh();
      } catch (error) {
        console.error("Auto activation failed", error);
        toast.error("Não foi possível ativar sua organização automaticamente.");
      }
    };

    void activate();
  }, [organizationId, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Spinner className="size-8" />
    </div>
  );
}
