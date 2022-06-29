import { useAuth } from "../contexts/auth.context";

const useMessage = () => {
  const { auth } = useAuth();

  const onSendMessage = async (values, { resetForm }) => {
    if (values) {
      await fetch("http://localhost:8080/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`,
        },
        body: JSON.stringify({
          userId: auth.user.id,
          text: values.text,
        }),
      });
    }
    resetForm();
  };

  return {
    onSendMessage,
  };
};

export default useMessage;
