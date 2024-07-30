FROM node:22-slim
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
ARG REACT_APP_BACKEND_URL_ROOT
RUN echo REACT_APP_BACKEND_URL_ROOT=${REACT_APP_BACKEND_URL_ROOT} > .env
RUN npm ci --silent
RUN npm run build --production
RUN npm install -g serve
CMD ["serve", "-s", "build"]