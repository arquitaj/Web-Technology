import { useState } from 'react'
import '../assets/styles/App.css'
// import Alert from './components/Alert'
// import Dashboard from './Pages/Dashboard'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function App() {
  const navigate = useNavigate();
  // const [array, setArray] = useState([]);
  // Create states for the inputs
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const fetchApi = async () => {
  //   const response = await axios.get("http://localhost:8080/api");
  //   setArray(response.data.fruits);
  //   console.log(response.data.fruits);
  // }
  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/set-state-in-effect
  //   fetchApi();
  // },[]);

  const handleLogin = async () =>{
    try{
      const response = await axios.post("http://localhost:8080/aims/login/auth", {
        username: username,
        password: password
      });
      if(response.data.success){
        alert(response.data.message);
        navigate("/Dashboard");
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }catch(error: any){
      // Axios throws an error for 401/500 status codes
      alert(error.response?.data?.message || "Login failed");
    }
  }

  return (
    <>
    
      <div className='signUp'>
        <form className='loginForm'>
          
      {/* {
        array.map((fruit, index) => (
          <div key={index}>
            <p>{fruit}</p>
          </div>
        ))
      } */}
          <h1>Login</h1>
          <h2>Login to your account</h2>
          <div className='inputGroup'>
            <label htmlFor="username">Username</label>
            <input 
              type='text' 
              id='username' 
              autoComplete='off'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              />

            <label htmlFor="password">Password</label>
            <input 
              type='password' 
              id='password' 
              autoComplete='off'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />
            <button type="button" className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </form>
        
      </div>
     
    </>
  )
}

export default App