import React, { Component } from "react";

export class Newsitem extends Component {

  render() {
      let {title , description ,imageurl ,newsurl} = this.props ;
    return (
      <div className="my-3">
        <div className="card" style={{width: "20rem"}}>
          <img src={imageurl} className="card-img-top" alt="..." style={{ width : "100%" , height : "100%"}}/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a href={newsurl}  className="btn btn-sm btn-primary">
              read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
