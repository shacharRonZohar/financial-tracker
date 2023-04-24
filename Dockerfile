FROM node:18-alpine

# Create app directory

RUN npm i -g pnpm

WORKDIR /usr/src/app

# Install app dependencies

COPY package.json  .npmrc pnpm-lock.yaml ./

RUN pnpm ci --prod

# Bundle app source

COPY . .

RUN prisma db push
EXPOSE 3000

CMD [ "pnpm", "start" ]

