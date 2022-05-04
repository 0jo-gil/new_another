import React, { useRef, useEffect, useState } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { data } from "../../data/data";

import { GrSplit, GrSplits } from "react-icons/gr";
import { MdOutlineSplitscreen } from "react-icons/md";
import { BsArrowsFullscreen, BsRecord } from "react-icons/bs";
import { BiExport, BiImport } from "react-icons/bi";
import { AiOutlineCamera, AiOutlinePlus } from "react-icons/ai";

import { ImDownload, ImUpload } from "react-icons/im";
import "../../style/Ground.scss";
import html2canvas from "html2canvas";
import * as PANOLENS from "panolens/build/panolens";

let viewer;

export const Space = ({ setObject, playEl, setModal }) => {
  const space = useRef();
  const canvasBg = useRef();
  let [objIndex, setObjIndex] = useState(0);

  useEffect(() => {
    let scene,
      camera,
      orthographicCamera,
      renderer,
      controls,
      model,
      group,
      mixer,
      action,
      rot,
      controls2,
      captureAni;

    let rotateNum = 0;
    let objects = [];
    let spaceEl = space.current;
    let time = 1;
    let clock = new THREE.Clock();
    let radian = Math.PI / 180;

    let playElement = playEl.current;
    console.log(playElement);

    spaceEl.innerHTML = "";

    const sceneSetup = () => {
      const width = spaceEl.clientWidth;
      const height = spaceEl.clientHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

      const vec = new THREE.Vector3();
      camera.getWorldDirection(vec);
      vec.y = 0;
      vec.add(0);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true,
        alpha: true,
      });

      renderer.setSize(width, height);
      renderer.clearColor();
      renderer.setClearColor(0xffffff, 0);

      spaceEl.appendChild(renderer.domElement);
    };

    const zoomFit = (object3D, camera, viewMode, bFront) => {
      const box = new THREE.Box3().setFromObject(object3D);
      const sizeBox = box.getSize(new THREE.Vector3()).length();

      const centerBox = box.getCenter(new THREE.Vector3());

      let offsetX = 0,
        offsetY = 0,
        offsetZ = 0;
      viewMode === "X"
        ? (offsetX = 1)
        : viewMode === "Y"
        ? (offsetY = 1)
        : (offsetZ = 1);

      if (!bFront) {
        offsetX *= -1;
        offsetY *= -1;
        offsetZ *= -1;
      }

      camera.position.set(
        centerBox.x + offsetX,
        centerBox.y + offsetY,
        centerBox.z + offsetZ
      );

      const halfSizeModel = sizeBox * 1;
      const halfFov = THREE.Math.degToRad(camera.fov * 0.5);
      const distance = halfSizeModel / Math.tan(halfFov);

      const direction = new THREE.Vector3()
        .subVectors(camera.position, centerBox)
        .normalize();
      const position = direction.multiplyScalar(distance).add(centerBox);

      camera.position.copy(position);
      camera.near = sizeBox / 100;
      camera.far = sizeBox * 100;

      camera.updateProjectionMatrix();
      camera.lookAt(0, 0, 0);

      // camera.lookAt(centerBox.x, centerBox.y, centerBox.z);

      controls.target.set(centerBox.x, centerBox.y, centerBox.z);
    };

    const loadModel = () => {
      const fbxloader = new FBXLoader();

      fbxloader.load(data[objIndex].fbx, (object) => {
        mixer = new THREE.AnimationMixer(object);

        object.rotateY(radian * 20);
        model = object;

        object.children.forEach((child) => {
          objects.push(child);
        });

        zoomFit(object, camera, "Z", true);
        scene.add(object);
        controls2 = new DragControls([object], camera, renderer.domElement);
        controls2.transformRoot = true;
        controls2.transformGroup = true;

        controls2.addEventListener("dragstart", function () {
          controls.enabled = false;
        });
        controls2.addEventListener("dragend", function () {
          controls.enabled = true;
        });
        setObject(object);

        const panorama = new PANOLENS.ImagePanorama("./models/texture.jpeg");
        viewer = new PANOLENS.Viewer({
          container: canvasBg.current,
          controlBar: false,
          autoRotate: true,
          autoRotateSpeed: -3,
        });
        // viewer.add(panorama);

        playElement.addEventListener("click", () => {
          setModal(false);
          if (data[objIndex].animation) {
            action = mixer.clipAction(object.animations[0]);
            action.play();
          }
        });

        // document.querySelector(".captureBtn").addEventListener("click", (e) => {

        // });
        // action.play();

        // if (objData[dataIndex].animation) {
        //   action = mixer.clipAction(object.animations[0]);
        //   action.play();
        // }
      });
    };
    const addLights = () => {
      const lights = [];

      // set color and intensity of lights
      lights[0] = new THREE.PointLight(0xffffff, 1, 0);
      lights[1] = new THREE.PointLight(0xffffff, 1, 0);
      lights[2] = new THREE.PointLight(0xffffff, 1, 0);

      // place some lights around the scene for best looks and feel
      lights[0].position.set(1000, 2000, 100);
      lights[1].position.set(1000, 1000, 1000);
      lights[2].position.set(-2000, 1000, -1000);

      scene.add(lights[0]);
      scene.add(lights[1]);
      scene.add(lights[2]);
    };
    let angle = 0,
      radius = 1;
    sceneSetup();
    addLights();
    loadModel();
    controls = new OrbitControls(camera, spaceEl);
    // controls = new TrackballControls(camera, spaceEl);

    let t = 0;
    const update = () => {
      time *= 0.001;
      t += 0.05;
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      camera.position.x = 720 * Math.sin(t / (Math.PI * 5)) + 0;
      camera.position.y = 720 * Math.cos(t / (Math.PI * 5)) + 0;
      // camera.position.z = 20 * Math.cos(t) + 300;
      // camera.position.z = 20 * Math.sin(t) + 300;
      // camera.position

      // camera.position.x = Math.cos(angle) * radius;
      // camera.position.z = Math.sin(angle) * radius;
      // angle += new THREE.Math.degToRad(20) * delta;
    };

    let x = 0;

    const render = () => {
      let time = Date.now() * 0.0005;
      x += 1;
      // console.log(model);
      // camera.position.x = ;
      // camera.position.x = Math.sin(time * 10) * x;
      // camera.position.y = Math.cos(time * 7) * 10;

      // camera.rotation.y += 0.05;
    };
    const animation = () => {
      update();
      render();
      // camera.lookAt(point);
      controls.update();
      // controls.target;
      // controls.autoRotate = true;
      // controls.autoRotateSpeed = -3;

      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animation);
    };

    // loadBackground();
    animation();
  }, [objIndex]);

  return (
    <>
      <div className="canvas-bg" ref={canvasBg}>
        <div
          style={{ width: "100%", height: "100%", backgroundColor: "none" }}
          ref={space}
        ></div>
      </div>
      <div className="canvas-btn-wrap">
        <ul>
          <li onClick={() => setObjIndex(0)}>
            <ImDownload />
          </li>
          <li onClick={() => setObjIndex(1)}>
            <ImUpload />
          </li>
        </ul>
      </div>
    </>
  );
};

