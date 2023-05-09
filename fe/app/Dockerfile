# pull official base image
FROM --platform=$BUILDPLATFORM node:18.12.0 as builder

# set work directory
WORKDIR /usr/src/protecrud/fe

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
