import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';


export default class MovieTile extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       loading: true,
       img: null
    }
  }
  
  componentDidMount() {
    if (this.props.title !== ""){
      this.setState({loading: false})
    }
  }
  
  render() {
    var styles = {
      MovieTile:{padding: 2, display: 'inline-flex', flex: '1 0 21%'},
      NoImage:{width: 185, heigth: 278, verticalAlign: 15}
    };
      if (this.state.loading){
        return <CircularProgress />
      }
      if (!this.props.url){
        return <img src="https://www.classicposters.com/images/nopicture.gif" style={styles.NoImage} alt='' />
      }
    return (
      <div style={styles.MovieTile} onClick={() => this.props.changeModal(this.props.id)}>
        <img src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' + this.props.url} alt={this.props.title} />
      </div>
    )
  }
}
