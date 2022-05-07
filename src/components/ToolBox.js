import React, { useRef, useState } from "react";
import { Space } from "./Main/Ground";

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from "react-circular-input";

import "../style/ToolBox.scss";

const ToolBox = ({ canvasEl, playEl }) => {
  const knobCount = useRef();
  const [list, setList] = useState([
    {
      id: 1,
      value: 0.3,
      title: "Brightness",
    },
    {
      id: 2,
      value: 0.5,
      title: "Contrast",
    },
    {
      id: 3,
      value: 0.8,
      title: "Colors",
    },
    {
      id: 4,
      value: 0.1,
      title: "Lighting",
    },
    {
      id: 5,
      value: 0.6,
      title: "Level",
    },
    {
      id: 6,
      value: 0.3,
      title: "Curved",
    },
  ]);

  const knobHandler = (e, id) => {
    setList(
      list.map((list) => (list.id === id ? { ...list, value: e } : list))
    );
    knobCount.current.value = list[id].value;
  };

  const changeKnob = (e, id) => {
    setList(
      list.map((list) =>
        list.id === id ? { ...list, value: e.target.value / 100 } : list
      )
    );
  };

  return (
    <div className="toolbox-wrap">
      <div className="contents-wrap">
        <div className="content knob-wrap">
          {list.map((knob) => (
            <div key={knob.id}>
              <div className="title">{knob.title}</div>
              <div className="knob">
                <CircularInput
                  value={knob.value}
                  onChange={(e) => knobHandler(e, knob.id)}
                >
                  <CircularTrack strokeWidth={3} stroke="#555555" />
                  <CircularProgress strokeWidth={15} stroke="#999999" />
                </CircularInput>
              </div>

              <div className="knob-value">
                <input
                  ref={knobCount}
                  type="number"
                  name={`listNum${knob.id}`}
                  id={`listNum${knob.id}`}
                  height="100%"
                  defaultValue={Math.floor(knob.value * 100)}
                  onChange={(e) => changeKnob(e, knob.id)}
                />
                %
              </div>
            </div>
          ))}
        </div>
        <div className="content console-wrap">
          <p>Finder</p>
          <ul>
            <li>
              <img src="./img/1.png" alt="" />
            </li>
            <li>
              <img src="./img/2.png" alt="" />
            </li>
            <li>
              <img src="./img/3.png" alt="" />
            </li>
            <li>
              <img src="./img/4.png" alt="" />
            </li>
            <li>
              <img src="./img/5.png" alt="" />
            </li>
            <li>
              <img src="./img/6.png" alt="" />
            </li>
            <li>
              <img src="./img/7.png" alt="" />
            </li>
            <li>
              <img src="./img/8.png" alt="" />
            </li>
            {/* <li ref={canvasEl}>
              <Space playEl={playEl} canvasEl={canvasEl} />
            </li>
            <li ref={canvasEl}>
              <Space playEl={playEl} canvasEl={canvasEl} />
            </li> */}

            {/* <li ref={canvasEl}>
              <Space playEl={playEl} />
            </li>
            <li ref={canvasEl}>
              <Space playEl={playEl} />
            </li>
            <li ref={canvasEl}>
              <Space playEl={playEl} />
            </li>
            <li ref={canvasEl}>
              <Space playEl={playEl} />
            </li>
            <li ref={canvasEl}>
              <Space playEl={playEl} />
            </li>
            <li ref={canvasEl}>
              <Space playEl={playEl} />
            </li>  */}
          </ul>
        </div>
        <div className="content range-wrap">
          <div>
            <div className="title">Transform</div>
            <div>
              <div className="inner">
                <div className="inner-title">Position</div>
                <div className="inner-value">
                  <div>
                    <label htmlFor="positionX">X</label>{" "}
                    <input
                      type="number"
                      name="positionX"
                      id="positionX"
                      // value="1"
                    />
                  </div>
                  <div>
                    <label htmlFor="positionX">Y</label>{" "}
                    <input
                      type="number"
                      name="positionY"
                      id="positionY"
                      // value="6.3"
                    />
                  </div>
                  <div>
                    <label htmlFor="positionX">Z</label>{" "}
                    <input
                      type="number"
                      name="positionZ"
                      id="positionZ"
                      // value="2.2"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inner">
                <div className="inner-title">Rotation</div>
                <div className="inner-value">
                  <div>
                    <label htmlFor="rotationX">X</label>{" "}
                    <input
                      type="number"
                      name="rotationX"
                      id="rotationX"
                      // value="1"
                    />
                  </div>
                  <div>
                    <label htmlFor="rotationX">Y</label>{" "}
                    <input
                      type="number"
                      name="rotationY"
                      id="rotationY"
                      // value="1"
                    />
                  </div>
                  <div>
                    <label htmlFor="rotationX">Z</label>{" "}
                    <input
                      type="number"
                      name="rotationZ"
                      id="rotationZ"
                      // value="1"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="inner">
                <div className="inner-title">Scale</div>
                <div className="inner-value">
                  <div>
                    <label htmlFor="scaleX">X</label>{" "}
                    <input
                      type="number"
                      name="scaleX"
                      id="scaleX"
                      // value="1.3"
                    />
                  </div>
                  <div>
                    <label htmlFor="scaleX">Y</label>{" "}
                    <input
                      type="number"
                      name="scaleY"
                      id="scaleY"
                      // value="2"
                    />
                  </div>
                  <div>
                    <label htmlFor="scaleX">Z</label>{" "}
                    <input
                      type="number"
                      name="scaleZ"
                      id="scaleZ"
                      // value="2"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="title">Camera</div>
            <div>
              <div className="inner">
                <label htmlFor="background">Background</label>
                <input type="color" name="background" id="background" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolBox;
