import React from 'react'

class Search extends React.Component {
    constructor(props) {
        super(props)
<<<<<<< HEAD
=======

        this.state = {
            input: ''
        }
>>>>>>> 9872bf7b9917c157b1f9d9a59fa90fa692590748
    }


    handleSearch() {
        //will call function that is passed into props with this.state.input 
        //i.e. this.props.[FUNCTION](this.state.input)
        console.log(this.refs.search.value)
    }

<<<<<<< HEAD
=======
    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }


>>>>>>> 9872bf7b9917c157b1f9d9a59fa90fa692590748
    render() {
        return (
            <div>
                <input ref="search" type="text" />
                <button onClick={this.handleSearch.bind(this)}>Submit</button>
            </div>

        )
    }
}

export default Search;