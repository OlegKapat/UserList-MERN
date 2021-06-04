import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";

export const UserCard = ({ user }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { error, request, clearError } = useHttp();
  const userId = useParams().id;
  const [form, SetForm] = useState({
    name: "",
    surname: "",
    description: "",
    avatar: "",
  });
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  const changeHandler = (event) => {
    selectedFile = setSelectedFile(event.target.files[0]);
  };
  const formHandler = (event) => {
    SetForm({ ...form, [event.target.name]: event.target.value });
  };

  const editHandler = async () => {
    try {
      const data = await request(`/api/auth/update/${userId}`, "PATCH", {
        ...form,
      });
    } catch (e) {
      console.log(e || error);
    }
  };
  return (
    <>
      <h2>Редактирование пользователя</h2>

      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s6">
              <input
                placeholder="Имя"
                defaultValue={user.name}
                id="first_name"
                type="text"
                name="name"
                className="validate"
                onChange={formHandler}
              ></input>
              <label htmlFor="first_name">Имя</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                defaultValue={user.surname}
                id="disabled"
                type="text"
                name="surname"
                className="validate"
                onChange={formHandler}
              ></input>
              <label htmlFor="disabled">Фамилия</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input
                id="description"
                type="text"
                name="description"
                defaultValue={user.description || ""}
                className="validate"
                onChange={formHandler}
              ></input>
              <label htmlFor="description">Примечание</label>
            </div>
          </div>
          <div className="upload-btn-wrapper ">
            <input
              type="file"
              id="description"
              type="file"
              className="validate"
              name="avatar"
              onChange={changeHandler}
              onChange={formHandler}
            ></input>
            <p value={user.avatar}></p>
            <button className="btnn" type="button">
              Аватар
            </button>
          </div>
        </form>
        <button className="btn  blue darken-4" onClick={editHandler}>
          Редактировать
        </button>
      </div>
    </>
  );
};
