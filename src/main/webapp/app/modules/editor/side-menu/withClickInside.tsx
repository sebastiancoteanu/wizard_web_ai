import React, { MutableRefObject, useEffect, useRef, useState } from "react";

interface ReturnData {
  isClickedInside: boolean;
  wrapperRef: MutableRefObject<HTMLDivElement>;
  clickInside: () => void;
}

type Hook = () => ReturnData;

const withClickInside: Hook = () => {
  const wrapperRef = useRef<HTMLDivElement>();
  const [isClickedInside, setClickInside] = useState(false);

  const handleClickOutside: EventListener = (e) => {
    if (wrapperRef.current.contains(e.target as Node)) {
      return;
    }
    setClickInside(false);
  };

  const clickInside = () => setClickInside(true);

  useEffect(() => {
    if (isClickedInside) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isClickedInside]);

  return {
    wrapperRef,
    isClickedInside,
    clickInside
  }
};

export default withClickInside;
