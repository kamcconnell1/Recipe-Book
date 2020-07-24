import React, { setGlobal } from 'reactn'
import ReactDOM from 'react-dom'
import './styles/main.scss'
import App from './App'

setGlobal({
  token: null
})

ReactDOM.render(<App />, document.getElementById('root'))
