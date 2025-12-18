// componentes:
import {
  CardContent
} from "@/app/(conta)/components/card-content";

import {
  MicrosoftOauthButton,
} from "@/components/auth/buttons/oauth-buttons";
import { LoginForm } from "@/components/auth/forms/login";
import { Or } from "@/components/auth/or";
import { AmperCardHeader } from "../components/card-header";
import { CardFooter } from "../components/card-footer";

export default function Page() {
  return (
    <>
      <AmperCardHeader login />
      <CardContent>
        <LoginForm />
        <Or texto="ou" />
        <MicrosoftOauthButton />
        <p className="text-center text-muted-foreground text-xs max-w-[80%] mx-auto">O login com a Microsoft só está disponível para funcionários da Amper Elinsa.</p>
      </CardContent>
      <CardFooter login />
    </>
  );
}
