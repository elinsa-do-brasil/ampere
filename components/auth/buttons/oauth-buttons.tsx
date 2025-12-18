"use client";

import { OAuthButtonBase } from "@/components/auth/buttons/oauth-button-base";

// ícones:
import { CgMicrosoft } from "react-icons/cg";

interface ProviderButtonProps {
  className?: string;
}

// cada botão desses só vai pro bundle se você importar ele em alguma página
export function MicrosoftOauthButton(props: ProviderButtonProps) {
  return (
    <OAuthButtonBase
      provider="microsoft"
      icon={CgMicrosoft}
      label="Entrar com Microsoft"
      {...props}
    />
  );
}
