/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
import React from 'react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import axios from 'axios'
class NoTask extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: false,
      newTask: '',
      token: this.props.apitoken
    }
  }

  handleClick = () => {
    this.setState({
      open: true
    }, () => console.log(this.state.open))
  }

  handleClose=() => {
    this.setState({
      open: false
    }, () => console.log(this.state.open))
  }

  handleChange=(e) => {
    this.setState({
      newTask: e.target.value
    })
  }

 handleSubmit=() => {
   axios.post('https://dev-dl.tdcx.com:3092/tasks', {
     name: this.state.newTask,
     completed: false
   }, {
     headers: {
       Authorization: 'Bearer ' + this.state.token
     }
   }
   ).then((response) => {
     console.log(response)
   })
 }

 render () {
   return (<div>
            <br/>
            <br/>
          <Grid container spacing={1}>
              <Grid xs={3}/>
              <Grid xs={5} item>
                  <Card>
                      You have no tasks<br/>
                      <Button variant="contained" color="primary" onClick={this.handleClick}>Add tasks</Button>
                  </Card>
                  <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                      <DialogContent>
                          <TextField variant="outlined" placeholder="enter your task" onChange={this.handleChange}></TextField>
                      </DialogContent>
                      <DialogActions>
                          <Button variant="contained" color="primary" onClick={this.handleSubmit}>New Task</Button>
                      </DialogActions>
                  </Dialog>
              </Grid>
          </Grid>
        </div>)
 }
}
export default NoTask
