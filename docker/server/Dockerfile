FROM node:latest

EXPOSE 8067

RUN git clone https://github.com/cojapacze/sketchpad.git
WORKDIR /sketchpad

RUN npm install

# Might be overkill be let's create a lighter image
FROM node:alpine
COPY --from=0 /sketchpad /sketchpad
WORKDIR /sketchpad
CMD ["node", "server/server.js"]