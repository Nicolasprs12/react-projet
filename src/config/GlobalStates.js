import { useContext, createContext, useState } from "react";

const GlobalStatesContext = createContext();

export const GlobalStatesProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(
    localStorage.getItem("user_ref_lpMds")
      ? JSON.parse(localStorage.getItem("user_ref_lpMds"))
      : null
  );

  const [informationMessage, setInformationMessage] = useState({
    title: "",
    content: "",
  });

  const setUser = async (token, userId, username) => {
    if (token && userId) {
      localStorage.setItem(
        "user_ref_lpMds",
        JSON.stringify({ token, id: userId, username }),
        {
          expires: 1,
        }
      );

      setUserSession({ token, id: userId, username });
    } else {
      localStorage.removeItem("user_ref_lpMds");
      setUserSession(null);
    }
  };

  const GlobalStatesContextValues = {
    userSession,
    setUserSession,

    setUser,

    informationMessage,
    setInformationMessage,
  };

  return (
    <GlobalStatesContext.Provider value={GlobalStatesContextValues}>
      {children}
    </GlobalStatesContext.Provider>
  );
};

export const useGlobalStatesContext = () => {
  return useContext(GlobalStatesContext);
};
