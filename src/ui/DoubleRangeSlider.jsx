import styled from "styled-components";
import { format, parseISO, addDays } from "date-fns";
import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const RangeContainer = styled.div`
  //  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Slider = styled.div`
  position: relative;
  width: 300px;
`;

const SliderTrack = styled.div`
  position: absolute;
  border-radius: 3px;
  height: 5px;
  background-color: #9e0c0c;
  width: 100%;
  z-index: 1;
`;

const SliderRange = styled.div`
  position: absolute;
  border-radius: 3px;
  height: 5px;
  background-color: #9fe5e1;
  z-index: 2;
`;

const SliderLeftValue = styled.div`
  position: absolute;
  color: #dee2e6;
  font-size: 12px;
  margin-top: 20px;
  left: 6px;
`;

const SliderRightValue = styled.div`
  position: absolute;
  color: #dee2e6;
  font-size: 12px;
  margin-top: 20px;
  right: -4px;
`;

const InputLeft = styled.input`
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 300px;
  outline: none;
  z-index: 5;
  &&::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  &&::-webkit-slider-thumb {
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
  &&::-moz-range-thumb {
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;

const InputRight = styled.input`
  pointer-events: none;
  position: absolute;
  height: 0;
  width: 300px;
  outline: none;
  z-index: 4;
  &&::-webkit-slider-thumb {
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  &&::-webkit-slider-thumb {
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
  &&::-moz-range-thumb {
    background-color: #f1f5f7;
    border: none;
    border-radius: 50%;
    box-shadow: 0 0 1px 1px #ced4da;
    cursor: pointer;
    height: 18px;
    width: 18px;
    margin-top: 4px;
    pointer-events: all;
    position: relative;
  }
`;

const MultiRangeSlider = ({
  min,
  max,
  onChange,
  width = "300px",
  startingDate = "2024-01-01",
}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  const startInterval = addDays(parseISO(startingDate), minVal);
  const endInterval = addDays(parseISO(startingDate), maxVal);

  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(minVal);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [minVal, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(maxVal);

      if (range.current) {
        range.current.style.width = `${maxPercent - minPercent}%`;
      }
    }
  }, [maxVal, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  return (
    <RangeContainer>
      {/* LEFT */}
      <InputLeft
        type="range"
        min={min}
        max={max}
        value={minVal}
        ref={minValRef}
        onChange={(event) => {
          const value = Math.min(+event.target.value, maxVal - 1);
          setMinVal(value);
          event.target.value = value.toString();
        }}
        // className={classnames("thumb thumb--zindex-3", {
        //   "thumb--zindex-5": minVal > max - 100,
        // })}
        // className="thumb thumb--zindex-5"
      />
      {/* RIGHT */}
      <InputRight
        type="range"
        min={min}
        max={max}
        value={maxVal}
        ref={maxValRef}
        onChange={(event) => {
          const value = Math.max(+event.target.value, minVal + 1);
          setMaxVal(value);
          event.target.value = value.toString();
        }}
        // className="thumb thumb--zindex-4"
      />

      <Slider>
        <SliderTrack />
        <SliderRange ref={range} />
        <SliderLeftValue>{format(startInterval, "MM/dd/yyyy")}</SliderLeftValue>
        <SliderRightValue>{format(endInterval, "MM/dd/yyyy")}</SliderRightValue>
      </Slider>
    </RangeContainer>
  );
};

MultiRangeSlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  startingDate: PropTypes.string,
};

export default MultiRangeSlider;

//export default DoubleRangeSlider
