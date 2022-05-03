import logo from "./logo.svg";
import "./style/common.scss";
import MainTool from "./components/MainTool";
import Ability from "./components/Main/Ability";
import Ground from "./components/Main/Ground";
import ToolBox from "./components/ToolBox";
import { useRef } from "react";

function App() {
  const canvasEl = useRef();
  const playEl = useRef();

  return (
    <div className="App">
      <div className="wrap">
        <MainTool />

        <main className="main">
          <Ability />
          <Ground canvasEl={canvasEl} playEl={playEl} />
        </main>

        <ToolBox canvasEl={canvasEl} playEl={playEl} />
      </div>
    </div>
  );
}

export default App;
