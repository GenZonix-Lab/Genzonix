import { useEffect, useState } from "react";
import { fetchAuthSession } from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

export default function useToken() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      try {
        const session = await fetchAuthSession();
        const idToken = session?.tokens?.idToken?.toString();
        if (!idToken) throw new Error("No idToken found in session");
        setToken(idToken);
      } catch (err) {
        console.error("Error getting token:", err);
        navigate("/Auth");
      }
    };

    getToken();
  }, [navigate]);

  return token; // null initially, string once loaded
}
