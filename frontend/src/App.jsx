import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { SignupPage } from "./pages/SignupPage"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"

function App() {

  return (
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
    </Routes>
  )
}

export default App
