import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   // Fetch data from the backend
  //   fetch('/api/userWork/user')
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setData(data);
  //       });
  // }, []);

    useEffect(() => {
        fetch(`/api/userWork/getOneUser/${encodeURIComponent('1')}`) // Используйте encodeURIComponent для кодирования параметра
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            });
    }, []);

  return (
    <div className="App">
        <header className="App-header">
            <h1>Data from the Backend:</h1>
            <ul>
                {console.log(data.name, "g")}
                        {/*<p>Name: {data.name}</p>*/}
                        {/*<p>Surname: {data.surname}</p>*/}
                        {/*<p>middleName: {data.middleName}</p>*/}
                        {/*<p>password: {data.password}</p>*/}
                        {/*<p>email: {data.email}</p>*/}
                        {/*<p>phone: {data.phone}</p>*/}
                        {/*<p>isActivated: {data.isActivated}</p>*/}
                        {/*<p>activationLink: {data.activationLink}</p>*/}
                {/*{data.map((user) => (*/}
                {/*    <div key={user.id}>*/}
                {/*        <p>Name: {user.name}</p>*/}
                {/*        <p>Surname: {user.surname}</p>*/}
                {/*        <p>middleName: {user.middleName}</p>*/}
                {/*        <p>password: {user.password}</p>*/}
                {/*        <p>email: {user.email}</p>*/}
                {/*        <p>phone: {user.phone}</p>*/}
                {/*        <p>isActivated: {user.isActivated}</p>*/}
                {/*        <p>activationLink: {user.activationLink}</p>*/}
                {/*    </div>*/}
                {/*))}*/}
            </ul>
        </header>
    </div>
  );
}

export default App;
