FROM ruby:2.6.6-buster

ENV IN_DOCKER=true

# Install dependencies

# Add Yarn to the sources list
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

# Add NodeJS to sources list
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -

COPY docker/Aptfile /tmp/Aptfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
  DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    build-essential \
    postgresql-client-11 \
    $(cat /tmp/Aptfile | xargs) && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    truncate -s 0 /var/log/*log

# Create a directory for the app code
RUN mkdir -p /app
WORKDIR /app

# Upgrade RubyGems and install required Bundler version
ENV BUNDLE_FORCE_RUBY_PLATFORM=1
RUN gem update --system \
    && gem install bundler -v '2.2.23'

## FIXME: tests seem to hang when running as a non-root user :(
RUN useradd -d /home/appuser -s /bin/bash appuser
RUN mkdir -p /usr/local/bundle /node_modules /rails_cache /home/appuser
RUN chown -R appuser:appuser /app /usr/local/bundle /node_modules /rails_cache /home/appuser
USER appuser
