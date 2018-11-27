FROM node:latest

RUN git clone https://github.com/cojapacze/sketchpad.git
WORKDIR /sketchpad

RUN npm install && \
    npm install -g gulp

RUN gulp

# Might be overkill be let's create a lighter image
FROM nginx:alpine

EXPOSE 80

COPY --from=0 /sketchpad/demos /usr/share/nginx/html
COPY --from=0 /sketchpad/dist /usr/share/nginx/html/dist

WORKDIR /sketchpad
