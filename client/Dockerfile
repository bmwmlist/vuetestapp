FROM node:10.19-alpine
ENV NODE_ENV production
WORKDIR /usr/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
#RUN npm install --production --silent 
RUN npm install
COPY . .
EXPOSE 8080
CMD ["npm", "run", "serve"]