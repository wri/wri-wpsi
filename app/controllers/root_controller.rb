class RootController < ApplicationController
  layout :resolve_layout
  before_action :set_partners

  unless Rails.env.test?
    http_basic_authenticate_with(
      name: ENV['HTTP_AUTH_NAME'] || 'test',
      password: ENV['HTTP_AUTH_PASSWORD'] || 'test',
    )
  end

  def index
    @action_items = [
      Card.new('Understand', 'Data and publications', href: '/info/about#Understand'),
      Card.new('Mobilise', 'Engaging stakeholders', href: '/info/about#Mobilise'),
      Card.new('Learn', 'Training and capacity development', href: '/info/learn'),
      Card.new('Dialogue', 'Fostering peace and collaboration', href: 'info/dialogue'),
    ]
    @social_actions = [
      Card.new('Contact Us', href: 'info@waterpeacesecurity.org', options: { type: 'mail' }),
      Card.new('Follow Us', href: 'http://twitter.com/WaterPeaceSec', options: { type: 'icon' }),
      Card.new('Talk to Us', href: '', options: { type: 'button' }),
      Card.new('Know Us', href: '', options: { type: 'button' }),
    ]
    @tools = [
      Card.new('Global Tool', '', href: '/map'),
      Card.new('Local Tool', '', href: '/map'),
    ]
    @quotes = [
      Card.new(
        'WPS Goals',
        'Through the WPS partnership we hope to prevent conflicts over'\
        'water by enabling communities to take action at an early stage.',
        credit: 'Carola van Rijnso, Dutch Ministry for Foreign Affairs.',
      ),
      Card.new(
        'Crucial data',
        'Data is fundamental to understanding where the risks are highest,'\
        'what’s driving these risks, and they suggest what possible solutions'\
        'might be, in order to mitigate these risks.',
        credit: 'Charles Iceland, World Resources Institute',
      ),
      Card.new(
        'Solving conflict',
        'It’s important to know why conflict is happening, what the role of'\
        'water is, and what factors you can influence either as a policy maker'\
        'in the respective region, or as an external partner, to solve the conflict',
        credit: 'Susanne Schmeier, IHE Delft',
      ),
    ]
    @headlines = (0..2).map { Card.new('News Headline') }
    set_pages
    set_partners
  end

  def map
    set_pages
    # Let react single page app take over
    @layers = Layer.serialized_for_react_app
    @categories = Category.serialized_for_react_app
  end

  def show
    set_pages
    @page = Page.find_by(slug: params[:page_slug])
    redirect_to :map if @page.contentless?
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

  private

  def set_pages
    @pages = Page.top_level
  end

  def set_partners
    @partners = [
      ['IHE', ''],
      ['Deltares', ''],
      ['Alert', ''],
      ['The Hague Centre', ''],
      ['Wetlands', ''],
      ['WRI', ''],
    ]
  end

  def resolve_layout
    if action_name == 'map'
      'map'
    else
      'application'
    end
  end
end
