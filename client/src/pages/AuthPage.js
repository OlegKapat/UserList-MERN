import React, { useEffect, useState, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from "../context/AuthContext";

export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMessage();
  const { error, request, clearError } = useHttp();
  const [form, SetForm] = useState({
    name: "",
    surname: "",
    description: "",
    avatar: "",
  });
  const [selectedFile, setSelectedFile] = useState();

  const changeHandler = (event) => {
    selectedFile= setSelectedFile(event.target.files[0]);
  };

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const formHandler = (event) => {
    SetForm({ ...form, [event.target.name]: event.target.value });
  };
  
  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
    } catch (e) {
      console.log(e || error);
    }
  };
  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.userId);
    } catch (e) {}
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h3>Регистрация пользователя</h3>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field ">
                <input
                  id="name"
                  type="text"
                  className="validate"
                  name="name"
                  onChange={formHandler}
                />
                <label htmlFor="name">Имя</label>
              </div>
              <div className="input-field ">
                <input
                  id="surname"
                  type="text"
                  className="validate"
                  name="surname"
                  onChange={formHandler}
                />
                <label htmlFor="surname">Фамилия</label>
              </div>
              <div className="input-field ">
                <input
                  id="description"
                  type="text"
                  className="validate"
                  name="description"
                  onChange={formHandler}
                />
                <label htmlFor="description">Примечание</label>
              </div>

              <div className="upload-btn-wrapper ">
                <button className="btnn" type="button">
                  Аватар
                </button>
                <input type="file" name="myfile"  id="description"
                  type="file"
                  value={selectedFile}
                  className="validate"
                  name="avatar"
                  onChange={changeHandler}
                  onChange={formHandler} />
                <p>{selectedFile}</p>
              </div>
              
            </div>
          </div>
        </div>
        <div className="card-action">
          <button
            className="btn blue lighten-3"
            style={{ marginRight: 10 }}
            onClick={loginHandler}
          >
            Вход
          </button>
          <button className="btn  blue darken-4" onClick={registerHandler}>
            Регистрация
          </button>
        </div>
      </div>
    </div>
  );
};