const Ground = () => {
  const [object, setObject] = useState(null);
  const [importModal, setImportModal] = useState(false);
  // const [isData, setData] = useState(data);
  const [listIndex, setListIndex] = useState(0);
  const playEl = useRef();
  const sceneBtn = [
    [
      { id: 0, title: <GrSplit /> },
      { id: 1, title: <GrSplits /> },
      { id: 2, title: "Link" },
      { id: 3, title: <MdOutlineSplitscreen /> },
      { id: 4, title: <BsArrowsFullscreen /> },
      { id: 5, title: "100%" },
    ],
    [
      { id: 0, title: <AiOutlineCamera /> },
      { id: 1, title: <BiImport /> },
      { id: 2, title: <BiExport /> },
    ],
  ];

  const canvasEl = useRef();

  let captureNum = 0;
  let rotateNum = 0;
  let panoramaNum = 0;
  let captureAni;
  let rot, panoramaRot;

  const saveAs = (uri, name) => {
    let link = document.createElement("a");

    link.href = uri;
    link.download = name;
    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
  };

  const cameraRotation = () => {
    if (rotateNum >= 0.065) {
      cancelAnimationFrame(rot);
      rotateNum = 0;
    } else {
      rotateNum += 0.001;
      object.rotateY(rotateNum);

      rot = requestAnimationFrame(cameraRotation);
    }

    if (panoramaNum >= 1) {
      cancelAnimationFrame(panoramaNum);
      panoramaNum = 0;
    } else {
      panoramaNum += 0.01;
      viewer.addUpdateCallback(function () {
        viewer.panorama.rotation.y = panoramaNum * 2;
      });
    }
  };

  const captureHandler = (id) => {
    if (id === 0) {
      captureAni = setInterval(() => {
        if (captureNum < 6) {
          captureNum++;
          cameraRotation();
          html2canvas(canvasEl.current).then((canvas) => {
            saveAs(canvas.toDataURL("image/png"), "test.png");
          });
        } else {
          captureNum = 0;
          clearInterval(captureAni);
        }
      }, 500);
    } else if (id === 1) {
      setImportModal(!importModal);
      setListIndex(id);
    }
  };

  const [isValue, setValue] = useState(0);

  const frameHandler = (e) => {
    let value = e.target.value;
    setValue(value);
  };

  return (
    <div className="ground-wrap">
      <div className="btn-wrap">
        <ul className="left-menu">
          {sceneBtn[0].map((list, index) => (
            <li key={list.id}>{list.title}</li>
          ))}
        </ul>
        <ul className="middle-menu">
          <li>0:01:025</li>
          <li>0:21:131</li>
          <li onClick={() => setImportModal(true)}>
            <BsRecord />
            <div
              className="frame-modal"
              style={
                importModal === true
                  ? { display: "block" }
                  : { display: "none" }
              }
            >
              <input
                type="range"
                name="frame"
                id="frame"
                defaultValue={0}
                max={60}
                onChange={frameHandler}
              />
              <label htmlFor="frame">fps. {isValue}</label>
              <button ref={playEl}>PLAY</button>
            </div>
          </li>
          <li>
            <AiOutlinePlus />
          </li>
        </ul>
        <ul className="right-menu">
          {sceneBtn[1].map((list, index) => (
            <li key={list.id} onClick={() => captureHandler(list.id)}>
              {list.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="space-wrap" ref={canvasEl}>
        <Space
          setObject={setObject}
          playEl={playEl}
          setModal={setImportModal}
        />
      </div>
    </div>
  );
};

export default Ground;
