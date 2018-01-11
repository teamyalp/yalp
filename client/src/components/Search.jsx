import React from 'react'

class Search extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            input: ''
        }
    }


    handleSearch() {
        //will call function that is passed into props with this.state.input 
        //i.e. this.props.[FUNCTION](this.state.input)
        console.log(this.refs.search.value)
    }

    handleChange(e) {
        this.setState({
            input: e.target.value
        })
    }


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