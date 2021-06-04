import React, { useCallback, useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import Pagination from "../context/Pagination";
import { Link } from "react-router-dom";

export const UserList = () => {
  const pageNumber = 1;
  const [user, setUser] = useState([]);
  const { error, request } = useHttp();
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const fetched = await request(
        `/api/auth/alluser?page=${page}`,
        "GET",
        null,
        {}
      );
      setUser(fetched["users"]);
      setPages(fetched["totalPages"]);
      setLoading(false);
    } catch (e) {
      console.error(e || error);
    }
  }, [request]);

  const deleteUser = useCallback(
    async (id) => {
      try {
        await request(`/api/auth/${id}`, "DELETE", null);
      } catch (e) {
        console.error(e || error);
        setLoading(false);
      }
    },
    [request, page]
  );

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="row">
      <div className="col s12 ">
        <h3 style={{ marginLeft: 50 }}>Список пользователей</h3>
        <table>
          <thead>
            <tr>
              <th>№</th>
              <th>ID</th>
              <th>Имя</th>
              <th>Фамилия</th>
              <th>Примечание</th>
              <th>Аватар</th>
            </tr>
          </thead>

          <tbody>
            <Pagination page={page} pages={pages} changePage={setPage} />
            {user.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>{user.surname}</td>
                  <td>{user.description}</td>
                  <td>{user.avatar}</td>
                  <td>
                    <button
                      className="btn yellow darken-4"
                      style={{ marginRight: 10 }}
                      onClick={() => deleteUser(user._id)}
                    >
                      Удалить
                    </button>
                    <button className="btn red darken-4">
                      <Link to={`/userlist/${user._id}`}>Редактировать</Link>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <Pagination page={page} pages={pages} changePage={setPage} />
        </table>
      </div>
    </div>
  );
};
