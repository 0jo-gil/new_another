import logo from "./logo.svg";
import "./style/common.scss";
import MainTool from "./components/MainTool";
import Ability from "./components/Main/Ability";

function App() {
  return (
    <div className="App">
      <div className="wrap">
        <MainTool />

        <main className="main">
          <Ability />
        </main>
      </div>
    </div>
  );
}

export default App;
