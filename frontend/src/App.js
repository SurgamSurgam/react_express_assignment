import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import { Users } from "./Users.js";
import  SingleUser  from "./SingleUser.js";
import { AddUser } from "./AddUser.js";

class App extends Component {
  state = {
    usersData: [],
    formSubmitted: false,
    newUser: { username: "", phonenumber: "", email: "", password: "" },
    editing: null,
    errorMessage: '',
    numUserDisplayed: 2,
    offsetBy: 0,
  };

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = async (numUsers=2, offsetBy=0) => {
    let response = await axios.get("/users", {
    params: {
      limit: numUsers,
      offset: offsetBy
    }
  });
    this.setState({
      usersData: response.data.users,
      formSubmitted: false,
      offsetBy: response.data.users[0].id <= 1  || response.data.users[1].id <= 1 ? 0 : this.state.offsetBy + 2,
      numUserDisplayed: response.data.users[0].id <= 1 || response.data.users[1].id <= 1 ? 2 : this.state.numUserDisplayed,
    });
  };

  handleOnClick = e => {
    this.props.history.push(`/users/${e.target.value}`);
  };

  handleOnSubmit = e => {
    e.preventDefault();
    this.setState({
      formSubmitted: true
    });

    this.addUserToDB();
  };

  addUserToDB = () => {
    axios
      .post("/users", {
        username: this.state.newUser.username,
        phonenumber: this.state.newUser.phonenumber,
        email: this.state.newUser.email,
        password: this.state.newUser.password
      })
      .then(()=>{
        this.getAllUsers();
      })
      .then(()=>{
        this.resetState()
      })
      .then(()=> {
        this.props.history.push(`/users`);
        this.setState({
          errorMessage:''
        })
      })
      .catch(error => {
        console.log("ERROR", error);
        this.setState({
          errorMessage: error.message
        })
      });
  };

  resetState = () => {
    this.setState({
      formSubmitted: false,
      newUser: { ...this.state.newUser, username: "", phonenumber: "", email: "", password: "" },
      editing: null,
      errorMessage:''
    });
  };

  handleOnChange = e => {
    this.setState({
      newUser: { ...this.state.newUser, [e.target.name]: e.target.value }
    });
  };

  deleteUser = (id) => {
    axios.delete(`/users/${id}`)
    .then(()=> {
      this.getAllUsers();
    })
    .then(()=> {
      this.props.history.push(`/users`);
    })
  }

  toggleEditing = (id) => {
    if (this.state.editing !== id) {
      this.setState({
        editing: id
      })
    } else {
      this.resetState()
    }
  }

  handleEditSubmit = (e, id)=> {
    e.preventDefault();

    axios.patch(`/users/${id}`,
      this.state.newUser
    )
    .then(()=>{
      this.getAllUsers();
    })
    .then(()=>{
      this.resetState()
    })
    .catch(error => {
      console.log("ERROR on Edit Submit", error);
    });
  };


  render() {
    console.log("PROPS", this.props);
    console.log("STATE", this.state);

    return (
      <div className="app">
        <h1>Clone Users App</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/users">All Users</Link>
          <Link to="/users/add">Add User</Link>
        </nav>
        <Switch>
          <Route
            exact
            path="/users"
            render={() => (
              <Users
                usersData={this.state.usersData}
                handleOnClick={this.handleOnClick}
                getAllUsers={this.getAllUsers}
                formSubmitted={this.state.formSubmitted}
                errorMessage={this.state.errorMessage}
                resetState={this.resetState}
                numUserDisplayed={this.state.numUserDisplayed}
                offsetBy={this.state.offsetBy}
              />
            )}
          />
          <Route
            exact
            path="/users/add"
            render={props => (
              <AddUser
                {...props}
                handleOnSubmit={this.handleOnSubmit}
                newUser={this.state.newUser}
                handleOnChange={this.handleOnChange}
                errorMessage={this.state.errorMessage}
              />
            )}
          />
          <Route
            exact
            path="/users/:id"
            render={props => (
              <SingleUser {...props} usersData={this.state.usersData}
                deleteUser={this.deleteUser} editing={this.state.editing}
                toggleEditing={this.toggleEditing}
                newUser={this.state.newUser}
                handleOnChange={this.handleOnChange}
                handleEditSubmit={this.handleEditSubmit}
                updateChosenUser={this.updateChosenUser}
                getAllUsers={this.getAllUsers}
                resetState={this.resetState}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
