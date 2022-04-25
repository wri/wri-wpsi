module HomePageContent
  extend ActiveSupport::Concern

  def setup_cards!
    cards = %i[ action_items social_actions tools quotes ]
    @cards = cards.map do |c|
      [c, send(c)]
    end.to_h
  end

  def set_partner_cards!
    @partners = [
      Card.new(title: 'IHE', desc: '', href: '//www.un-ihe.org/'),
      Card.new(title: 'Deltares', desc: '', href: '//www.deltares.nl'),
      Card.new(title: 'Alert', desc: '', href: '//www.international-alert.org/'),
      Card.new(title: 'The Hague Centre', desc: '', href: '//hcss.nl/'),
      Card.new(title: 'Wetlands', desc: '', href: '//www.wetlands.org/'),
      Card.new(title: 'WRI', desc: '', href: '//www.wri.org/'),
    ]
  end

  private

  def tools
    [
      Card.new(title: 'Global Tool', desc: '', href: '/map'),
      Card.new(title: 'Regional Tool', desc: '', href: '/info/regional-tool'),
    ]
  end

  def action_items
    [
      Card.new(
        title: 'Understand',
        desc: 'Apply cutting-edge technology and participatory analysis to understand water crises',
        href: '/info/map',
      ),
      Card.new(
        title: 'Mobilise',
        desc: 'Mobilise decision makers and communities to take informed actions',
        href: '/info/our-approach',
      ),
      Card.new(
        title: 'Learn',
        desc: 'Strengthen capacities of stakeholders to address water crises',
        href: '/info/e-learning',
      ),
      Card.new(
        title: 'Dialogue',
        desc: 'Support dialogue for cooperation and peacebuilding',
        href: '/info/regional-tool',
      )
    ]
  end

  def social_actions
    [
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
        href: '//docs.google.com/forms/d/e/1FAIpQLSdXTKxcEFt0A4Zz'\
        '0zlm9KfSp1Nu7W43Ztin1j9Zdsw7d92RNw/viewform',
        options: { type: 'button' },
      ),
      Card.new(
        title: 'Meet Us',
        href: '/info/partners',
        options: { type: 'button' },
      ),
    ]
  end

  def quotes
    [
      Card.new(
        title: 'Solving conflict',
        credit: 'Susanne Schmeier, IHE Delft',
        desc: <<~TEXT
          It's important to know why conflict is happening, what the role of
          water is, and what factors you can influence either as a policy maker
          in the respective region, or as an external partner, to solve the conflict.
        TEXT
      ),
      Card.new(
        title: 'Crucial data',
        credit: 'Charles Iceland, World Resources Institute',
        desc: <<~TEXT
          Data is fundamental to understanding where the risks are highest,
          what's driving these risks, and they suggest what possible solutions
          might be, in order to mitigate these risks.
        TEXT
      ),
      Card.new(
        title: 'Regional impact',
        credit: 'Karounga Keïta, Wetlands International Sahel Office',
        desc: <<~TEXT
          WPS helps Malian decision-makers, civil society and local communities to
          understand the link between water, peace and security. This fosters the
          hope for peaceful, shared and sustainable management of natural resources
          in the Inner Niger Delta.
        TEXT
      ),
    ]
  end


end
