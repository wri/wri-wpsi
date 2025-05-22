// Configure your import map in config/importmap.rb

// Import all the controllers to be registered with Stimulus
import "controllers"

// Import application styles
import "./src/application.scss"

// Import any other JavaScript modules you need
import "./src/index"

// Load admin JavaScript if we're on an admin page
if (document.body.classList.contains('admin-layout')) {
  import("./src/admin")
} 