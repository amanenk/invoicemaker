import React, { useState, useEffect, createContext } from "react";
import { auth } from "../services/firebase";
export const UserContext = createContext({ user: null, authLoaded: false });

export default (props) => {
  const [user, setuser] = useState(null);
  const [authLoaded, setauthLoaded] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, email, uid } = user;
        setuser({
          displayName,
          email,
          uid
        });
      }
      console.log("login onAuthStateChanged");
      setauthLoaded(true);
    });
  }, []);

  return (
    <UserContext.Provider value={{user, authLoaded}}>{props.children}</UserContext.Provider>
  );
};
