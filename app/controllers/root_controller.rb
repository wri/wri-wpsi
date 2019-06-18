class RootController < ApplicationController
  def index; end

  def health_check
    render plain: 'OK'
  end

  def notifier_check
    raise 'test error notification'
  end

  def timeout_check
    logger.error 'entering timeout_check and burning CPU till we get killed'
    loop do
      # spin endlesslly
    end
    raise 'should never get here'
  end
end
