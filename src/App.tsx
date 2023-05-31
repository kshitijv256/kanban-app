import React from "react";
import AppRouter from "./router/AppRouter";
import Header from "./components/common/Header";

function App() {
  return (
    <div className="App">
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
