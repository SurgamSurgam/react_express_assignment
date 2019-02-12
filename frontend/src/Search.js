import React from 'react';

class Search extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      foundQuery: [],
      currentSearch: ''
    }
  }

  handleTextChange = e => {
    this.setState({
      currentSearch: e.target.value
    });
  };

  getSearchedInfo = e => {
    e.preventDefault();
    let { currentSearch } = this.state;
    let foundQuery = this.props.usersData.find(query => {
      return (query.username.toLowerCase() === currentSearch.toLowerCase() || query.phonenumber === currentSearch) ;
    });

    this.setState({
      foundQuery: foundQuery ? foundQuery : "Not Found",
      currentSearch: "",
    });
  };

  render(){
    console.log(this.state);
    return (
      <>
        <div className="searchDiv">
          <h1>Search for a person or phone or click on a user</h1>
          <form onSubmit={this.getSearchedInfo}>
            <input
              type="text"
              value={this.state.currentSearch}
              onChange={this.handleTextChange}
              placeholder="Find Person/Phone"
            />
            <input type="submit" />
          </form>
        </div>
        {this.state.foundQuery.username ? (
          <li className="foundInfoDiv" key={this.state.foundQuery.id} onClick={this.props.handleOnClick} value={this.state.foundQuery.id}>
            Username: {this.state.foundQuery.username} <br />
            Phone: {this.state.foundQuery.phonenumber} <br />
            Email: {this.state.foundQuery.email}
          </li>
        ) : (
          <h2>{this.state.foundQuery}</h2>
        )}
      </>
    )
  }
}

export default Search
