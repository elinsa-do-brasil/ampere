// better-auth
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins"
import { ac, owner, admin, member } from "@/auth/permissions"

// adaptadores do de conexão do banco de dados:
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "@/lib/db";
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  socialProviders: {
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
      tenantId: process.env.MICROSOFT_TENANT_ID as string, // restrige o login para usuários da empresa dona do tenant
      authority: "https://login.microsoftonline.com",
      prompt: "select_account", // força a seleção de uma conta
    },
  },
  plugins: [
    organization({
      ac,
      roles: {
        owner,
        admin,
        member
      }
    }),
    nextCookies()
  ]
});