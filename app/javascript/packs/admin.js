// This logic renders a live-updating preview of a layer's widget on the layer
// form partial.

import React from 'react'
import ReactDOM from 'react-dom'
import Widget from 'components/Widget'

document.addEventListener('DOMContentLoaded', () => {
  const widgetSpecEl = document.getElementById('layer_widget_spec')
  const previewRegionEl = document.getElementById('preview_region')

  if (widgetSpecEl && previewRegionEl && widgetSpecEl.value) {
    const updatePreview = () => {
      ReactDOM.render(
        <Widget region={{gid_2: previewRegionEl.value}} widgetSpec={JSON.parse(widgetSpecEl.value)} />,
        document.getElementById('vega-preview'),
      )
    }

    widgetSpecEl.addEventListener("input", updatePreview)
    previewRegionEl.addEventListener("input", updatePreview)

    updatePreview()
  }
})
