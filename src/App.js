import logo from './logo.svg';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
//import JSONPretty from 'react-json-pretty';
//import (useAuth0)

function App() {
  const {loginWithPopup, 
    loginWithRedirect,
    logout,
    user,
    isAuthenticated,
    getAccessTokenSilently
   } = useAuth0();

   function callApi(){
      axios.get("http://localhost:4000/").then(Response=> console.log(Response.data))
      .catch(error => console.log(error.message));
   }

   async function callProtectedApi(){
    try{
      const token = await getAccessTokenSilently();
      // console.log(token);
      const Response = await axios.get('http://localhost:4000/protected',{
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      console.log(Response.data);
    }catch(error){
      console.log(error.message);
    }
    // axios.get("http://localhost:4000/protected").then(Response=> console.log(Response.data))
    // .catch(error => console.log(error.message))
  }


  return (
    <div className="App">
      <h1>Auth0 authentication</h1>
      <ul>
        <li><button onClick={loginWithPopup}>Login with Popup</button></li>
        <li><button onClick={loginWithRedirect}>Login with Redirect</button></li>
        <li><button onClick={logout}>Logout</button></li>
      </ul>
      <h3>User is {isAuthenticated ? 'Logged in' : 'Not logged in'}</h3>
      <ul>
        <li><button onClick={callApi}>Call API</button></li>
        <li><button onClick={callProtectedApi}>Call protected API route</button></li>
      </ul>
      <pre style={{textAlign: 'start'}}>
        {/* <JSONPretty data={user}/> */}
        {JSON.stringify(user, null, 2)}
      </pre>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
