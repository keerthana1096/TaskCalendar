/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React from 'react'
// import Login from './components/login'
import NavBar from './components/navBar'
import Login from './components/login'
import DashBoard from './components/dashBoard'
import { Route, Link, Switch } from 'react-router-dom'
class App extends React.Component {
  render () {
    return (<div>
        <NavBar/>
    <br/>
    <br/>
    <Switch>
<Route path="/" exact strict component={Login} />
<Route path="/DashBoard" exact component={DashBoard}/>
</Switch>
        </div>)
  }
}
export default App
