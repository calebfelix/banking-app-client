FROM node
RUN  mkdir -p /home/banking-app-client
WORKDIR /home/banking-app-client
COPY ./ ./
RUN npm install
RUN npm run build
CMD [ "npm","start" ]