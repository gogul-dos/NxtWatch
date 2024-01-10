import {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ThemeContext from './components/ReactContexts'
import ProtectedRoute from './components/ProtectedRoute'
import Trending from './components/Trending'
import './App.css'

class App extends Component {
  state = {activeTheme: 'Light', activeBlock: 1}

  changeTheme = () => {
    const {activeTheme} = this.state
    let newTheme
    if (activeTheme === 'Dark') {
      newTheme = 'Light'
    } else {
      newTheme = 'Dark'
    }
    this.setState({activeTheme: newTheme})
  }

  blockChanged = id => {
    this.setState({activeBlock: id})
  }

  render() {
    const {activeTheme, activeBlock} = this.state
    return (
      <ThemeContext.Provider
        value={{
          activeTheme,
          activeBlock,
          changeTheme: this.changeTheme,
          blockChanged: this.blockChanged,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/trending" component={Trending} />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
