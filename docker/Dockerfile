FROM ruby:2.6.6

ENV IN_DOCKER=true

# Install dependencies

# Update sources list to use archive repositories for Debian Buster
RUN echo "deb http://archive.debian.org/debian/ buster main" > /etc/apt/sources.list && \
    echo "deb http://archive.debian.org/debian-security/ buster/updates main" >> /etc/apt/sources.list && \
    echo "deb http://archive.debian.org/debian/ buster-updates main" >> /etc/apt/sources.list

# Add Yarn to the sources list
RUN wget -qO - https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
  && echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

# Add NodeJS to sources list
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -

COPY docker/Aptfile /tmp/Aptfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
  DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    build-essential \
    $(cat /tmp/Aptfile | xargs) && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* && \
    truncate -s 0 /var/log/*log

# Create a directory for the app code
RUN mkdir -p /app
WORKDIR /app

COPY .. /app

# Install compatible RubyGems and Bundler versions for Ruby 2.6.6
ENV BUNDLE_FORCE_RUBY_PLATFORM=1
RUN gem install rubygems-update -v '3.4.13'
RUN update_rubygems
RUN apt install graphviz
RUN gem install bundler -v '1.17.3'
RUN bundle install
RUN yarn install

## FIXME: tests seem to hang when running as a non-root user :(
# RUN useradd -d /home/appuser -s /bin/bash appuser
# RUN mkdir -p /usr/local/bundle /node_modules /rails_cache /home/appuser
# RUN chown -R appuser:appuser /app /usr/local/bundle /node_modules /rails_cache /home/appuser
# RUN chown -R appuser:appuser /usr/local/lib/ruby/gems
# USER appuser
