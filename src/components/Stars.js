import React, { Component,Fragment } from 'react'

export default class Stars extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         stars: 0
      }
    }

    componentDidMount() {
      this.setState({stars: this.props.rating})
    }

  render() {
      let stars = [];
      console.log(stars)
        for (let index = 0; index < this.state.stars; index++) {
            stars.push(<Fragment>★</Fragment>);
        }
        for (let index = 0; index < 10 - this.state.stars; index++) {
            stars.push(<Fragment>☆</Fragment>);
        }


        return(<Fragment>{stars}</Fragment>)
  }
}