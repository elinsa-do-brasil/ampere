
// componentes:
import {
  CardContent
} from "@/app/(conta)/components/card-content";
import { AmperCardHeader } from "@/app/(conta)/components/card-header";
import { RegisterForm } from "@/components/auth/forms/register";
import { CardFooter } from "@/app/(conta)/components/card-footer";

export default function Page() {
  return (
    <>
      <AmperCardHeader />
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter />
    </>
  );
}
