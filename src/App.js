import {Redirect, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import './App.css'

const App = () => (
  <Switch>
    <Login />
  </Switch>
)

export default App
