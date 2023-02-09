FROM node:16.14
WORKDIR /app-backend
COPY package*.json /app-backend/
RUN npm install 
COPY . /app-backend/
EXPOSE 3001
RUN npm run build
CMD ["npm", "start"]