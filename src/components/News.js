import React, { Component } from "react";
import Newsitem from "./Newsitem";

export class News extends Component {

  Handlenextclick = async ()=>{
    if(this.state.page + 1  > Math.ceil(this.state.totalResults/20)){

    }
    else{
      let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=56c28c132f5a419f867a3ca6727aadfe&page=${this.state.page + 1 }&pageSize=20` ;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page : this.state.page + 1 ,
      articles : parsedata.articles ,
    })
    } 
  }

  Handlepreclick = async ()=>{
    
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=56c28c132f5a419f867a3ca6727aadfe&page=${this.state.page - 1 }&pageSize=20` ;
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page : this.state.page - 1 ,
      articles : parsedata.articles
    })
  }
  
  constructor() {
    //run before render
    super();
    this.state = { 
      articles: [],
      loading: false,
      page : 1
    };
  }

  async componentDidMount(){
    let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=56c28c132f5a419f867a3ca6727aadfe&page=1" ;
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({articles : parsedata.articles , totalResults : parsedata.totalResults });
  }

  render() {
    return (
      <div className="container my-3 ">
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
          <div className="container d-flex justify-content-evenly">
          <button type="button" disabled={this.state.page <=1} class="btn btn-dark" onClick={this.Handlepreclick}> &larr; Previous</button>
          <button type="button"  class="btn btn-dark" onClick={this.Handlenextclick}>Next &rarr;</button>
          </div>
        </div>
    );
  }
}

export default News;
