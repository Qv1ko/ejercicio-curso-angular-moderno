FROM node:26-bullseye

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Instala pnpm 11 (mismo major que packageManager)
RUN corepack enable && corepack prepare pnpm@11.22.0 --activate

WORKDIR /app

# Dependencias primero para aprovechar la cache de capas
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

# El código fuente se monta en runtime (hot reload)
EXPOSE 4200

CMD ["pnpm", "start", "--", "--host", "0.0.0.0"]
