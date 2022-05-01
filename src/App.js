import logo from "./logo.svg";
import "./style/common.scss";
import MainTool from "./components/MainTool";
import Ability from "./components/Main/Ability";
import Ground from "./components/Main/Ground";
import ToolBox from "./components/ToolBox";

function App() {
  return (
    <div className="App">
      <div className="wrap">
        <MainTool />

        <main className="main">
          <Ability />
          <Ground />
        </main>

        <ToolBox />
      </div>
    </div>
  );
}

export default App;
