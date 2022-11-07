import React from "react";
import { useParallax } from "react-scroll-parallax";

const SpacewormsLeft = (props) => {
  const text = useParallax({
    translateX: [-50, 10],
  });
  return (
    <div className={props.className ? props.className : ""} ref={text.ref}>
      {props.children}
    </div>
  );
};
export default SpacewormsLeft;
