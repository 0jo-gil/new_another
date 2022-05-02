import React, { useState } from "react";
import "../../style/Ability.scss";
import { MdArrowDropDown, MdSingleBed } from "react-icons/md";
import { AiFillPlayCircle } from "react-icons/ai";

const Ability = () => {
  const middleMenu = [
    {
      id: 0,
      title: "Browse",
      sub: true,
      input: false,
    },
    {
      id: 1,
      title: "Category",
      sub: false,
      input: false,
      list: ["Drive", "Filters", "Performance", "Time", "Space"],
    },
    {
      id: 2,
      title: "Projects",
      sub: false,
      input: true,
      list: ["Load", "Save as"],
    },
    {
      id: 3,
      title: "Library",
      input: false,
      sub: true,
    },
  ];
  const [show, setShow] = useState(false);
  const [sublist, setSublist] = useState("");
  const [listIndex, setListIndex] = useState(0);
  const [select, setSelect] = useState(true);
  const [input, setInput] = useState(false);

  const handleClick = (content, id, input) => {
    if (content) {
      setListIndex(id);
      setSelect(true);
    } else {
      //   setListIndex(id);
      setShow(true);
      setSublist(middleMenu[id].list);
      if (input) {
        setInput(true);
      } else {
        setInput(false);
      }
    }
    // setShow(select);
  };
  return (
    <div className="ability-wrap">
      <div className="upper">
        <span>
          <AiFillPlayCircle />
        </span>
        <input type="text" placeholder="Search" />
      </div>
      <div className="lower">
        <div className="left-wrap">
          {middleMenu.map((list, index) => (
            <div
              key={list.id}
              className={
                select && listIndex === index
                  ? `left-menu ${list.title} show`
                  : `left-menu ${list.title}`
              }
              onClick={() => handleClick(list.sub, list.id, list.input)}
            >
              <div className="title">
                {list.title}
                {list.sub && (
                  <span>
                    {" "}
                    <MdArrowDropDown />
                  </span>
                )}
              </div>
              {list.sub && <div className="sub-window"></div>}
            </div>
          ))}
        </div>
        <div className="right-wrap">
          <div className="title">
            Name{" "}
            <span>
              <MdArrowDropDown />
            </span>
          </div>
          <ul>
            {show &&
              sublist.map((list, index) => (
                <li key={index}>
                  {input ? (
                    <>
                      <input type="file" name={list} id={list} />
                      <label htmlFor={list}>{list}</label>
                    </>
                  ) : (
                    list
                  )}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Ability;
