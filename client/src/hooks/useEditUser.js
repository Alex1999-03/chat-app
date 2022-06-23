import { useAuth } from "../contexts/auth.context";

const useEditUser = () => {
  const { auth } = useAuth();
  const onEditUser = async (values) => {
    if (values) {
      const response = await fetch(`http://localhost:8080/users/${auth.user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        }),
      });
      return response.json();
    }
  };

  return { onEditUser }
};

export default useEditUser;