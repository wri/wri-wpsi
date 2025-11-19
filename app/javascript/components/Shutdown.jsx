import React from 'react'

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '2rem',
  textAlign: 'center',
  backgroundColor: '#f9fafb',
  color: '#003255',
  fontFamily: '"Source Sans Pro", Arial, sans-serif',
}

const headingStyle = {
  fontSize: '2rem',
  fontWeight: 600,
  marginBottom: '1rem',
}

const paragraphStyle = {
  maxWidth: '800px',
  fontSize: '1.1rem',
  lineHeight: 1.6,
  marginBottom: '1rem',
}

const Shutdown = () => (
  <div style={containerStyle}>
    <h1 style={headingStyle}>WPS Global Tool Map: Undergoing Renovation</h1>
    <p style={paragraphStyle}>
      Thank you for your interest in the WPS Global Tool Map. This tool is currently undergoing
      significant renovations as we prepare to relaunch it with new visualization options.
    </p>
    <p style={paragraphStyle}>
      This renovation will include updated data and an improved user interface.
      The tool is anticipated to return in 2026.
    </p>
    <p style={paragraphStyle}>
      We apologize for any inconvenience. Please check back later for updates.
    </p>
  </div>
)

export default Shutdown

