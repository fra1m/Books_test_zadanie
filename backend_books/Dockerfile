FROM node:21-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN yarn migration
RUN yarn migrate
CMD ["npm", "run", "dev"]