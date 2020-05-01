import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default () => {
  const [articles, setArticles] = useState([])
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch('/articles.json')
      const data = await response.json()
      setArticles(data)
      console.log(setArticles)
    }
    getArticles()
    window.addEventListener("resize", resize);
  }, [])
  const resize = () => {
    setInnerWidth(window.innerWidth)
  }
  return (
    <div className="ui container content">
      <div className="ui stackable grid">
        <div className="four wide column sidebar">
          <div className={`ui ${innerWidth > 767 ? 'vertical' : 'horizontal'} pointing secondary menu`}>
            <Link to="/" className="active item">Home</Link>
            <Link to="/friends" className="item">Friends</Link>
            <Link to="/test" className="item">Test</Link>
            <a href="#/" className="item">Fun</a>
            <a href="#/" className="item">Weasels</a>
          </div>
        </div>
        <div className="twelve wide column">
          {articles.map((article, i) => {
            return (
              <article key={i}>
                <h2 className="ui header"><a href="#/">{article.title}</a>
                  <div className="sub header">Written by <a href="#/">{article.author}</a> on {article.date}. </div>
                </h2>
                <p>
                  <img className={`ui medium ${3 % 2 === 1 ? 'right' : 'left'} floated news-image image rounded transition visible`} width="200" src={article.photo[0]} alt="" />
                  {article.content[0]}
                </p>
                <a href="#/" className="ui large button teal read-more">Read More</a>
                {articles.length !== i + 1 && <div className="ui divider"></div>}
              </article>
            )
          })}
        </div>
      </div >
    </div >
  )
}

// article.content.map((contentParagraph, j) =>
//   <p key={j}>
//     {article.photo[j] ?
//       <img className={`ui medium ${j % 2 === 1 ? 'right' : 'left'} floated image transition visible`} width="200" src={article.photo[j]} alt="" />
//       : null}
//     {contentParagraph}
//   </p>
// )