import React, { useCallback, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { UserCard } from "../context/Usercard";

export const EditPage = () => {
  const { request, loading } = useHttp();
  const [user, setUser] = useState(null);
  const userId = useParams().id;

  const getUser = useCallback(async () => {
    try {
      const fetched = await request(`/api/auth/${userId}`, "GET", null);
      setUser(fetched);
    } catch (e) {}
  }, [userId, request]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return <>{user && <UserCard user={user} />}</>;
};
