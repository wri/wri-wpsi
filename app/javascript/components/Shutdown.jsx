import React from 'react'

const containerStyle = {
  fontFamily: '"Source Sans Pro", Arial, sans-serif',
}

const textPanelStyle = {
  borderRadius: '1rem',
  maxWidth: '600px',
}

const imageContainerStyle = {
  margin: '0 auto',
  backgroundImage: 'url(/latest-forecast-2025-11.png)',
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  width: '100%',
  height: '100%',
}

const headingStyle = {
  fontSize: '2rem',
  fontWeight: 600,
  marginBottom: '1rem',
}

const paragraphStyle = {
  fontSize: '1.1rem',
  lineHeight: 1.6,
  marginBottom: '1rem',
}

const Shutdown = () => (
  <div style={containerStyle} className="wps-shutdown-container">
    <div className="wps-shutdown-image">
      <div style={imageContainerStyle} />
    </div>
    <div style={textPanelStyle} className="wps-shutdown-text-panel">
        <h1 style={headingStyle}>WPS Global Tool Map: Undergoing Renovation</h1>
        <p style={paragraphStyle}>
          Thank you for your interest in the WPS Global Tool Map. This tool is currently
          undergoing significant renovations as we prepare to relaunch it.
        </p>
        <p style={paragraphStyle}>
          The tool is anticipated to return in mid-2026. For any data access
          or questions please contact us at{` `}
          <a href="mailto:info@waterpeacesecurity.org">info@waterpeacesecurity.org</a>. 
        </p>
        <p style={paragraphStyle}>
          We apologize for any inconvenience. Please check back later for updates.
        </p>
    </div>
  </div>
)

export default Shutdown

