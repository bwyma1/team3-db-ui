import { getUserByEmail } from "../API/Api";

export default function Profile() {
  const user = JSON.parse(window.sessionStorage.getItem("user"));

  
  function getUser() {
    (async () => {
      const response = await getUserByEmail(user.email);
      console.log(response);

      if (response) {
        return response;
      } else {
        alert("error invalid email");
      }
    })();
  }
  

  return <>
  <header>This is the profile page</header>
  <p>Username: {user.user_name}</p>
  <p>Email: {user.email}</p>
  <p>Security Question: {user.security_question}</p>
  <p>User Id: {getUser().user_id}</p>
  <p>Location: {user.location}</p>
  <p>Bio: {user.bio}</p>
  </>;
}
