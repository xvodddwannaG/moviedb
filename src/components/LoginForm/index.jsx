import React, {useState, useContext} from 'react';
import classNames from 'classnames';
import {getSession} from "../../api/useLogin";
import {AppContext} from "../App";

const LoginForm = () => {
    const {updateUserData} = useContext(AppContext)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false)

    // const [{user, isLoading, isError, sessionId}, doFetch] = useDataApi()

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

    const onRepeatPasswordChangeHandler = (e) => {
        if (Object.keys(errors).length > 0) {
            setErrors({})
            setIsSubmit(true)
        }
        setRepeatPassword(e.target.value)
    };
    const onSubmit = (e) => {
        e.preventDefault()
        validateFields()
        if (Object.keys(errors).length === 0) {
            setIsSubmit(false)
            // doFetch({username: username,password: password});
            // if (!isError) {
            //     updateUserData(user, sessionId)
            // } else {
            //     setErrors({...errors, base: 'Incorrect login or password'});
            //     setIsSubmit(false)
            // }
            getSession(username, password)
                .then((res) => {
                    if (res.success === false) {
                        setErrors({...errors, base: 'Incorrect login or password'})
                        setIsSubmit(false)
                    } else {
                        updateUserData(res, res.session_id)
                    }
                })
            // updateUserData(username, password)
            setIsSubmit(true)
        }
    }

    const validateFields = (name) => {
        let newErrors = {...errors};

        if (username === '' && name === 'username') {
            setIsSubmit(false);
            newErrors = {...newErrors, username: 'Not Empty'}
            setErrors({...newErrors})
        }

        if (password.length < 5 && name === 'password') {
            setIsSubmit(false);
            newErrors = {...newErrors, password: 'Required! Must be 5 characters or more'}
            setErrors({...newErrors})
        }

        if (repeatPassword !== password && name === 'repeatPassword') {
            setIsSubmit(false);
            newErrors = {...newErrors, repeatPassword: 'Repeat password is not equal to password'}
            setErrors({...newErrors})
        }

        if (Object.keys(newErrors).length === 0 && name === 'repeatPassword') {
            setIsSubmit(true);
        }
    }


    const onBlurHandler = (e) => {
        validateFields(e.target.name)
    }

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
                        className={classNames('form-control', {
                            'is-invalid': errors.username
                        })}
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
                        className={classNames('form-control', {
                            'is-invalid': errors.password
                        })}
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
                <div className="form-group">
                    <label htmlFor="repeat-password">Повторите пароль</label>
                    <input
                        type="password"
                        className={classNames('form-control', {
                            'is-invalid': errors.repeatPassword
                        })}
                        id="repeat-password"
                        placeholder="Пароль"
                        name="repeatPassword"
                        value={repeatPassword}
                        onChange={onRepeatPasswordChangeHandler}
                        onBlur={onBlurHandler}
                    />
                    {errors.repeatPassword && (
                        <div className="invalid-feedback">{errors.repeatPassword}</div>
                    )}
                </div>
                <button
                    type="submit"
                    className="btn btn-lg btn-primary btn-block"
                    onClick={onSubmit}
                    disabled={!isSubmit}
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