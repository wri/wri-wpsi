class RootController < ApplicationController
  def index
    @action_items = [
      Card.new('Understand', 'Data and publications'),
      Card.new('Mobilise', 'Engaging stakeholders'),
      Card.new('Learn', 'Training and capacity development'),
      Card.new('Dialogue', 'Fostering peace and collaboration'),
    ]
    @social_actions = ['Contact us', 'Follow Us', 'Talk to Us', 'Know Us']
    @tools = [
      Card.new('Global Tool', ''),
      Card.new('Local Tool', ''),
    ]
    @quotes = [
      Card.new('WPS Goals', 'Through the WPS partnership we hope to prevent conflicts over water by enabling communities to take action at an early stage.', credit: 'Carola van Rijnso, Dutch Ministry for Foreign Affairs.'),
      Card.new('Crucial data', 'Data is fundamental to understanding where the risks are highest, what’s driving these risks, and they suggest what possible solutions might be, in order to mitigate these risks.', credit: 'Charles Iceland, World Resources Institute'),
      Card.new('Solving conflict', 'It’s important to know why conflict is happening, what the role of water is, and what factors you can influence either as a policy maker in the respective region, or as an external partner, to solve the conflict', credit: 'Susanne Schmeier, IHE Delft'),
    ]
    @headlines = (0..2).map{Card.new("News Headline")}
    @partners = ['IHE', 'Deltares', 'Alert', 'The Hague Centre', 'Wetlands', 'WRI']
    render 'index', layout: 'landing'
  end

  def map
    # Let react single page app take over
    @layers = Layer.serialized_for_react_app
    @categories = Category.serialized_for_react_app
    render 'map', layout: 'application'
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

