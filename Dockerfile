FROM node:10.15.3

### DEPENDENCIES ###

RUN apt-get update && apt-get install -y \
  sudo \
  --no-install-recommends \
  && apt-get clean \
  && rm -r /var/lib/apt/lists/*

# Got some issue with permissions. sudo resolved it. Something like:
# https://github.com/Medium/phantomjs/issues/707#issuecomment-326380366
RUN sudo npm install -g phantomjs-prebuilt --unsafe-perm
RUN npm install -g ember-cli@3.9.0

### PREPARE ###

ENV serviceName=echo-ember-common
ENV \
  SRC_DIR=/app/$serviceName \
  RUN_DIR=/app/$serviceName \
  PATH=$PATH:/app/$serviceName/src/node_modules/.bin

RUN mkdir -p \
  $SRC_DIR \
  $RUN_DIR

### RUNTIME ###

# We need to be able to set live_reload_port at build time, since this
# port must be the same as the port exposed on the host. Ember reports
# to browser which port it is listening to to the browser.
ARG port=4200
ARG live_reload_port=4201

ENV EMBER_CLI_PORT=$port \
    EMBER_CLI_LIVE_RELOAD_PORT=$live_reload_port

WORKDIR $RUN_DIR

EXPOSE $port $live_reload_port

### BUILD ###

WORKDIR $SRC_DIR

COPY package.json .
COPY yarn.lock .

RUN yarn

# Copy the rest of the source files
COPY . .
