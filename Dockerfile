FROM node:24.0.0-alpine

# Alpine環境での開発に必要なパッケージを追加
RUN apk add --no-cache git bash sudo curl

# pnpmの有効化
RUN corepack enable && corepack prepare pnpm@latest --activate

USER node

EXPOSE 3000
CMD ["node", "build"]