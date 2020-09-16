if defined?(Slackistrano::Messaging)
  module Slackistrano
    class CustomMessaging < Messaging::Base
      # Send failed message to #ops. Send all other messages to default channels.
      # The #ops channel must exist prior.
      def channels_for(action)
        super
      end

      # Suppress updating message.
      def payload_for_updating # rubocop:disable Metrics/MethodLength
        log = run_locally do
          capture(:git, :shortlog, "#{fetch(:gr_last_revision)}..#{fetch(:branch, 'HEAD')}")
        end
        {
          attachments: [{
            title: 'Deploying...',
            fields: [{
              title: 'Environment',
              value: stage,
              short: true,
            }, {
              title: 'Deployer',
              value: deployer,
              short: true,
            }, {
              title: 'Branch',
              value: branch,
              short: true,
            }, {
              title: 'Changes',
              value: log,
            }],
            fallback: super[:text],
          }],
          text: 'A new version is being deployed.',
        }
      end

      # # Suppress reverting message.
      # def payload_for_reverting
      #   nil
      # end

      # Fancy updated message.
      # See https://api.slack.com/docs/message-attachments
      def payload_for_updated # rubocop:disable Metrics/MethodLength
        {
          attachments: [{
            color: 'good',
            title: 'Deployed',
            fields: [{
              title: 'Environment',
              value: stage,
              short: true,
            }, {
              title: 'Branch',
              value: branch,
              short: true,
            }, {
              title: 'Deployer',
              value: deployer,
              short: true,
            }, {
              title: 'Time',
              value: elapsed_time,
              short: true,
            }],
            fallback: super[:text],
          }],
          text: 'Deployment is complete.' \
            ' Changes should now be live in the environment listed below.',
        }
      end

      # Default reverted message.  Alternatively simply do not redefine this
      # method.
      def payload_for_reverted
        super
      end

      # Slightly tweaked failed message.
      # See https://api.slack.com/docs/message-formatting
      def payload_for_failed
        payload = super
        payload[:text] = "OMG :fire: #{payload[:text]}"
        payload
      end

      # Override the deployer helper to pull the best name available (git, password file, env vars).
      # See https://github.com/phallstrom/slackistrano/blob/master/lib/slackistrano/messaging/helpers.rb
      def deployer
        name = `git config user.name`.strip
        name = nil if name.empty?
        name ||= Etc.getpwnam(ENV['USER']).gecos || ENV['USER'] || ENV['USERNAME']
        name
      end
    end
  end
end
