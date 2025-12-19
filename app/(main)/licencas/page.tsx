import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type LicenseKey = "mit" | "apache-2" | "isc" | "bsd-2";

type ProjectCard = {
  project: string;
  license: LicenseKey;
  packages: string[];
};

type Section = {
  title: string;
  items: ProjectCard[];
};

const licenseMeta: Record<
  LicenseKey,
  { label: string; anchor: string; title: string; text: string }
> = {
  mit: {
    label: "MIT",
    anchor: "licenca-mit",
    title: "Licença MIT",
    text: `Copyright (c) The MIT Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`,
  },
  "apache-2": {
    label: "Apache-2.0",
    anchor: "licenca-apache-2",
    title: "Apache License 2.0",
    text: `Apache License
Version 2.0, January 2004
http://www.apache.org/licenses/

TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

1. Definitions.
"License" shall mean the terms and conditions for use, reproduction, and distribution as defined by Sections 1 through 9 of this document.
"Licensor" shall mean the copyright owner or entity authorized by the copyright owner that is granting the License.
"Legal Entity" shall mean the union of the acting entity and all other entities that control, are controlled by, or are under common control with that entity.
"You" (or "Your") shall mean an individual or Legal Entity exercising permissions granted by this License.
"Source" form shall mean the preferred form for making modifications, including but not limited to software source code, documentation source, and configuration files.
"Object" form shall mean any form resulting from mechanical transformation or translation of a Source form, including but not limited to compiled object code, generated documentation, and conversions to other media types.
"Work" shall mean the work of authorship made available under the License.
"Derivative Works" shall mean any work, whether in Source or Object form, that is based on (or derived from) the Work.
"Contribution" shall mean any work of authorship that is intentionally submitted to Licensor for inclusion in the Work.
"Contributor" shall mean Licensor and any individual or Legal Entity on behalf of whom a Contribution has been received by Licensor and subsequently incorporated within the Work.

2. Grant of Copyright License. Subject to the terms and conditions of this License, each Contributor hereby grants You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable copyright license to reproduce, prepare Derivative Works of, publicly display, publicly perform, sublicense, and distribute the Work and such Derivative Works in Source or Object form.

3. Grant of Patent License. Subject to the terms and conditions of this License, each Contributor hereby grants You a perpetual, worldwide, non-exclusive, no-charge, royalty-free, irrevocable patent license to make, have made, use, offer to sell, sell, import, and otherwise transfer the Work.

4. Redistribution. You may reproduce and distribute copies of the Work or Derivative Works thereof in any medium, with or without modifications, and in Source or Object form, provided that You meet the following conditions:
   (a) You must give any other recipients of the Work or Derivative Works a copy of this License; and
   (b) You must cause any modified files to carry prominent notices stating that You changed the files; and
   (c) You must retain, in the Source form of any Derivative Works that You distribute, all copyright, patent, trademark, and attribution notices from the Source form of the Work; and
   (d) If the Work includes a "NOTICE" text file as part of its distribution, then any Derivative Works that You distribute must include a readable copy of the attribution notices contained within such NOTICE file.

5. Submission of Contributions. Unless You explicitly state otherwise, any Contribution intentionally submitted for inclusion in the Work shall be under the terms and conditions of this License.

6. Trademarks. This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor.

7. Disclaimer of Warranty. Unless required by applicable law or agreed to in writing, Licensor provides the Work (and each Contributor provides its Contributions) on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

8. Limitation of Liability. In no event and under no legal theory, whether in tort (including negligence), contract, or otherwise, unless required by applicable law (such as deliberate and grossly negligent acts) shall any Contributor be liable to You for damages, including any direct, indirect, special, incidental, or consequential damages.

9. Accepting Warranty or Additional Liability. While redistributing the Work or Derivative Works thereof, You may choose to offer acceptance of support, warranty, indemnity, or other liability obligations and/or rights consistent with this License.

END OF TERMS AND CONDITIONS

APPENDIX: How to apply the Apache License to your work.
   To apply the Apache License to your work, attach the following boilerplate notice, with the fields enclosed by brackets "[]" replaced with your own identifying information.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and limitations under the License.`,
  },
  isc: {
    label: "ISC",
    anchor: "licenca-isc",
    title: "ISC License",
    text: `Copyright (c) ISC and its contributors

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted,
provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES
OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES
OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS
ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.`,
  },
  "bsd-2": {
    label: "BSD-2-Clause",
    anchor: "licenca-bsd-2",
    title: 'BSD 2-Clause "Simplified" License',
    text: `Copyright (c) The BSD-2-Clause Authors
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer
   in the documentation and/or other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS
BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
OF SUCH DAMAGE.`,
  },
};

