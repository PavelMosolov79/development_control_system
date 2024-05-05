// rsc
import React, {FC, useContext, useState} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import "../../globalstyles/background.pc.css";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const {store} = useContext(Context);

    return (
        <div>
            <div className="slider-thumb"></div>
            <input
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder='Email'
            />
            <input
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder='Пароль'
            />
            <button onClick={() => store.login(email ? email : "", password ? password : "")}>
                Логин
            </button>
            <button onClick={() => store.registration(email ? email : "", password ? password : "")}>
                Регистрация
            </button>
        </div>
    );
};

export default observer(LoginForm);