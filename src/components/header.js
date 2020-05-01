import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
export default (props) => {
  const dispatch = useDispatch()
  const { pathname } = props.location
  const title = useSelector(state => state.title)
  if (pathname === '/friends') {
    dispatch({ type: 'SET_TITLE', data: 'Jarvis Friends' })
  } else {
    dispatch({ type: 'SET_TITLE', data: 'Jarvis Blog' })
  }
  return (
    <div className="ui borderless menu fixed">
      <div className="ui container">
        <span className="item brand">{title}</span>
        <div className="right menu">
          <div className="item">
            <Link to="/" className={`ui teal ${pathname === '/' && 'button'}`}>Home</Link>
          </div>
          <div className="item">
            <Link to="/friends" className={`ui teal ${pathname === '/friends' && 'button'}`}>Friends</Link>
          </div>
          {/* <div className="item">
            <Link to="/dragndrop" className="teal">Drag & Drop</Link>
          </div> */}
        </div>
      </div>
    </div>
  )
}