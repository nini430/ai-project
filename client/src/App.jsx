import {BrowserRouter,Routes,Route, Link} from 'react-router-dom'
import {logo} from "./assets"
import {Home,CreatePost} from './pages'

function App() {
  return (
   <BrowserRouter>
   <header className='w-full h-[73px] px-4 py-4 sm:px-8 flex justify-between items-center border border-b border-b-[#e6ebf4]'>
    <Link to="/">
    <img src={logo} alt="logo" className='w-28 object-contain' />
    </Link>
    <Link className='bg-purple-500 px-4 py-2 rounded-md text-white' to='/create-post'>
      Create
    </Link>
   </header>
   <main className='bg-gray-100 min-h-[calc(100vh-73px)] px-4 py-8 sm:p-8'>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create-post" element={<CreatePost/>}/>
    </Routes>
   </main>
   </BrowserRouter>
  );
}

export default App;
