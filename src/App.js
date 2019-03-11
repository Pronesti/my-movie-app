import React,{Component, Fragment} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import FullInfo from './pages/FullInfo';
import AppBar from './components/PrimarySearchAppBar';
import PersistentDrawerLeft from './components/PersistentDrawerLeft'; 
import './index.css';

export default class App extends Component {
  constructor(props) {
    super(props)
  
      this.state = {
        keyword: '',
        open: false,
        drawer:false,
      };

      this.searchBar = this.searchBar.bind(this);
      this.buttonDrawer = this.buttonDrawer.bind(this);
      this.closeDrawer = this.closeDrawer.bind(this);
    }

    searchBar(value) {
      if(value === ""){
        this.setState({
          keyword: ""
        });
      }else{
          this.setState({
            keyword: value
          });
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
      <div className="App">
      <BrowserRouter>
      <Fragment>
      <AppBar searchBar={this.searchBar} buttonDrawer={this.buttonDrawer} />
      <PersistentDrawerLeft drawer={this.state.drawer} closeDrawer={this.closeDrawer} />
      <Switch>
      <Route exact path="/" render={()=> <Home keyword={this.state.keyword} />} />
      <Route path="/movie/:id" component={FullInfo} />
      <Route path="/profile" component={Profile} />
      <Route path="/favorites" component={Favorites} />
      </Switch>
      </Fragment>
      </BrowserRouter>  
      </div>
    )
  }
}