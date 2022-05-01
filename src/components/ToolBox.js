import React from "react";

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from "react-circular-input";

import "../style/ToolBox.scss";

const ToolBox = () => {
  const knobList = [
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
  ];

  const knobHandler = (e, id) => {
    const valueList = knobList;
    console.log(e);
    valueList[id].value = e;
    console.log(valueList);
  };

  return (
    <div className="toolbox-wrap">
      <div className="contents-wrap">
        <div className="content knob-wrap">
          {knobList.map((knob) => (
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

              <p className="knob-value">{knob.value * 100} %</p>
            </div>
          ))}
        </div>
        <div className="content console-wrap"></div>
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
                      value="1"
                    />
                  </div>
                  <div>
                    <label htmlFor="positionX">Y</label>{" "}
                    <input
                      type="number"
                      name="positionY"
                      id="positionY"
                      value="6.3"
                    />
                  </div>
                  <div>
                    <label htmlFor="positionX">Z</label>{" "}
                    <input
                      type="number"
                      name="positionZ"
                      id="positionZ"
                      value="2.2"
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
                      value="1"
                    />
                  </div>
                  <div>
                    <label htmlFor="rotationX">Y</label>{" "}
                    <input
                      type="number"
                      name="rotationY"
                      id="rotationY"
                      value="1"
                    />
                  </div>
                  <div>
                    <label htmlFor="rotationX">Z</label>{" "}
                    <input
                      type="number"
                      name="rotationZ"
                      id="rotationZ"
                      value="1"
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
                      value="1.3"
                    />
                  </div>
                  <div>
                    <label htmlFor="scaleX">Y</label>{" "}
                    <input type="number" name="scaleY" id="scaleY" value="2" />
                  </div>
                  <div>
                    <label htmlFor="scaleX">Z</label>{" "}
                    <input type="number" name="scaleZ" id="scaleZ" value="2" />
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
