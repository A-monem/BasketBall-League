import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './Navbar'
import DynamicImport from './DynamicImport'



const Home = (props) => (
  <DynamicImport load={() => import('./Home')}>
    {(Component) => Component === null
      ? <h1>Loading</h1>
      : <Component {...props} />}
  </DynamicImport>
)
const Players = (props) => (
  <DynamicImport load={() => import('./Players')}>
    {(Component) => Component === null
      ? <h1>Loading</h1>
      : <Component {...props} />}
  </DynamicImport>
)
const Teams = (props) => (
  <DynamicImport load={() => import('./Teams')}>
    {(Component) => Component === null
      ? <h1>Loading</h1>
      : <Component {...props} />}
  </DynamicImport>
)
const TeamPage = (props) => (
  <DynamicImport load={() => import('./TeamPage')}>
    {(Component) => Component === null
      ? <h1>Loading</h1>
      : <Component {...props} />}
  </DynamicImport>
)
const Articles = (props) => (
  <DynamicImport load={() => import('./Articles')}>
    {(Component) => Component === null
      ? <h1>Loading</h1>
      : <Component {...props} />}
  </DynamicImport>
)
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
