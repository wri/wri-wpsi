FROM ruby:2.6.6-slim-buster

ENV IN_DOCKER=true

# Install dependencies
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
    DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    build-essential \
    curl \
    gnupg \
    postgresql-client-11 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
    && truncate -s 0 /var/log/*log

# Add Yarn to the sources list
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list

# Add NodeJS to sources list (using a more stable version for ARM64)
RUN curl -fsSL https://deb.nodesource.com/setup_14.x | bash -

# Install Node.js and Yarn
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    nodejs \
    yarn \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy Aptfile and install additional dependencies
COPY docker/Aptfile /tmp/Aptfile
RUN apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    $(cat /tmp/Aptfile | xargs) \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Create a directory for the app code
RUN mkdir -p /app
WORKDIR /app

# Copy application files
COPY . .

# Set environment variables for bundler
ENV BUNDLE_PATH=/bundle
ENV BUNDLE_APP_CONFIG=/bundle
ENV BUNDLE_BIN=/bundle/bin
ENV PATH=/bundle/bin:$PATH

# Update RubyGems to a compatible version and install dependencies
RUN gem update --system 3.3.22 && \
    gem install bundler -v 1.17.2 && \
    bundle config set --local path '/bundle' && \
    bundle config set --local force_ruby_platform true && \
    bundle config set --local build.nokogiri '--use-system-libraries' && \
    bundle install --jobs 4 --retry 3 && \
    sed -i 's/ffi (1.17.2)/ffi (1.15.5)/' Gemfile.lock && \
    sed -i 's/ffi-1.17.2-aarch64-linux-musl/ffi-1.15.5/' Gemfile.lock

# Set environment variables
ENV RAILS_ENV=development

# Create a volume for bundler cache
VOLUME /bundle

# Install yarn dependencies
RUN yarn install

# Add a script to be executed every time the container starts
COPY docker/entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Start the main process
CMD ["bash"] 