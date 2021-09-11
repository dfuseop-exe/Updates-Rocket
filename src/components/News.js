import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };


  async updatenews(){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=56c28c132f5a419f867a3ca6727aadfe&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(40);
    let parsedata = await data.json();
    console.log(parsedata);
    this.props.setProgress(80);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });

    this.props.setProgress(100);
  }

  Handlenextclick = async () => {
      this.setState({
        page: this.state.page + 1,
      });
      this.updatenews();
    }
  

  Handlepreclick = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.updatenews();
  };

   fetchMoreData = async () => {
    this.setState({
      page : this.state.page + 1
    })
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=756fbd905f3a4aa09a2ee5af62339cd9&page=${this.state.page}&pageSize=${this.props.pageSize}`;
   
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: this.state.articles.concat(parsedata.articles),
      totalResults: parsedata.totalResults,
   
    });
  }

  capitalize = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    //run before render
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults : 0
    };

    document.title = `Update-Rocket | ${this.capitalize(this.props.category)}`
  }

  async componentDidMount() {
   this.updatenews();
  }

  render() {
    return (
      <div className="container my-3 ">
        <h1 className="text-center" style={{ margin: "28px"}}>
          {`Update-Rocket - Top ${this.capitalize(this.props.category)} Headlines`}
        </h1>
        {this.state.loading && <Spinner />}
        
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >

          <div className="container">
          <div className="row ">
            {this.state.articles.map((element) => {
              return <div className="col-md-4" key={element.url}>
                  <Newsitem
                    title={element.title ? element.title : "Default Title"}
                    description={
                      element.description ? element.description : "Default Desc"
                    }
                    imageurl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg"
                    }
                    newsurl={element.url}
                    itemmode={this.props.mode}
                    date = {element.publishedAt}
                    author = {!element.author ? "Unknown" : element.author}
                    source = {element.source.name}
                  />
                </div>
            
            })}
            </div>
          </div>
        
        </InfiniteScroll> 
      </div>
    );
  }
}

export default News;
