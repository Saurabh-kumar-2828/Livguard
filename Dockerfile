FROM growthjockey/livguard-base:latest

WORKDIR /new
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
EXPOSE 7000
EXPOSE 5000
EXPOSE 3000
CMD [ "npm", "start" ]
