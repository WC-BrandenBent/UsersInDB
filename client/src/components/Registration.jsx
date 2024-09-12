import React, { useState } from "react";
import axios from "axios";

function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        password,
        email,
      });

      console.log(response.data);
      // Handle successful registration (e.g., redirect to a login page)
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Register</button>

      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

export default Registration;
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const [state, setState] = useState({
//     email: "",
//     username: "",
//     password: "",
//     data_subscription: "",
//   });

//   const handleChange = (e) => {
//     const { id, value } = e.target;
//     setState((prevState) => ({ ...prevState, [id]: value }));
//   };

//   const sendDetailsToServer = () => {
//     if (state.email.length && state.password.length) {
//       props.showError(null);
//       const payload = {
//         email: state.email,
//         password: state.password,
//         name: state.userName,
//       };
//       axios
//         .post("http://127.0.0.1:5000" + "/user/register", payload)
//         .then(function (response) {
//           if (response.status === 200) {
//             setState((prevState) => ({
//               ...prevState,
//               successMessage: "Registration successful",
//             }));
//             localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
//             redirectToHome();
//             props.showError(null);
//           } else {
//             props.showError("Some error ocurred");
//           }
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
//     } else {
//       props.showError("Please enter valid username and password");
//     }

//     const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log("New user account:", email, username, password);

//       if ((state.password = state.confirmPassword)) {
//         sendDetailsToServer();
//       } else {
//         props.showError("Passwords do not match");
//       }
//     };
