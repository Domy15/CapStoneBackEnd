import React, { useEffect, useRef } from "react";

const CustomRangeSlider = ({ min, max, step, value, onChange }) => {
  const progressRef = useRef(null);

  useEffect(() => {
    const percent = ((value - min) / (max - min)) * 100;
    if (progressRef.current) {
      progressRef.current.style.width = `${percent}%`;
    }
  }, [value, min, max]);

  const handleChange = (e) => {
    const newVal = Number(e.target.value);
    onChange(newVal);
  };

  return (
    <div className="slider-wrapper">
      <div className="slider-progress" ref={progressRef}></div>
      <input
        type="range"
        className="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomRangeSlider;