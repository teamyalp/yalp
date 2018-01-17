import React, {Component} from "react";
import GoogleMapLoader from "react-google-maps-loader";
import GooglePlacesSuggest from "react-google-places-suggest";
 
const MY_API_KEY = "AIzaSyBdR4CN_ZcKvi-gmm4cwkB_4RH-jnJNBCc";
 
export default class GoogleSuggest extends React.Component {
  constructor(props) {
    super(props)
	  this.state = {
	    search: "",
	    value: "",
	  }
  }
 
  handleInputChange(e) {
    this.setState({search: e.target.value, value: e.target.value})
  }
 
  handleSelectSuggest(suggest) {
    // console.log(suggest) // eslint-disable-line
    this.geocodeAddress(suggest.formatted_address);
    this.setState({search: "", value: suggest.formatted_address})
  }

  geocodeAddress(address, cb) {
  	var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': address}, (results, status) => {
      if (status === 'OK') {
      	this.props.locChange(results[0].geometry.location.toString());
      	return results[0].geometry.location.toString();
      } else {
        console.log('Geocode was not successful for the following reason: ' + status);
        return undefined;
      }
    });
  }
 
  render() {
    const {search, value} = this.state
    return (
      <GoogleMapLoader
        params={{
          key: MY_API_KEY,
          libraries: "places,geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <GooglePlacesSuggest
              googleMaps={googleMaps}
              autocompletionRequest={{
                input: search,
                // Optional options
                // https://developers.google.com/maps/documentation/javascript/reference?hl=fr#AutocompletionRequest
              }}
              // Optional props
              onSelectSuggest={this.handleSelectSuggest.bind(this)}
              textNoResults="No results. Sorry!" // null or "" if you want to disable the no results item
              customRender={prediction => (
                <div className="customWrapper">
                  {prediction
                    ? prediction.description
                    : "No results. Sorry!"}
                </div>
              )}
            >
              <input
                type="text"
                value={value}
                placeholder="Search a location"
                onChange={this.handleInputChange.bind(this)}
              />
            </GooglePlacesSuggest>
          )
        }
      />
    )
  }
}