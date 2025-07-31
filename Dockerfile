FROM node
RUN  mkdir -p /home/banking-frontend
WORKDIR /home/banking-frontend
COPY ./ ./
RUN npm install
RUN npm run build
CMD [ "npm","start" ]