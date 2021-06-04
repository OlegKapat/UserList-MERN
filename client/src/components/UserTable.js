import React from 'react'
import {Link} from 'react-router-dom'

export const UserList1 = ({ list }) => {
  if (!list.length) {
    return <p className="center">Список пользователей</p>
  }

  return (
    <table>
      <thead>
      <tr>
        <th>№</th>
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Примечание</th>
        <th>Аватар</th>
      </tr>
      </thead>

      <tbody>
      { list.map((link, index) => {
        return (
          <tr key={link._id}>
            <td>{index + 1}</td>
            <td>{link.name}</td>
            <td>{link.surname}</td>
            <td>{link.description}</td>
            <td>{link.avatar}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Удалить</Link>
            </td>
          </tr>
        )
      }) }
      </tbody>
    </table>
  )
}
