import { useEffect } from "react";
import { useNavigate } from "react-router";

function App() {
  let navigate = useNavigate();
  useEffect(() => {
      navigate("/auth/login");
  }, []);
  return <></>;
}

export default App;
