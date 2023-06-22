FROM node:18

ENV PORT='3000'
ENV TZ='UTC'
ENV WEBSITE_BASE_URL='https://www.livguard.com'
ENV DEBUG_MODE='false'
ENV IMAGE_CDN_PROVIDER='bunny'
#export DATABASE_CREDENTIALS_ID='3c770231-a4ef-48a5-b2f7-9517423b0dad'
#export KMS_URL='https://kms.intellsys.ai'
#export KMS_TOKEN='Bearer sb4@8&zCdrFms5DK'
#export INTELLSYS_TOKEN='26b05f8d-be49-4279-9b47-e1a234747210'
#export FRESH_SALES_API_TOKEN='USstYlIaJsQ9bjwloijyHg'
#export FRESH_SALES_API_END_POINT='https://livguard-team.myfreshworks.com/crm/sales/api/'
#export SESSION_SECRET='SFcsAfJoq64fnb!p'
#export JWT_SECRET='BRP3p?XpLCPXGCjh'
ENV COOKIE_SCHEMA_VERSION='0.0.1'
ENV COOKIE_DOMAIN='livguard.com'
ENV COOKIE_MAX_AGE='2592000'
ENV VALUE_FIRST_API_BASE_URI='https://api.myvfirst.com/psms'
ENV VALUE_FIRST_USERNAME='livpurtejOTPXML'
ENV VALUE_FIRST_PASSWORD='#lE#DBxM4]'
ENV HAPTIK_BASE_URL='https://api.haptikapi.com/'
ENV HAPTIK_BUSINESS_ID='6903'
ENV HAPTIK_CLIENT_ID='2ebc71b93a4f906c117a3a64ab8ad571b7acde11'
ENV GOOGLE_WEBHOOK_AUTHORIZATION_CODE='c3732266-97fd-4f7c-866a-f4ee0ba2e8ff'

WORKDIR /new
COPY package*.json ./
RUN npm install

#COPY  build ./
#COPY  public ./

COPY . .
#RUN npm install pm2 --location=global 
#RUN pm2 start npm -- start
RUN npm run build
EXPOSE 7000
EXPOSE 5000
EXPOSE 3000

#RUN pm2 start npm --name "my_app" -- start 
CMD [ "npm", "start" ]
