import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { SignupPage } from "./pages/SignupPage"
import { HomePage } from "./pages/HomePage"
import { LoginPage } from "./pages/LoginPage"
import { Toaster } from "react-hot-toast"
import { useAuthStore } from "./store/AuthUser"
import { useEffect, useRef } from "react"
import { LoaderCircle } from "lucide-react"
import { HomeScreen } from "./pages/HomeScreen"
import { ProductPage } from "./pages/ProductPage"
import { mergeCartAfterLogin } from "./utils/mergeCart"

function App() {

  const {user, isCheckingAuth, authCheck}=useAuthStore()
  const hasMergedRef = useRef(false);
  console.log("auth user is here", user);
  
  useEffect(()=>{
    authCheck()
  },[])

  useEffect(() => {
  if (user?.isLoggedIn && !hasMergedRef.current) {
    mergeCartAfterLogin();
  }

}, [user]);

  if(isCheckingAuth){
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <LoaderCircle className="animate-spin text-primary size-10"/>
        </div>
      </div>
    )
  }

  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/signup' element={!user ? <SignupPage/> : <HomeScreen/>}/>
      <Route path='/login' element={!user ? <LoginPage/> : <HomeScreen/>}/>
      <Route path='/product' element={<ProductPage/>}/>
    </Routes>


    <Toaster/>
    </>
  )
}

export default App
