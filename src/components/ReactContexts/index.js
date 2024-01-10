import React from 'react'

const ThemeContext = React.createContext({
  activeTheme: 'Dark',
  activeBLock: 1,
  blockChanged: () => {},
  changeTheme: () => {},
})

export default ThemeContext
