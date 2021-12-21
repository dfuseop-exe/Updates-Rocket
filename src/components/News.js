import React, { useEffect , useState } from "react";
import Newsitem from "./Newsitem";

import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";



const News = (props) => {
 
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, settotalResults] = useState(0)

  
    const updatenews = async () =>{
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=756fbd905f3a4aa09a2ee5af62339cd9&page=${page}&pageSize=${props.pageSize}`;

    setLoading(true) ;
    
    let data = await fetch(url);
    props.setProgress(40);
    let parsedata = await data.json();
    console.log(parsedata);
    props.setProgress(80);

    setArticles(parsedata.articles);
    settotalResults(parsedata.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    document.title = `Update-Rocket | ${capitalize(props.category)}`
    updatenews();
    // eslint-disable-next-line 
  }, [])


  const fetchMoreData = async () => {
    
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=756fbd905f3a4aa09a2ee5af62339cd9&page=${page+1}&pageSize=${props.pageSize}`;

    setPage(page + 1)
   
    let data = await fetch(url);
    let parsedata = await data.json();
    
    setArticles(articles.concat(parsedata.articles));
    settotalResults(parsedata.totalResults)
    
  }

  const capitalize = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }


    return (
      <div className="container my-3 ">
        <h1 className="text-center" style={{ margin: "28px" , marginTop : "80px" ,fontWeight : 'bold', fontFamily:'Varela'}}>
          {`Update-Rocket - Top ${capitalize(props.category)} Headlines`}
        </h1>
        {loading && <Spinner />}
        
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >

          <div className="container">
          <div className="row ">
            {articles.map((element) => {
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
                    itemmode={props.mode}
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


News.defaultProps = {
  country: "in",
  pageSize: 6,
  category: "general",
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News;
