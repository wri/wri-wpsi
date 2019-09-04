// Original source:
// https://github.com/resource-watch/resource-watch/blob/develop/components/ui/map/controls/SearchControl.js

import React from 'react';
import PropTypes from 'prop-types';

import Geosuggest from 'react-geosuggest';
import { Icon } from 'vizzuality-components';

class SearchControl extends React.Component {
  static propTypes = {
    setMapLocation: PropTypes.func.isRequired,
    setSelectedRegionFromCoordinates: PropTypes.func.isRequired,
  };

  state = { showSearchInput: false };

  // UI EVENTS
  onToggleSearchInput = (to) => {
    this.setState({ showSearchInput: to }, () => {
      if (this.state.showSearchInput) {
        this.geosuggest.focus();
      }
    });
  }

  onSuggestSelect = (e) => {
    if (e) {
      const { gmaps, location } = e;
      const viewport = gmaps.geometry && gmaps.geometry.viewport;

      if (location) {
        this.props.setSelectedRegionFromCoordinates(location)
      }

      if (viewport) {
        const { south, west, north, east } = viewport.toJSON();
        this.props.setMapLocation({ bbox: [east, south, west, north] });
      }

      if (!viewport && location) {
        this.props.setMapLocation({
          ...location,
          zoom: 7
        });
      }

      this.onToggleSearchInput(false);
    }
  }

  onKeyDown = (e) => {
    if (e.keyCode === 27) {
      this.onToggleSearchInput(false);
    }
  }

  render() {
    const { showSearchInput } = this.state;
    const className = 'c-map-search-control';

    return (
      <div className={className}>
        {showSearchInput &&
          <Geosuggest
            ref={(r) => { this.geosuggest = r; }}
            onSuggestSelect={this.onSuggestSelect}
            onKeyDown={this.onKeyDown}
            // Add bias towards the global south
            bounds={{south: -31.5, west: -41.6, north: 67.2, east: 49.1}}
            types={['(regions)']}
          />
        }
        <button
          type="button"
          className="search-button"
          onClick={() => this.onToggleSearchInput(!showSearchInput)}
        >
          <Icon name="icon-search" className="-small" />
        </button>
      </div>
    );
  }
}

export default SearchControl;
