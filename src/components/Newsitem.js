import React from "react";

const Newsitem = (props) => {
    let { title, description, imageurl, newsurl, itemmode, author, date , source} =props;
 
    return (
      <div className="my-3">
        <div
          className={`card bg-${itemmode} text-${
            itemmode === "dark" ? "white" : "dark"
          }`}
          style={{ width: "20rem" }}
        >
          <div style={{ display:"flex" , justifyContent : "flex-end" , right : 0 , position : "absolute"}}>
          <span className="badge rounded-pill bg-danger" >{source}</span>
          </div> 
          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                Published at {new Date(date).toGMTString()} by {author}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className={`btn btn-sm btn-${
                itemmode === "dark" ? "light" : "dark"
              }`}
            >
              read more
            </a>
          </div>
        </div>
      </div>
    );
  
}

export default Newsitem;
