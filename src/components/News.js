import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

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

  Handlenextclick = async () => {
    if (
      !(
        this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize)
      )
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${
        this.props.country
      }&category=${
        this.props.category
      }&apiKey=56c28c132f5a419f867a3ca6727aadfe&page=${
        this.state.page + 1
      }&pageSize=${this.props.pageSize}`;

      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedata = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parsedata.articles,
        loading: false,
      });
    }
  };

  Handlepreclick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=56c28c132f5a419f867a3ca6727aadfe&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parsedata.articles,
      loading: false,
    });
  };

  constructor() {
    //run before render
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=56c28c132f5a419f867a3ca6727aadfe&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedata = await data.json();
    console.log(parsedata);
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
  }

  render() {
    return (
      <div className="container my-3 ">
        <h1 className="text-center" style={{ margin: "28px" }}>
          Updates-Rocket Top Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <div className="row ">
          {!this.state.loading &&
            this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
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
              );
            })}
        </div>
        <div className="container d-flex justify-content-evenly">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className={`btn btn-${this.props.mode === "light" ? "dark" : "light"}`}
            onClick={this.Handlepreclick}
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            className={`btn btn-${this.props.mode === "light" ? "dark" : "light"}`}
            onClick={this.Handlenextclick} 
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
