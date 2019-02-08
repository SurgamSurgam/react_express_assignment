import React, { Component } from "react";
import axios from "axios";
import { Route, Switch, Link, withRouter } from "react-router-dom";
import { Users } from "./Users.js";
import { SingleUser } from "./SingleUser.js";
import { AddUser } from "./AddUser.js";

class App extends Component {
  state = {
    usersData: [],
    formSubmitted: false,
    newUser: { username: "", email: "", password: "" }
  };

  componentDidMount() {
    this.getAllUsers();
  }
  //Took it out of CDM so I can call it again to show info with updated User
  getAllUsers = async () => {
    let response = await axios.get("http://localhost:3001/users");
    this.setState({
      usersData: response.data.users,
      formSubmitted: false
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
      .post("http://localhost:3001/users/", {
        username: this.state.newUser.username,
        email: this.state.newUser.email,
        password: this.state.newUser.password
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  resetState = () => {
    this.setState({
      formSubmitted: false,
      newUser: { ...this.state.newUser, username: "", email: "", password: "" }
    });
  };

  handleOnChange = e => {
    this.setState({
      newUser: { ...this.state.newUser, [e.target.name]: e.target.value }
    });
  };

  render() {
    console.log("PROPS", this.props);
    console.log("STATE", this.state);
    return (
      <div className="App">
        <h1>Clone Users App</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/users">All Users</Link>
          {/*<Link to="/users/:id">User</Link>*/}
          <Link to="/users/:id/edit">Edit User</Link>
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
              />
            )}
          />
          <Route
            exact
            path="/users/:id"
            render={props => (
              <SingleUser {...props} usersData={this.state.usersData} />
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
