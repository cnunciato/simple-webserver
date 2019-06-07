FROM node
COPY *.js ./
EXPOSE 3000
CMD [ "node", "index" ]
