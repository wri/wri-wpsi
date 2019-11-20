class RootController < ApplicationController # rubocop:disable Metrics/ClassLength
  layout :resolve_layout
  before_action :set_partners

  unless Rails.env.test?
    http_basic_authenticate_with(
      name: ENV['HTTP_AUTH_NAME'] || 'test',
      password: ENV['HTTP_AUTH_PASSWORD'] || 'test',
    )
  end

  # TODO: Move into views?
  def index # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
    @action_items = [
      Card.new(
        title: 'Understand',
        desc: 'Data and publications',
        href: '/info/about#Understand',
      ),
      Card.new(
        title: 'Mobilise',
        desc: 'Engaging stakeholders',
        href: '/info/about#Mobilise',
      ),
      Card.new(
        title: 'Learn',
        desc: 'Training and capacity development',
        href: '/info/learn',
      ),
      Card.new(
        title: 'Dialogue',
        desc: 'Fostering peace and collaboration',
        href: 'info/dialogue',
      ),
    ]
    @social_actions = [
      Card.new(
        title: 'Contact Us',
        href: 'info@waterpeacesecurity.org',
        options: { type: 'mail' },
      ),
      Card.new(
        title: 'Follow Us',
        href: 'http://twitter.com/WaterPeaceSec',
        options: { type: 'icon' },
      ),
      Card.new(
        title: 'Talk to Us',
        href: '',
        options: { type: 'button' },
      ),
      Card.new(
        title: 'Know Us',
        href: '',
        options: { type: 'button' },
      ),
    ]
    @tools = [
      Card.new(title: 'Global Tool', desc: '', href: '/map'),
      Card.new(title: 'Local Tool', desc: '', href: '/map'),
    ]
    @quotes = [
      Card.new(
        title: 'WPS Goals',
        desc: 'Through the WPS partnership we hope to prevent conflicts over'\
        'water by enabling communities to take action at an early stage.',
        credit: 'Carola van Rijnso, Dutch Ministry for Foreign Affairs.',
      ),
      Card.new(
        title: 'Crucial data',
        desc: 'Data is fundamental to understanding where the risks are highest,'\
        'what’s driving these risks, and they suggest what possible solutions'\
        'might be, in order to mitigate these risks.',
        credit: 'Charles Iceland, World Resources Institute',
      ),
      Card.new(
        title: 'Solving conflict',
        desc: 'It’s important to know why conflict is happening, what the role of'\
        'water is, and what factors you can influence either as a policy maker'\
        'in the respective region, or as an external partner, to solve the conflict',
        credit: 'Susanne Schmeier, IHE Delft',
      ),
    ]
    @headlines = (0..2).map { Card.new(title: 'News Headline') }
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
      Card.new(title: 'IHE', desc: '', href: '//www.un-ihe.org/'),
      Card.new(title: 'Deltares', desc: '', href: '//www.deltares.nl'),
      Card.new(title: 'Alert', desc: '', href: '//www.international-alert.org/'),
      Card.new(title: 'The Hague Centre', desc: '', href: '//hcss.nl/'),
      Card.new(title: 'Wetlands', desc: '', href: '//www.wetlands.org/'),
      Card.new(title: 'WRI', desc: '', href: '//www.wri.org/'),
    ]
  end

  def resolve_layout
    if action_name == 'map'
      'map'
    else
      'website'
    end
  end
end
