import React from "react";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/applyMiddleware";
import { yupResolver } from "@hookform/resolvers/yup";
import { useErrorMessage } from "../../redux/selectors";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object().shape({
  username: yup.string().required().min(5),
  password: yup.string().required().min(5),
  repeatPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null]),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isDirty, isValid, isSubmitting },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const userErrorMessage = useErrorMessage();

  const onSubmit = async (data, e) => {
    e.preventDefault();
    await dispatch(getUser(data.username, data.password));
  };

  return (
    <div className="form-login-container">
      <form className="form-login" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="h3 mb-3 font-weight-normal text-center">Авторизация</h1>
        <div className="form-group">
          <label htmlFor="username">Пользователь</label>
          <input
            className={classNames("form-control", {
              "is-invalid": errors.username,
            })}
            type="text"
            id="username"
            placeholder="Пользователь"
            name="username"
            ref={register}
          />
        </div>
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            className={classNames("form-control", {
              "is-invalid": errors.password,
            })}
            type="password"
            id="password"
            placeholder="Пароль"
            name="password"
            ref={register}
          />
        </div>
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
        <div className="form-group">
          <label htmlFor="repeat-password">Повторите пароль</label>
          <input
            className={classNames("form-control", {
              "is-invalid": errors.repeatPassword,
            })}
            type="password"
            id="repeat-password"
            placeholder="Пароль"
            name="repeatPassword"
            ref={register}
          />
        </div>
        {errors.repeatPassword && (
          <div className="invalid-feedback">
            {errors.repeatPassword.message}
          </div>
        )}
        <button
          type="submit"
          className="btn btn-lg btn-primary btn-block"
          disabled={isSubmitting || !isDirty || !isValid}
        >
          Вход
        </button>
        {userErrorMessage && (
          <div className="invalid-feedback">{userErrorMessage}</div>
        )}
      </form>
    </div>
  );
};

export default LoginForm;
