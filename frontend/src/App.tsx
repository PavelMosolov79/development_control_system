import React, {FC, useContext, useEffect} from 'react';
import LoginForm from "./component/LoginForm";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";

const App: FC = () => {
  const {store} = useContext(Context)
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      store.chekAuth();
    }
  }, [])

    if (store.isLoading){
        return <div>Загрузка...</div>
    }

  if (!store.isAuth) {
    return (
      <div>
        <h1>Авторизуйтесь!</h1>
        <LoginForm/>
      </div>
    )
  }

  return (
    <div>
      <h1>Вы авторзованы</h1>
      {/*<h1>{store.isAuth? `Пользователь авторизован || ${store.user.email}` : `Авторизуйтесь!`}</h1>*/}
      <button onClick={() => store.logout()}>
        Выйти
      </button>
    </div>
  );
}

export default observer(App);
