class RootController < ApplicationController
  def index
    redirect_to '/map'
  end

  def map
    # Let react single page app take over
    @layers = Layer.serialized_for_react_app
    @categories = Category.serialized_for_react_app
    render 'index'
  end

  def health_check
    render plain: 'OK'
  end

  def notifier_check
    raise 'test error notification'
  end

  def timeout_check
    logger.error 'entering timeout_check and burning CPU till we get killed'
    loop do
      # Spin endlessly
    end
    raise 'should never get here'
  end
end
