FROM 048578456468.dkr.ecr.ap-south-1.amazonaws.com/livguard-stage:first

WORKDIR /new
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build
EXPOSE 7000
EXPOSE 5000
EXPOSE 3000
CMD [ "npm", "start" ]
