# Configure ExecJS to use Node.js
if Rails.env.production? || Rails.env.staging?
  # Set the JavaScript runtime to Node.js
  ExecJS.runtime = ExecJS::Runtimes::Node
end 