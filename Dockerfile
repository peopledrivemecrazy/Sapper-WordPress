# build

FROM node:12

WORKDIR /app
COPY . ./
RUN npm ci
RUN npm run build

# start

FROM node:12

WORKDIR /app
COPY --from=0 /app/__sapper__ ./__sapper__
COPY --from=0 /app/static ./static
COPY --from=0 /app/node_modules ./node_modules
COPY . .

EXPOSE 3000
CMD ["node", "__sapper__/build"]