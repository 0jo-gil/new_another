import React from "react";
import { GrSplit, GrSplits } from "react-icons/gr";
import { MdOutlineSplitscreen } from "react-icons/md";
import { BsArrowsFullscreen, BsRecord } from "react-icons/bs";
import { BiExport, BiImport } from "react-icons/bi";
import { AiOutlineCamera, AiOutlinePlus } from "react-icons/ai";

import "../style/MainTool.scss";

const MainTool = () => {
  const toolList = [
    { id: 0, title: "File" },
    { id: 1, title: "Edit" },
    { id: 2, title: "Browser" },
    { id: 3, title: "View" },
    { id: 4, title: "Window" },
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
  return (
    <div className="main-tool-wrap">
      <ul className="gnb">
        {toolList.map((list, index) => (
          <li key={list.id}>{list.title}</li>
        ))}
      </ul>
      <div className="menu">
        <ul className="left-menu">
          {menuList[0].map((list, index) => (
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
          {menuList[1].map((list, index) => (
            <li key={list.id}>{list.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MainTool;
