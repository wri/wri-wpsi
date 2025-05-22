# Pin npm packages by running ./bin/importmap

pin 'application', preload: true
pin '@hotwired/turbo-rails', to: 'turbo.min.js', preload: true
pin '@hotwired/stimulus', to: 'stimulus.min.js', preload: true
pin '@hotwired/stimulus-loading', to: 'stimulus-loading.js', preload: true

# Pin your JavaScript modules
pin_all_from 'app/javascript/controllers', under: 'controllers'
pin_all_from 'app/javascript/src', under: 'src', preload: true # Preload all src files
pin_all_from 'app/javascript/components', under: 'components'

# React and related packages
pin 'react', to: 'https://ga.jspm.io/npm:react@18.2.0/index.js'
pin 'react-dom', to: 'https://ga.jspm.io/npm:react-dom@18.2.0/index.js'
pin 'scheduler', to: 'https://ga.jspm.io/npm:scheduler@0.23.0/index.js'
