import { useAuth } from "../contexts/auth.context";
import { useState, useEffect } from "react";

const useGetUser = () => {
  const { auth } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/users/${auth.user.id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setUser(res);
      });
  }, [auth.user.id]);

  return { user, setUser };
};

export default useGetUser;
