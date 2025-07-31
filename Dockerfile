FROM node
RUN  mkdir -p /srv/banking-app-client
WORKDIR /srv/banking-app-client
COPY ./ ./
RUN npm install
RUN npm run build
CMD [ "npm","start" ]