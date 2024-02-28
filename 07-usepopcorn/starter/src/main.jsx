import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import StarRating from './StarRating.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating maxRating={5} message={["a", "b", "c", "d", "e"]}/>
    <StarRating maxRating={10} color='#a39'/>
    <StarRating size={32} color='red'/>
  </React.StrictMode>,
)
