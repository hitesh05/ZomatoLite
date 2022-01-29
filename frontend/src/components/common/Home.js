import { useState, useEffect } from "react";

const Home = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setName("Hitesh");
  }, []);

  return <div style={{ textAlign: "center" }}>
    <b>Welcome to ZomatoLite!</b><br></br>
    Khao piyo aish karo mitro, dil par kise da dukhayo na!<br></br>
  </div>;
};

export default Home;
