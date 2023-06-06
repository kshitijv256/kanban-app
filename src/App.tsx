import React, { useEffect, useState } from "react";
import AppRouter from "./router/AppRouter";
import Header from "./components/common/Header";
import { me } from "./utils/apiUtils";
import { User } from "./types/User";

const getCurrentUser = async (setCurrentUser: (value: User) => void) => {
  const currentUser = await me();
  setCurrentUser(currentUser);
};

function App() {
  const [currentUser, setCurrentUser] = useState<User>({
    username: "",
  });
  useEffect(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    <div className="App">
      <Header currentUser={currentUser} setCurrentUserCB={setCurrentUser} />
      <AppRouter currentUser={currentUser} />
    </div>
  );
}

export default App;
