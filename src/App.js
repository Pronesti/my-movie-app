import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core';
import AppBar from './components/PrimarySearchAppBar';
import MovieTile from './components/MovieTile';

class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       data: {title: "", poster_path:""},
       movie_array: [],
       keyword: ""
    }
    this.searchBar = this.searchBar.bind(this)
  }
  
  searchBar(value) {
    setTimeout(() => {
      this.setState({
        keyword: value
      });
    }, 1000);  
  }

  componentDidMount(){
   this.fetchThisMovie("batman");
  }

  fetchThisMovie(string){
    fetch('https://api.themoviedb.org/3/search/movie?api_key=0a526ebbf759dee3240c8de2525ab82c&query=' + string , {method: 'GET'})
    .then(response => response.json())
    .then(data => {this.setState({movie_array: data.results})})
    .catch(error => console.log(error))
  }

  fetchOneMovie(){
    fetch('https://api.themoviedb.org/3/movie/535?api_key=0a526ebbf759dee3240c8de2525ab82c', {method: 'GET'})
    .then(response => response.json())
    .then(data => {this.setState({data})})
    .catch(error => console.log(error))
  }

  renderAllResults(){
    try{
      if (this.state.movie_array.length > 1){
        return this.state.movie_array.map((movie, index) => <MovieTile id={movie.id} title={movie.title} url={movie.poster_path} key={index} />)
      }
    }
    catch(err){ 
    }
  }

 componentDidUpdate(prevProps, prevState) {
   if(prevState.keyword !== this.state.keyword){
    this.fetchThisMovie(this.state.keyword);
   }
 }

  render() {
    return (
      <div className="App">
    <AppBar searchBar={this.searchBar}/>
      {this.state.data.title !== "" && <MovieTile id={this.state.data.id} title={this.state.data.title} url={this.state.data.poster_path}/>}
      {this.renderAllResults()}
      </div>
    );
  }
}

export default App;
