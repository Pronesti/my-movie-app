import React, { Component } from 'react';
import { Modal, Paper, Typography} from '@material-ui/core';
import AppBar from './components/PrimarySearchAppBar';
import MovieTile from './components/MovieTile';
import Stars from './components/Stars';
import PersistentDrawerLeft from './components/PersistentDrawerLeft';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movie_array: [],
      keyword: '',
      open: false,
      drawer:false,
      modalMovie: {}
    };
    this.searchBar = this.searchBar.bind(this);
    this.changeModal = this.changeModal.bind(this);
    this.buttonDrawer = this.buttonDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
  }

  searchBar(value) {
    if(value === ""){
      this.fetchPopularMovies();
      this.setState({
        keyword: ""
      });
    }else{
        this.setState({
          keyword: value
        });
    }
  }

  componentDidMount() {
    this.fetchPopularMovies();
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

  fetchOneMovie(id) {
    fetch(
      'https://api.themoviedb.org/3/movie/' +
        id +
        '?api_key=0a526ebbf759dee3240c8de2525ab82c',
      { method: 'GET' }
    )
      .then(response => response.json())
      .then(data => {
        this.setState({ modalMovie: data });
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

  handleClose = () => {
    this.setState({ open: false });
  };

  renderGenres(movie) {
    try {
      return movie.genres.map(genre => genre.name + '. ');
    } catch {}
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

  renderModal() {
    var movie = this.state.modalMovie;
    const styles = {
      paper: {
        position: 'absolute',
        top: '25vh',
        minWidth: '100%',
        minHeigth: '90%',
        padding: 25,
        boxShadow: '1',
        outline: 'none',
        maxWidth: '50vw'
      },
      leftDiv: {
        float: ' left'
      },
      rightDiv: {
        display: 'inline',
        verticalAlign: 'middle'
      },
      poster: {
        padding: 5
      },
      subTitle: {
        fontSize: 16,
        fontWeight: 'bold'
      },
      information: {
        color: 'grey'
      },
      overview: {
        textAlign: 'justify', 
      },
      overviewDiv:{
        display: 'block', maxWidth: '90%', float: 'none', clear: 'both', overflowY: 'auto', height: 100
      }, 
      title:{
        textAlign: 'center', paddingBottom: 10
      }
    };

    if (this.state.modalMovie !== {}) {
      return (
        <Modal open={this.state.open} onClose={this.handleClose}>
          <Paper elevation={1} style={styles.paper}>
            <Typography variant='h5' component='h3' style={styles.title} >
              {movie.title}
            </Typography>
            <div style={styles.leftDiv}>
              <img
                src={
                  'https://image.tmdb.org/t/p/w185_and_h278_bestv2/' +
                  movie.poster_path
                }
                alt=''
                style={styles.poster}
              />
            </div>
            <div style={styles.rightDiv}>
              <Typography component='h3' style={styles.subTitle}>
                Release Date
              </Typography>
              <Typography component='p' style={styles.information}>
                {movie.release_date}
              </Typography>
              <Typography component='h3' style={styles.subTitle}>
                RunTime
              </Typography>
              <Typography component='p' style={styles.information}>
                {movie.runtime}
              </Typography>
              <Typography component='h3' style={styles.subTitle}>
                Genres
              </Typography>
              <Typography component='p' style={styles.information}>
                {this.renderGenres(movie)}
              </Typography>
              <Typography component='h3' style={styles.subTitle}>
                Rating
              </Typography>
              <Stars rating={movie.vote_average} />
            </div>
            <div style={styles.overviewDiv}>
              <Typography component='h3' style={styles.subTitle}>
                Overview
              </Typography>
              <Typography component='p' style={styles.overview}>
                {movie.overview}
              </Typography>
            </div>
          </Paper>
        </Modal>
      );
    }
  }

  changeModal(id) {
    this.fetchOneMovie(id);
    this.setState({ open: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.keyword !== this.state.keyword && this.state.keyword !== "") {
      this.fetchThisMovie(this.state.keyword);
    }
  }

  buttonDrawer(){
    this.setState({drawer: !this.state.drawer});
    console.log(this.state);
  }

  closeDrawer(){
    this.setState({drawer: false});
  }

  render() {
    return (
      <div className='App'>
        <AppBar searchBar={this.searchBar} buttonDrawer={this.buttonDrawer} />
        <PersistentDrawerLeft drawer={this.state.drawer} closeDrawer={this.closeDrawer} />
        {this.renderTitle()}
        {this.renderAllResults()}
        {this.renderModal()}
      </div>
    );
  }
}

export default App;
