import React, { useState } from "react";
import { GrSplit, GrSplits } from "react-icons/gr";
import { MdOutlineSplitscreen } from "react-icons/md";
import { BsArrowsFullscreen, BsRecord } from "react-icons/bs";
import { BiExport, BiImport } from "react-icons/bi";
import { AiOutlineCamera, AiOutlinePlus } from "react-icons/ai";

import "../style/MainTool.scss";

const MainTool = () => {
  const [subActive, setSubActive] = useState(false);
  const [subIndex, setSubIndex] = useState("");
  const toolList = [
    { id: 0, title: "File", sub: ["New", "Add File", "Save", "Save as"] },
    { id: 1, title: "Edit", sub: ["Cut", "Copy", "Paste", "Delete"] },
    { id: 2, title: "Browser", sub: ["Minimize", "Open Editor"] },
    {
      id: 3,
      title: "View",
      sub: ["Show Library", "Show Tool Bar", "Enter Full Screen"],
    },
    {
      id: 4,
      title: "Window",
      sub: ["Open Controls", "Open Event List", "Show Mixer"],
    },
  ];

  const menuList = [
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
  const subClickHandler = (e, id) => {
    setSubIndex(id);
    setSubActive(true);

    document.addEventListener("click", (e) => {
      if (e.target.className !== "gnb-btn active") {
        setSubActive(false);
        setSubIndex("");
      }
    });
  };

  return (
    <div className="main-tool-wrap">
      <ul className="gnb">
        {toolList.map((list, index) => (
          <li
            className={subIndex === index ? "gnb-btn active" : "gnb-btn"}
            key={list.id}
            onClick={(e) => subClickHandler(e, list.id)}
          >
            {list.title}

            {subActive && subIndex === index ? (
              <ul className="gnb-sub">
                {list.sub.map((sub, index) => (
                  <li key={index}>{sub}</li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainTool;
