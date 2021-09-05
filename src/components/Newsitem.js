import React, { Component } from "react";

export class Newsitem extends Component {

  render() {
      let {title , description ,imageurl ,newsurl, itemmode} = this.props ;
    
    console.log(itemmode)
    return (
      <div className="my-3">
        <div className={`card bg-${itemmode} text-${itemmode === 'dark'? 'white' : 'dark'}`} style={{width: "20rem"}}>
          <img src={imageurl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title" >{title}</h5>
            <p className="card-text">
              {description}
            </p>
            <a rel="noreferrer" href={newsurl} target="_blank" className={`btn btn-sm btn-${itemmode === 'dark'? 'light' : 'dark'}`}>
              read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Newsitem;
