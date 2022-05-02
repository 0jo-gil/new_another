import React, { useRef, useEffect, useState } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { DragControls } from "three/examples/jsm/controls/DragControls";
import { data } from "../../data/data";

import { GrSplit, GrSplits } from "react-icons/gr";
import { MdOutlineSplitscreen } from "react-icons/md";
import { BsArrowsFullscreen, BsRecord } from "react-icons/bs";
import { BiExport, BiImport } from "react-icons/bi";
import { AiOutlineCamera, AiOutlinePlus } from "react-icons/ai";
import "../../style/Ground.scss";
import html2canvas from "html2canvas";
import * as PANOLENS from "panolens/build/panolens";

const Space = ({ setObject }) => {
  const space = useRef();
  const canvasBg = useRef();

  useEffect(() => {
    let scene,
      camera,
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

    const sceneSetup = () => {
      const width = spaceEl.clientWidth;
      const height = spaceEl.clientHeight;

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);

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

      const halfSizeModel = sizeBox * 0.5;
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

      camera.lookAt(centerBox.x, centerBox.y, centerBox.z);

      controls.target.set(centerBox.x, centerBox.y, centerBox.z);
    };

    const loadModel = () => {
      const fbxloader = new FBXLoader();

      // const panorama = new PANOLENS.ImagePanorama("./models/texture.jpeg");

      // const viewer = new PANOLENS.Viewer({
      //   container: document.querySelector(".card > div"),
      // });
      // console.log(viewer);
      // viewer.add(panorama);
      fbxloader.load(data[0].fbx, (object) => {
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
        const viewer = new PANOLENS.Viewer({
          container: canvasBg.current,
          controlBar: false,
        });
        viewer.add(panorama);

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
    const update = () => {
      time *= 0.001;
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
    };

    const animation = () => {
      // update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animation);
    };

    sceneSetup();
    addLights();
    loadModel();
    // loadBackground();
    animation();

    controls = new OrbitControls(camera, spaceEl);
  }, []);
  return (
    <div className="canvas-bg" ref={canvasBg}>
      <div
        style={{ width: "100%", height: "100%", backgroundColor: "none" }}
        ref={space}
      ></div>
    </div>
  );
};

const Ground = () => {
  const [object, setObject] = useState(null);
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
  let captureAni;
  let rot;

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
    }
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
          <li>
            <BsRecord />
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
        <Space setObject={setObject} />
      </div>
    </div>
  );
};

export default Ground;
