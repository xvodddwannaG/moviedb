import React, {useState} from 'react';
import {getSession} from "../../api/useLogin";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    const onPasswordChangeHandler = (e) => {
        if (Object.keys(errors).length > 0) {
            setErrors({})
            setIsSubmit(true)
        }
        setPassword(e.target.value)
    };
    const onUsernameChangeHandler = (e) => {
        if (Object.keys(errors).length > 0) {
            setErrors({})
            setIsSubmit(true)
        }
        setUsername(e.target.value)
    };

    const onSubmit = (e) => {
        e.preventDefault()
        validateFields()
        if (Object.keys(errors).length === 0) {
            setIsSubmit(false)
            getSession(username, password)
                .then((res) => {
                    if (res.success === true) {
                        console.log(res)
                    } else {
                        setIsSubmit(false)
                        setErrors({...errors, base: res.status_message})
                    }
                })
            setIsSubmit(true)
        }
    }

    const validateFields = () => {
        if (username === '') {
            setIsSubmit(false)
            setErrors({...errors, username: 'Not Empty'})
        }
    }

    const onBlurHandler = () => {
        validateFields()
    }

    console.log(!isSubmit && username === '')

    return (
        <div className="form-login-container">
            <form className="form-login">
                <h1 className="h3 mb-3 font-weight-normal text-center">
                    Авторизация
                </h1>
                <div className="form-group">
                    <label htmlFor="username">Пользователь</label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        placeholder="Пользователь"
                        name="username"
                        value={username}
                        onChange={onUsernameChangeHandler}
                        onBlur={onBlurHandler}
                    />
                    {errors.username && (
                        <div className="invalid-feedback">{errors.username}</div>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Пароль"
                        name="password"
                        value={password}
                        onChange={onPasswordChangeHandler}
                        onBlur={onBlurHandler}
                    />
                    {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                    onClick={onSubmit}
                    disabled={!isSubmit && username === ''}
                >
                    Вход
                </button>
                {errors.base && (
                    <div className="invalid-feedback">{errors.base}</div>
                )}
            </form>
        </div>
    );
};

export default LoginForm;