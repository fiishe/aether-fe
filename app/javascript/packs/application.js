/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb

import React from 'react'
import { render } from 'react-dom'

import App from '../react/app'
import NotFoundPage from '../react/pages/NotFoundPage'
import RedBox from 'redbox-react'

import configureStore from '../react/redux/store/configureStore'

const store = configureStore()
const appWithStore = <App store={store} />

document.addEventListener('DOMContentLoaded', () => {
  let rootElement = document.getElementById('app')

  if (rootElement) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(appWithStore, rootElement)
      } catch (e) {
        render(<RedBox error={e} />, rootElement)
      }
    }
    else {
      render(appWithStore, rootElement)
    }
  }
})