const sections: Section[] = [
  {
    title: "Fundação web",
    items: [
      {
        project: "Next.js",
        license: "mit",
        packages: ["next", "next-themes", "@next/mdx"],
      },
      {
        project: "React",
        license: "mit",
        packages: ["react", "react-dom"],
      },
      {
        project: "MDX",
        license: "mit",
        packages: ["@mdx-js/react", "@mdx-js/loader", "@types/mdx"],
      },
      {
        project: "Tailwind CSS",
        license: "mit",
        packages: ["tailwindcss", "@tailwindcss/postcss"],
      },
      {
        project: "Tailwind Merge",
        license: "mit",
        packages: ["tailwind-merge"],
      },
      {
        project: "tw-animate-css",
        license: "mit",
        packages: ["tw-animate-css"],
      },
    ],
  },
  {
    title: "UI e interações",
    items: [
      {
        project: "Radix UI",
        license: "mit",
        packages: [
          "@radix-ui/react-avatar",
          "@radix-ui/react-checkbox",
          "@radix-ui/react-dialog",
          "@radix-ui/react-dropdown-menu",
          "@radix-ui/react-label",
          "@radix-ui/react-select",
          "@radix-ui/react-separator",
          "@radix-ui/react-slot",
          "@radix-ui/react-tooltip",
        ],
      },
      {
        project: "Class Variance Authority",
        license: "apache-2",
        packages: ["class-variance-authority"],
      },
      {
        project: "clsx",
        license: "mit",
        packages: ["clsx"],
      },
      {
        project: "Sonner",
        license: "mit",
        packages: ["sonner"],
      },
      {
        project: "TanStack",
        license: "mit",
        packages: ["@tanstack/react-table"],
      },
      {
        project: "Lucide",
        license: "isc",
        packages: ["lucide-react"],
      },
      {
        project: "React Icons",
        license: "mit",
        packages: ["react-icons"],
      },
      {
        project: "Simple Icons (React)",
        license: "mit",
        packages: ["@icons-pack/react-simple-icons"],
      },
    ],
  },
  {
    title: "Formulários e validação",
    items: [
      {
        project: "React Hook Form",
        license: "mit",
        packages: ["react-hook-form", "@hookform/resolvers"],
      },
      {
        project: "Zod",
        license: "mit",
        packages: ["zod"],
      },
    ],
  },
  {
    title: "Dados, backend e entrega",
    items: [
      {
        project: "Prisma",
        license: "apache-2",
        packages: ["prisma", "@prisma/client", "@prisma/adapter-pg"],
      },
      {
        project: "node-postgres",
        license: "mit",
        packages: ["pg"],
      },
      {
        project: "better-auth",
        license: "mit",
        packages: ["better-auth"],
      },
      {
        project: "Resend & React Email",
        license: "mit",
        packages: ["resend", "react-email", "@react-email/components"],
      },
      {
        project: "Dotenv",
        license: "bsd-2",
        packages: ["dotenv"],
      },
    ],
  },
  {
    title: "Ferramentas, tipos e qualidade",
    items: [
      {
        project: "TypeScript",
        license: "apache-2",
        packages: ["typescript"],
      },
      {
        project: "DefinitelyTyped",
        license: "mit",
        packages: ["@types/node", "@types/react", "@types/react-dom"],
      },
      {
        project: "ESLint",
        license: "mit",
        packages: ["eslint", "eslint-config-next"],
      },
      {
        project: "Prettier",
        license: "mit",
        packages: ["prettier"],
      },
    ],
  },
];

