import React, {FC, useContext, useEffect} from 'react';
import LoginForm from "../component/login.form/LoginForm";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useLocation} from "react-router-dom";
import RegistrationForm from "../component/registration.form/RegistrationForm";

const Authorization: FC = (index) => {
    const {store} = useContext(Context)
    const location = useLocation();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            store.chekAuth();
        }
    }, [])

    if (store.isLoading) {
        return (
            <div>
                <h1>Загрузка...</h1>
            </div>
        );
    } else if(!store.isAuth) {
        return (
            <div>
                <RegistrationForm/>
                {/**/}
            </div>
        )
    } else {
        return (
            <div>
                <LoginForm/>
                <h1>Вы авторзованы</h1>
                {/*<h1>{store.isAuth? `Пользователь авторизован || ${store.user.email}` : `Авторизуйтесь!`}</h1>*/}
                <button onClick={() => store.logout()}>
                    Выйти
                </button>
            </div>
        );
    }
}

export default observer(Authorization);