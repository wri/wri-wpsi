# README

This is the main repo for the WRI - Water, Peace and Security Initiative webmap project.

[![Build Status](https://travis-ci.com/greenriver/wri-wpsi.svg?token=EQywZqAdUXLYyppSoTji&branch=master)](https://travis-ci.com/greenriver/wri-wpsi)

## Ruby version

See [.ruby-version](/.ruby-version) definition.

## System dependencies

## Configuration

## Database initialization

## Linting

Ruby code is linted by `rubocop` and JS code is linted by `eslint`. Both are run and enforced automatically when you try to commit new changes via `overcommit`.

## Testing

* `bin/ci-build` runs code audits and the test suite and is what TravisCI runs. Check it out for things you might test locally.
* Run system tests with `DEBUG_CHROME=1` to watch them execute in real time.

## Deploying

Staging is deployed to heroku at `https://git.heroku.com/wri-wpsi.git`. Run `git push heroku master` to deploy master there.

Exceptions are monitored via [sentry.io](https://sentry.io/organizations/green-river/issues/?project=1484102).

Test deploy hook
