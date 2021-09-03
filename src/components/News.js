import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {
  
  constructor() {
    //run before render
    super();
    this.state = {
      articles: [],
      loading: false,
    };
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=56c28c132f5a419f867a3ca6727aadfe" ;
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({articles : parsedata.articles});
  }

  render() {
    return (
      <div className="container my-3">
          <h2>Updates-Rocket Top Headlines</h2>
          <div className="row">
          {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : "Default Title"}
                    description={element.description ?element.description : "Default Desc"}
                    imageurl={element.urlToImage? element.urlToImage : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"}
                    newsurl = {element.url}
                  />
                </div>
              );
            })}
          </div>
        </div>
    );
  }
}

export default News;
