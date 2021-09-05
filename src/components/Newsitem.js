import React, { Component } from "react";

export class Newsitem extends Component {

  myStyle = {
    color: this.props.mode ==='dark'?'white':'black',
    backgroundColor: this.props.mode ==='dark'?'#212529':'white' 
  }

  render() {
      let {title , description ,imageurl ,newsurl} = this.props ;
    return (
      <div className="my-3">
        <div className="card" style={{width: "20rem"}}>
          <img src={imageurl} className="card-img-top" alt="..."/>
          <div className="card-body" style={this.myStyle}>
            <h5 className="card-title" style={this.myStyle}>{title}</h5>
            <p className="card-text" style={this.myStyle}>
              {description}
            </p>
            <a rel="noreferrer" href={newsurl} target="_blank" className="btn btn-sm btn-dark">
              read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
