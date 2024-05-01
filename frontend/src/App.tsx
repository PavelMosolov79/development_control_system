import React, {FC, useContext, useEffect} from 'react';
import LoginForm from "./component/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";

const App: FC = () => {
  const {store} = useContext(Context)

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.chekAuth();
    }
  }, [])

  console.log(store.user.email)

  return (
    <div>
      <h1>{store.isAuth? `Пользователь авторизован || ${store.user.email}` : `Авторизуйтесь!`}</h1>
      <LoginForm/>
    </div>
  );
}

export default observer(App);
