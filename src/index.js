/* eslint-disable no-use-before-define */
import React from 'react'
import ReactDOM from 'react-dom'
import 'regenerator-runtime/runtime'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
const mountNode = document.getElementById('app')
ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, mountNode)
