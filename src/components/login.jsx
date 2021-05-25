/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
import React from 'react'
import axios from 'axios'
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import '../styles/login.css'

class Login extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      password: ''

    }
  }

    handleChange=(e) => {
      this.setState({
        [e.target.name]: e.target.value
      }, () => console.log(this.state))
    }

    handleSubmit=(e) => {
      e.preventDefault()
      console.log('updated state', this.state)
      axios.post('https://dev-dl.tdcx.com:3092/login', {
        name: this.state.name,
        apiKey: this.state.password
      }).then((response) => {
        localStorage.setItem('name', this.state.name)
        localStorage.setItem('login', true)
        this.props.history.push({ pathname: '/DashBoard', token: response.data.token.token })
      })
    }

    render () {
      return (<div>
            <div className="row">
                <div className="col-md-3"/>
                <div className="col-md-6">

    <Card >
        <div className="row">
       <div className="col-md-2"/>
       <div className="col-md-6">
       <h3 className="title">Login</h3><br/>
        <TextField variant="outlined" placeholder="Name" name="name" value={this.state.name} onChange={this.handleChange}/><br/><br/>
        <TextField variant="outlined"type="password" placeholder="password" name="password" value={this.state.password} onChange={this.handleChange} /><br/><br/>
        <Button variant="contained" color="primary" onClick={this.handleSubmit} >Login</Button><br/><br/>
        </div>
        </div>
    </Card>

                </div>
                <div className="col-md-3"/>
            </div>

        </div>)
    }
}
export default Login
