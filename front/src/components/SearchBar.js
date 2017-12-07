// Search option for choosing statuses


<div>
  <input
    className="status-search-input"
    placeholder="What are you up to today?"
    onChange={(e) => {this.setState({statusSearchValue: e.target.value}, () => {
      this.searchStatuses(this.props.genericReducer.statusSearchValue)
  });
     }}
    ></input>


</div>



//Search the database for available statuses
  searchStatuses = (searchInput) => {
    console.log(searchInput)
    axios
      .get('http://localhost:4000/api/statuses?searchValue=' + this.props.genericReducer.statusSearchValue
      )
      .then((response) => {
        this.setState({searchResultArray: response.data})
      })
      .catch((error) => {
        console.log(error);
      })
  }
