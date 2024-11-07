import Image from "next/image";
import { LogInIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const { userId } = await auth();

  if (userId) redirect("/");

  return (
    <main className="flex h-full flex-col-reverse sm:grid sm:grid-cols-2">
      <div className="mx-auto my-8 flex h-full max-w-[550px] flex-1 flex-col justify-center px-8 sm:my-0">
        <Image
          src="/logo.svg"
          alt="Finance AI"
          width={173}
          height={39}
          className="mb-8"
        />
        <h1 className="mb-3 text-4xl font-bold">Bem-vindo</h1>
        <p className="mb-8 text-muted-foreground">
          A Finance AI é uma plataforma de gestão financeira que utiliza IA para
          monitorar suas movimentações, e oferecer insights personalizados,
          facilitando o controle do seu orçamento.
        </p>
        <SignInButton>
          <Button variant="outline">
            <LogInIcon className="mr-2" />
            Fazer login ou criar conta
          </Button>
        </SignInButton>
      </div>
      <div className="relative h-full max-h-[400px] w-full sm:max-h-full">
        <Image
          src="/login_bg.png"
          alt="Faça login"
          fill
          className="object-cover"
        />
      </div>
    </main>
  );
};

export default LoginPage;
