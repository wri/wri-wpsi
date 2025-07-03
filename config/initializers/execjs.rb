# Configure ExecJS to use Node.js
if Rails.env.production? || Rails.env.staging?
  begin
    # Set Node.js as the JavaScript runtime
    ExecJS.runtime = ExecJS::Runtimes::Node
  rescue => e
    Rails.logger.error "Failed to configure ExecJS runtime: #{e.message}"
  end
end 