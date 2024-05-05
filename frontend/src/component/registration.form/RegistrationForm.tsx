import React, {useContext, useState} from 'react';
import {Context} from "../../index";
import "./styles/form.pc.css"
import "../../globalstyles/input.pc.css"
import "../../globalstyles/background.pc.css"
import "../../globalstyles/button.pc.css"

const RegistrationForm = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const {store} = useContext(Context);

    return (
        <div className="globaL__background">
            <div className="registration__page">
                <div className="bacground__form form__position form__size form__flex">
                    <div className="form__flex-justify form__width">
                        <ul>
                            <li>
                                <input
                                    className="input__block-authorization"
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    type="text"
                                    placeholder='Email'
                                />
                            </li>
                            <li>
                                <input
                                    className="input__block-authorization"
                                    // onChange={e => setPassword(e.target.value)}
                                    // value={password}
                                    type="password"
                                    placeholder='Пароль'
                                />
                            </li>
                            <li>
                                <input
                                    className="input__block-authorization"
                                    // onChange={e => setPassword(e.target.value)}
                                    // value={password}
                                    type="surname"
                                    placeholder='Фамилия'
                                />
                            </li>
                            <li>
                                <input
                                    className="input__block-authorization"
                                    // onChange={e => setPassword(e.target.value)}
                                    // value={middlename}
                                    type="middlename"
                                    placeholder='Имя'
                                />
                            </li>
                            <li>
                                <input
                                    className="input__block-authorization"
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    placeholder='Отчество'
                                />
                            </li>
                        </ul>
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
    );
};

export default RegistrationForm;