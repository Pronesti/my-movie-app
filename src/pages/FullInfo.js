import React, { Component } from 'react';
import {Typography, Paper, CircularProgress} from '@material-ui/core';


export default class FullInfo extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         fetchedMovie:'',
      }
    }

    componentDidMount() {
      this.fetchOneMovie(this.props.match.params.id);
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
            this.setState({ fetchedMovie: data });
          })
          .catch(error => console.log(error));
      }

      renderGenres(movie) {
    try {
      return movie.genres.map(genre => genre.name + '. ');
    } catch {}
  }
    
  render() {
    var movie = this.state.fetchedMovie;
    const styles = {
      paper: {
        display: 'block',
        minWidth: '100%',
        minHeigth: '100%',
        padding: 25,
        boxShadow: '1',
        outline: 'none',
        margin: 0,
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

    if (this.state.fetchedMovie === ''){
        return <CircularProgress style={{position: 'absolute', left:'50%', top:'50%', transform:'translate(-50%, -50%)'}} />
    }

    return (
      <div>
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
              <Typography component='p' style={styles.information}>
                {movie.vote_average}
              </Typography>
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
      </div>
    )
  }
}
