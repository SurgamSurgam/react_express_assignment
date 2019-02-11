import React from "react";
import axios from "axios";

class SingleUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenUser : {},
    }
  }

  componentDidMount() {
    let foundUser = this.props.usersData.find(user => {
      return +this.props.match.params.id === user.id;
    })

    if (foundUser) {
      this.updateChosenUser(foundUser)
    }
  }

// USER must be able to update 1 field keeping other data... On patch i'm updatin with empty strings
  updateChosenUser = (user) => {
    let clone = Object.assign({}, user);
    this.setState({
      chosenUser: clone
    })
  }

  handleOnChange = e => {
    this.setState({
      chosenUser: { ...this.state.chosenUser, [e.target.name]: e.target.value }
    });
  };

  handleEditSubmit = (e, id)=> {
    e.preventDefault();

    axios.patch(`/users/${id}`,
      this.state.chosenUser
    )
    .then(()=>{
      this.props.getAllUsers();
    })
    .then(()=>{
      this.props.resetState()
    })
    .catch(error => {
      console.log("ERROR on Edit Submit", error);
    });
  };

  render(){
  let { usersData, deleteUser, toggleEditing, editing } = this.props;

  let foundUser = usersData.find(user => {
    return +this.props.match.params.id === user.id;
  });

  return (
    <div className="singleUserDiv">
      <h2>Single User</h2>
      {/*first ternary checks if foundUser exists, if true then allow editing else show user.  If foundUser is false show null */}
      {foundUser ? (editing === foundUser.id ? (
        <>
          <ul className="singleUserUl editedUl">
            <li>Username: {foundUser.username}
              <input type='text' name="username"
                placeholder="Username"
                value={this.state.chosenUser.username}
                onChange={this.handleOnChange}/>
            </li>
            <li>Phone: {foundUser.phonenumber}
              <input type="text"
                name="phonenumber"
                placeholder="Phone Number"
                value={this.state.chosenUser.phonenumber}
                onChange={this.handleOnChange}/>
            </li>
            <li>Email: {foundUser.email}
              <input type="text"
                name="email"
                placeholder="Email"
                value={this.state.chosenUser.email}
                onChange={this.handleOnChange}/>
            </li>
          </ul>
          <div className='singleUserButtons'>
            <button onClick={()=>{toggleEditing(foundUser.id)}}>CANCEL</button>
            <button onClick={(e)=>{this.handleEditSubmit(e, foundUser.id)}}>SUBMIT</button>
          </div>
        </>
      ): (
        <>
          <ul className="singleUserUl">
            <li>Username: {foundUser.username}</li>
            <li>Phone: {foundUser.phonenumber}</li>
            <li>Email: {foundUser.email}</li>
          </ul>
          <div className='singleUserButtons'>
            <button onClick={()=>{toggleEditing(foundUser.id)}}>EDIT</button>
            <button onClick={()=>{deleteUser(foundUser.id)}}>DELETE</button>
          </div>
        </>
      )
      ) : null}
    </div>
  );
}
};

export default SingleUser
