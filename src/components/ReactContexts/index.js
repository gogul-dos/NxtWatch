import React from 'react'

const ThemeContext = React.createContext({
  activeTheme: 'Dark',
  changeTheme: () => {},
})

export default ThemeContext
