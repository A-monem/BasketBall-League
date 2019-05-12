import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Home from './Home'
import Players from './Players'
import Teams from './Teams'
import Navbar from './Navbar'
import TeamPage from './TeamPage'
import Articles from './Articles'

class App extends Component {
  render(){
    return (

      <Router>
        <div className='contanier'>
        <Navbar/>
        <Switch>
        <Route exact path='/' component={Home}/>
          <Route path='/players' component={Players}/>
          <Route path='/teams' component={Teams}/>
          <Route exact path='/:teamId' component={TeamPage}/>
          <Route path='/:teamId/articles' component={Articles}/>
          <Route render={()=> (<h1 className='text-center'>404</h1>)}/>
        </Switch>
        </div>
      </Router>
    );
  }

}

export default App;
