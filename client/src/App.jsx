import { useState } from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { logo } from './assets'
import { Home, CreatePost } from './pages'

function App() {

  return (
    <BrowserRouter>

      <header className='w-full  flex justify-between bg-[#010103] items-center sm:px-8 px-4 py-4 border-b border-b-[#e6ebf400]  shadow-inner'>
        <Link to='/'>
          <h1 className='text-white md:text-2xl text-xl font-bold '>PromptArt</h1>
        </Link>

        <Link to='/create-post'
          className='font-inter font-medium bg-[#3706f6ff] text-white md:px-10 px-4 py-2 rounded-md mr-5 md:text-xl '
          >Create </Link>
      </header>

      <main className='sm:p-8 px-4 py-8 w-full bg-[#19191c] min-h-[calc(100vh-73px)] '>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/create-post' element={<CreatePost></CreatePost>}></Route>
      </Routes>
      </main>

    </BrowserRouter>
  )
}

export default App
