import React, { Component } from 'react';
import {Typography} from '@material-ui/core';
import MovieTile from './../components/MovieTile';
import {Grid, Row} from 'react-flexbox-grid';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie_array: [],
      keyword: '',
      open: false,
      drawer:false,
      modalMovie: {}
    };
  }

  componentDidMount() {
    this.fetchPopularMovies();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.keyword !== this.props.keyword && this.props.keyword !== "") {
      this.fetchThisMovie(this.props.keyword);
    }
  }

  fetchPopularMovies() {
    fetch(
      'https://api.themoviedb.org/3/movie/popular?api_key=0a526ebbf759dee3240c8de2525ab82c&language=en-US',
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ movie_array: data.results });
      })
      .catch(error => console.log(error));
  }

  fetchThisMovie(text) {
    fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=0a526ebbf759dee3240c8de2525ab82c&query=' +
        text,
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ movie_array: data.results });
      })
      .catch(error => console.log(error));
  }

  renderAllResults() {
    try {
      if (this.state.movie_array.length > 1) {
        return this.state.movie_array.map((movie, index) => (
          <MovieTile
            id={movie.id}
            title={movie.title}
            url={movie.poster_path}
            key={index}
            changeModal={this.changeModal}
          />
        ));
      }
    } catch (err) {}
  }

  renderTitle(){
    if(this.state.keyword === "" || this.state.keyword === " "){
      return (<Typography variant='h5' component='h3' >
      Popular Movies
    </Typography>)
    }else{
      return(<Typography variant='h5' component='h3' >
      Searching for {this.state.keyword}
    </Typography>)
    }
  }
 
  render() {
    return (
      <div className='Home'>
        <Grid >
        <Row>
        {this.renderTitle()}    
        </Row>
        <Row>
        {this.renderAllResults()}   
        </Row>
        </Grid> 
      </div>
    );
  }
}

export default Home;
