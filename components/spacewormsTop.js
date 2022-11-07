import React from "react";
import { useParallax } from "react-scroll-parallax";

const SpacewormsTop = (props) => {
  const text = useParallax({
    translateY: [-50, 50],
  });
  return (
    <div className={props.className ? props.className : ""} ref={text.ref}>
      {props.children}
    </div>
  );
};
export default SpacewormsTop;
