import React from 'react';
import ReactDOM from 'react-dom';


class BusinessEntry extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let imgArr = [];
    for (let i = 0; i < this.props.business.rating; i++) {
      imgArr.push(
        (<img className="ratingLogo" key={i} src='https://image.ibb.co/bzkXSR/imageedit_12_7791151374.png' width='20px'/>)
      )
    }
    return (
        <div className="businessEntry">
          <img className="businessLogo" src={this.props.business.image_url} width="60px" />
          <h5 style={{margin: '6px 0px 0px 0px'}}>{this.props.business.name}</h5><br />
          <div className="rating">{imgArr}</div>
          <div className="address">
            <span>{this.props.business.location.address1} <br />
            {this.props.business.location.city} <br />
            {this.props.business.location.state}, {this.props.business.location.zip_code} <br />
            </span>
          </div>
        </div>
    )
  }
}

export default BusinessEntry;