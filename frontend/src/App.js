import './App.css';
import axios from 'axios'

function App() {
  const url = 'http://localhost:8000'

  const checkAPI = () => {
    axios.get(url + '/').then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const user = {
    "first": "Joe",
    "last": "Shmoe",
    "age": 65,
    "admin": false
  }

  const sendJSON = () => {
    console.log(user)
    axios.put(url + '/parse', user).then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  const sendUser = () => {
    axios.post(url + '/user', user).then((res) => {
      alert(JSON.stringify(res.data))
    }).catch((err) => {
      console.log(err)
    })
  }

  const getUsers = () => {
    axios.get(url + '/users').then((res) => {
      alert(JSON.stringify(res.data))
    }).catch((err) => {
      console.log(err)
    })
  }

  const clearUsers = () => {
    axios.put(url + '/users/clear').then((res) => {
      alert(res.data)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <div className="App">
      <h1>Hello World</h1>
      <button onClick={checkAPI}>CheckAPI</button>
      <button onClick={sendJSON}>Send JSON</button>
      <button onClick={sendUser}>Send User to DB</button>
      <button onClick={getUsers}>Get users from DB</button>
      <button onClick={clearUsers}>Clear users from DB</button>
    </div>
  );
}

export default App;
