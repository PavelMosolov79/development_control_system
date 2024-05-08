import React, {useContext, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";
import "../styles/form.pc.css"
import "../../globalstyles/input.pc.css"
import "../../globalstyles/background.pc.css"
import "../../globalstyles/button.pc.css"
import "../../globalstyles/text.pc.css"

const RegistrationForm = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const {store} = useContext(Context);

    return (
        <div className="globaL__background">
            <div className="registration__page">
                <div>
                    <div className="form__flex">
                        <img src="./Logo_white.svg" alt="альтернативный текст"/>
                    </div>
                    <h1 className="h1_24 text__block-size">Добро пожаловать в систему контроля за ходом разработки
                        ПО!</h1>
                    <p className="p_18 text__block-size"><a className="a_18" href="/">Зарегистрируйтесь</a> или <a
                        className="a_18" href="/login">войдите</a> в систему чтобы
                        продолжить! </p>
                    <div className="form__flex">
                        <div className="bacground__form form__position form__size form__flex">
                            <div className="form__margin-top form__flex-justify form__width">
                                <div>
                                    <div className="block__flex form__justify">
                                        <h2 className="h2_20 text__block-authorization-size__h2">Регистрация</h2>
                                    </div>
                                    <div className="block__border block__flex">
                                        {email ? <div id="Email" className="pointer__color"></div> :
                                            <div id="Email" className="pointer"></div>}
                                        <input
                                            className="input__block-authorization"
                                            onChange={e => setEmail(e.target.value)}
                                            value={email}
                                            type="text"
                                            placeholder='Email'
                                        />
                                    </div>
                                    <div className="block__border block__flex">
                                        {password ? <div id="Password" className="pointer__color"></div> :
                                            <div id="Password" className="pointer"></div>}
                                        <input
                                            className="input__block-authorization"
                                            onChange={e => setPassword(e.target.value)}
                                            value={password}
                                            type="password"
                                            placeholder='Пароль'
                                        />
                                    </div>
                                    <div className="block__border block__flex">
                                        <div id="Email" className="pointer"></div>
                                        <input
                                            className="input__block-authorization"
                                            // onChange={e => setPassword(e.target.value)}
                                            // value={password}
                                            type="surname"
                                            placeholder='Фамилия'
                                        />
                                    </div>
                                    <div className="block__border block__flex">
                                        <div id="Email" className="pointer"></div>
                                        <input
                                            className="input__block-authorization"
                                            // onChange={e => setPassword(e.target.value)}
                                            // value={middlename}
                                            type="name"
                                            placeholder='Имя'
                                        />
                                    </div>
                                    <div className="block__border block__flex">
                                        <div id="Email" className="pointer"></div>
                                        <input
                                            className="input__block-authorization"
                                            // onChange={e => setPassword(e.target.value)}
                                            // value={password}
                                            type="middlename"
                                            placeholder='Отчество'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form__flex-justify form__width">
                            <button
                                    className="button__block-authorization"
                                    onClick={() => store.registration(email ? email : "", password ? password : "")}>
                                    Зарегистрироваться
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default observer(RegistrationForm);