/*
Dedicate as much time as you think you need on this test, we will be evaluating presentation (UI/UX) over anything else for this piece of work.
Instructions: 
1) Create a website using either React Hooks or React-Redux, with an interface made using Semantic UI React as the UI framework, and add any piece of Custom CSS/Modules where you think its needed (extra points for this).
2) This website should have a Home and a Friends page
On the Home page please display multiple articles with a picture, a description and an author, with a show-more button for the description section.
On the Friends page display multiple users' pictures, for which a full profile is displayed when clicking on it on a popup/modal window (Age , Date of Birth ,etc)
3) All of the above needs to be responsive.
4) None of these pages need to connect to a backend, all the data will be pre loaded JSONs that you will need to create.
5) You will be evaluated in the quality of the design, layout, color palette used, UX , positioning of elements and the data used to present on the interface.
6) Write as much custom CSS/Sass as you can as this is a key requirement of the job.
Good luck!
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import * as serviceWorker from './serviceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'
import { rootReducer } from './store/index'

import Header from './components/header'
import Footer from './components/footer'
import Home from './pages/home'
import Friends from './pages/friends'
import DragDrop from './pages/dragdrop'
import './index.css'

const persistedReducer = persistReducer({ key: 'root', storage }, rootReducer)
const store = createStore(persistedReducer)
const persistor = persistStore(store)

const AppRoute = ({ component: Component, ...rest }) => {
  return <Route
    {...rest} render={props => (
      <div>
        <Header {...props} />
        <Component {...props} />
        <Footer />
      </div>
    )}
  />
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Switch>
          <AppRoute exact path="/" component={Home} />
          <AppRoute exact path="/friends" component={Friends} />
          <AppRoute exact path="/dragndrop" component={DragDrop} />
        </Switch>
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
