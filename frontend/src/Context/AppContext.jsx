import { useState, createContext, useMemo } from "react";
import { user } from "../Models/user";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [currUser, setCurrUser] = useState(null);
  const [isSeller, setIsSeller] = useState(
    sessionStorage.getItem("isSeller") === "true"
  );

  useMemo(() => {
    if (currUser && !window.sessionStorage.getItem("user")) {
      window.sessionStorage.setItem(
        "user",
        JSON.stringify(
          new user(
            currUser.email,
            currUser.user_name,
            currUser.password,
            currUser.security_question,
            currUser.security_question_answer,
            currUser.user_id,
            currUser.bio,
            currUser.location,
            currUser.phone_number,
            currUser.profile_picture
          )
        )
      );
    } else if (!currUser && window.sessionStorage.getItem("user")) {
      setCurrUser(JSON.parse(window.sessionStorage.getItem("user")));
    }
  }, [currUser]);

  return (
    <AppContext.Provider value={{ currUser, setCurrUser, isSeller, setIsSeller }}>
      {children}
    </AppContext.Provider>
  );
};







