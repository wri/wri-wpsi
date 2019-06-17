Rails.application.routes.draw do
  root 'root#index'

  # default AWS ELB health check path
  get 'health-check', to: 'home#health_check'
  # a check to force an exception notification
  get 'notifier-check', to: 'home#notifier_check'
  # a check to force a timeout WARNING: burns CPU!
  get 'timeout-check', to: 'home#timeout_check'
end
