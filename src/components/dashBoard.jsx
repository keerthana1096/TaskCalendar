/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
import React from 'react'
// import Card from '@material-ui/core/Card'
import NoTask from './noTask'
import Tasks from './tasks'
import axios from 'axios'
class DashBoard extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: [],
      uncompletedTasks: '',
      completedTasks: '',
      token: this.props.location.token

    }
  }

  componentDidMount () {
    axios.get('https://dev-dl.tdcx.com:3092/tasks', { headers: { Authorization: 'Bearer ' + this.state.token } }).then((response) => {
      const res = response.data.tasks
      this.setState({
        tasks: res
      }, () => { console.log('tasks state', this.state.tasks) })
    })
  }

  render () {
    return (<div>

{this.state.tasks == '' ? <div><NoTask apitoken={this.state.token}/></div> : <div><Tasks token={this.state.token} data={this.state.tasks}/></div>}
        </div>)
  }
}
export default DashBoard
