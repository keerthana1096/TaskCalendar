/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import React from 'react'
import Card from '@material-ui/core/Card'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { PieChart } from 'react-minimal-pie-chart'
import Checkbox from '@material-ui/core/Checkbox'
import SearchBar from 'material-ui-search-bar'
// import TaskDashboard from './tasksDashboard'
class Tasks extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      data: this.props.data,
      token: this.props.token,
      newTask: '',
      completedTasks: '',
      totalTasks: '',
      latestTasks: [],
      edit: false,
      editTask: '',
      id: '',
      completed: false,

      searchValue: ' '
    }
  }

    handleClick = () => {
      this.setState({
        open: true
      }, () => console.log(this.state.open))
    }

      handleClose=() => {
        this.setState({
          open: false,
          edit: false,
          searchValue: ''
        }, () => console.log(this.state.open))
        this.getTasks()
      }

      handleChange=(e) => {
        this.setState({
          newTask: e.target.value
        })
      }

    getTasks=() => {
      axios.get('https://dev-dl.tdcx.com:3092/tasks', { headers: { Authorization: 'Bearer ' + this.state.token } }).then((response) => {
        const res = response.data.tasks
        this.setState({
          data: res
        })
      })
    }

    getDashboard=() => {
      axios.get('https://dev-dl.tdcx.com:3092/dashboard', { headers: { Authorization: 'Bearer ' + this.state.token } }).then((response) => {
        console.log('dashboard response', response)
        this.setState({
          completedTasks: response.data.tasksCompleted,
          totalTasks: response.data.totalTasks,
          latestTasks: response.data.latestTasks
        }, () => { console.log('task dashboard state', this.state) })
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
       this.getTasks()
       this.getDashboard()
       this.setState({
         open: false
       })
     }

     onEdit=(id, name) => {
       console.log('edit id', id)
       this.setState({
         edit: true,
         editTask: name,
         id: id
       })
     }

    onDelete=(id) => {
      axios.delete('https://dev-dl.tdcx.com:3092/tasks/' + id, {
        headers: {
          Authorization: 'Bearer ' + this.state.token
        }
      }).then((response) => {
        this.getTasks()
        this.getDashboard()
      })
    }

    handleCheck=(id, comp) => {
      axios.put('https://dev-dl.tdcx.com:3092/tasks/' + id, {

        completed: !comp
      }, {
        headers: {
          Authorization: 'Bearer ' + this.state.token
        }
      }).then((response) => {
        this.getTasks()
        this.getDashboard()
      })
    }

handleEdit=() => {
  axios.put('https://dev-dl.tdcx.com:3092/tasks/' + this.state.id, {
    name: this.state.editTask,
    completed: this.state.completed
  }, {
    headers: {
      Authorization: 'Bearer ' + this.state.token
    }
  }).then((response) => {
    this.getTasks()
    this.getDashboard()
  })
  this.setState({
    edit: false,
    completed: false
  })
}

onSearch=(value) => {
  this.setState({
    searchValue: value
  })
}

handleSearch=() => {
    console.log(this.state.searchValue)
  const newlyDisplayed = this.state.data.filter(data => (data.name.toLowerCase().includes(this.state.searchValue.toLowerCase())))
  console.log('result', newlyDisplayed)
  this.setState({
    data: newlyDisplayed
  })
}

componentDidMount () {
  this.getDashboard()
}

render () {
  return (<div>

<div className="row">
                <div className='col-md-4'>
                    <Card>
                       <h3>Tasks Completed</h3>
                       <br/>
                       <br/>
                       <h2>{this.state.completedTasks}/{this.state.totalTasks}</h2>
                        </Card>
                </div>
                <div className='col-md-4'>
                    <Card>
                        <h3>Latest Created tasks</h3>
                        
                         {this.state.latestTasks.map((i, key) => {
                           return (<h6><list><ol>{i.name}</ol></list></h6>)
                         })}
                       
                        </Card>
                </div>
                <div className='col-md-3'>
                    <Card>
                   <center> <PieChart
  data={[
    { title: 'One', value: this.state.completedTasks, color: '#6600ff' },
    { title: 'Two', value: this.state.totalTasks, color: ' #d6d6c2' }
  ]}
  radius='50'
  viewBoxSize='[100, 100]'
/>;</center>
                        </Card>
                </div>

            </div>
<br/>
<br/>
            <div className="row">
                <div className="col-md-6"/>
                <div className="col-md-3">    <SearchBar
                        placeholder='Please click enter after typing '
                        value={this.state.searchValue}
                        onCancelSearch={this.handleClose}
                        onChange={(value) => this.onSearch(value)}
                        onRequestSearch={this.handleSearch}
                    /></div>
                <div className="col-md-3">
                <Button variant="contained" color="primary" onClick={this.handleClick}>NewTask</Button>
                </div>
            </div>
<br/>
<br/>
            <Card>
            {this.state.data != null
              ? this.state.data.map((i, key) => {
                return (<div className="row"><div className="col-md-6"> <Checkbox

                onChange={() => this.handleCheck(i._id, i.complete)}
                />{i.name}</div><div className="col-md-6"><Button onClick={() => this.onEdit(i._id, i.name)}><EditIcon /></Button><Button onClick={() => this.onDelete(i._id)}> <DeleteIcon/></Button></div></div>)
              })
              : null}
            </Card>
            <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                      <DialogContent>
                          <TextField variant="outlined" placeholder="enter your task" onChange={this.handleChange}></TextField>
                      </DialogContent>
                      <DialogActions>
                          <Button variant="contained" color="primary" onClick={this.handleSubmit}>New Task</Button>
                      </DialogActions>
                  </Dialog>
                  <Dialog open={this.state.edit} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                      <DialogContent>
                       <p>{this.state.editTask}</p>
                          <TextField variant="outlined" placeholder="enter your edited task" value ="" onChange={(value) => { this.setState({ editTask: value }) }}></TextField>
                    <br/>  <Checkbox

        onChange={() => this.setState({ completed: !this.state.completed })}
        inputProps={{ 'aria-label': 'Completed' }}
      />Completed
                      </DialogContent>
                      <DialogActions>

                          <Button variant="contained" color="primary" onClick={this.handleEdit}>Edit Task</Button>
                      </DialogActions>

                  </Dialog>
        </div>)
}
}
export default Tasks
