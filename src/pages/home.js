import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default () => {
  const [articles, setArticles] = useState([])
  const [readMore, setReadMore] = useState(null)
  const [innerWidth, setInnerWidth] = useState(window.innerWidth)
  useEffect(() => {
    const getArticles = async () => {
      const response = await fetch('/articles.json')
      const data = await response.json()
      setArticles(data)
    }
    getArticles()
    window.addEventListener("resize", resize);
  }, [])
  const resize = () => {
    setInnerWidth(window.innerWidth)
  }
  const showMore = (i) => {
    setReadMore(readMore === i ? null : i)
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
              <article key={i} >
                <h2 className="ui header"><a href="#/">{article.title}</a>
                  <div className="sub header">Written by <a href="#/">{article.author}</a> on {article.date}. </div>
                </h2>
                {
                  article.content.map((contentParagraph, j) => {
                    return <p key={j} className={j < 1 || readMore === i ? 'visible' : ''}>
                      {article.photo[j] ?
                        <img className={`ui medium ${j % 2 === 1 ? 'left' : 'right'} floated news-image image rounded`} width="200" src={article.photo[j]} alt="" />
                        : null}
                      {contentParagraph}
                    </p>
                  })
                }
                {readMore !== i && <button href="#/" className="ui large button teal read-more" onClick={() => showMore(i)}>Read More</button>}
                {articles.length !== i + 1 && <div className="ui divider"></div>}
              </article>
            )
          })}
        </div>
      </div >
    </div >
  )
}
