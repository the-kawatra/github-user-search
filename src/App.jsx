import { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [timer, setTimer] = useState();
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(
          `https://api.github.com/search/users?q=fullname:${user}&sort:followers`
        );
        const { items } = await res.json();
        setUsers(items);
      } catch (err) {
        console.log(err);
      }
    }

    clearTimeout(timer);
    if (user !== "") {
      setTimer(
        setTimeout(() => {
          fetchData();
        }, 1000)
      );
    }
  }, [user]);

  return (
    <div id="app">
      <h2>Github User Search</h2>

      <input
        type="text"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        placeholder="Enter a Github User's Name"
      />

      <div id="results">
        {users.map((ele) => {
          return (
            <div className="user" key={ele.id}>
              <a href={`https://github.com/${ele.login}`} target="_blank">
                {ele.login}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
