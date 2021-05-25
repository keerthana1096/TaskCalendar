/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
// import MenuIcon from '@material-ui/icons/Menu'
import { AccountCircle } from '@material-ui/icons'
import Login from './login'
import DashBoard from './dashBoard'
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function NavBar () {
  const classes = useStyles()
  localStorage.setItem('name', 'Guest')
  localStorage.setItem('login', false)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <AccountCircle />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           {localStorage.getItem('name')}
          </Typography>
       <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <br/>
      <br/>
    </div>

  )
}
