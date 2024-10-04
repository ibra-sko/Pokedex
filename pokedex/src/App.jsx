import { useState } from 'react'
import Header from './Header/Header.jsx'
import Search from './Search/Search.jsx'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <Header />
        <Search />

      <div>
        </div>


    </>
  )
}

export default App
