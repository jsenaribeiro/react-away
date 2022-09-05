import React from 'react'

import './index.css'
import App from './App'
import Store from './Store'
import locales from './locales'
import ReactDOM, { listener } from '../lib'

ReactDOM.createRoot(false, "#root", <App />, Store)
   .globalization(locales, true)
   .authentication("GET", false, true)
      .login("http://localhost:4000/login")
      .token(s => s.access_token)
      .route("/", "/unauthorized")