const licenseBlocks: LicenseKey[] = ["mit", "apache-2", "isc", "bsd-2"];

export const metadata = {
  title: "Licenças de código aberto",
};

const PackageList = ({ packages }: { packages: string[] }) => (
  <span className="text-sm text-muted-foreground">
    Pacotes:{" "}
    {packages.map((pkg, idx) => (
      <span key={pkg} className="space-x-1">
        <code>{pkg}</code>
        {idx < packages.length - 1 && <span>,</span>}
      </span>
    ))}
  </span>
);

const ProjectCardItem = ({ project, license, packages }: ProjectCard) => {
  const meta = licenseMeta[license];

  return (
    <Card className="border-border/70 bg-card/80 backdrop-blur">
      <CardHeader className="flex flex-row items-start justify-between gap-3 pb-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Projeto
          </p>
          <CardTitle className="text-lg">{project}</CardTitle>
        </div>
        <Badge
          variant="outline"
          asChild
          className="bg-primary/5 px-3 py-1 text-primary"
        >
          <Link href={`#${meta.anchor}`} scroll>
            {meta.label}
          </Link>
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-sm">
          <PackageList packages={packages} />
        </CardDescription>
      </CardContent>
    </Card>
  );
};

const LicenseBlock = ({ license }: { license: LicenseKey }) => {
  const meta = licenseMeta[license];

  return (
    <Card
      id={meta.anchor}
      className="scroll-m-16 border-border/70 bg-card/80 backdrop-blur"
    >
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">{meta.title}</CardTitle>
          <CardDescription className="text-sm">
            Texto completo da licença {meta.label}.
          </CardDescription>
        </div>
        <Badge variant="outline" className="bg-primary/5 px-3 py-1 text-primary">
          {meta.label}
        </Badge>
      </CardHeader>
      <CardContent>
        <pre className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
{meta.text}
        </pre>
      </CardContent>
    </Card>
  );
};

export default function Page() {
  return (
    <div className="space-y-12">
      <Card className="relative overflow-hidden border border-border bg-gradient-to-br from-primary/5 via-background to-accent/20 p-8 shadow-lg">
        <div
          className="absolute inset-x-10 -top-10 h-32 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div className="relative space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Transparência
          </p>
          <CardTitle className="text-3xl font-semibold">
            Licenças de código aberto
          </CardTitle>
          <CardDescription className="max-w-3xl text-sm">
            Este painel reúne as dependências declaradas em{" "}
            <code>package.json</code>, agrupadas por projeto. Cada bloco indica
            a licença em vigor e aponta para o texto completo correspondente.
          </CardDescription>
          <div className="flex flex-wrap gap-3 text-xs">
            <Badge variant="outline" className="px-3 py-1 text-muted-foreground">
              Dependências e devDependencies consideradas
            </Badge>
            <Button asChild size="sm">
              <Link href="#textos-das-licencas" scroll>
                Ir para textos completos
              </Link>
            </Button>
          </div>
        </div>
      </Card>

      {sections.map((section) => (
        <section key={section.title} className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{section.title}</h2>
            <p className="text-sm text-muted-foreground">
              Agrupamentos por projeto com suas licenças e pacotes associados.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {section.items.map((item) => (
              <ProjectCardItem key={item.project} {...item} />
            ))}
          </div>
        </section>
      ))}

      <section
        id="textos-das-licencas"
        className="space-y-6 scroll-m-16"
        aria-label="Textos completos das licenças"
      >
        <div className="space-y-2">
          <h2 className="text-lg font-semibold">Textos completos das licenças</h2>
          <p className="text-sm text-muted-foreground">
            Cada bloco abaixo traz o texto integral da licença. Os cartões acima
            referenciam estas âncoras para evitar duplicação de conteúdo.
          </p>
        </div>
        <div className="space-y-4">
          {licenseBlocks.map((key) => (
            <LicenseBlock key={key} license={key} />
          ))}
        </div>
      </section>
    </div>
  );
}
