import * as React from "react";
import { Range, getTrackBackground } from "react-range";

const STEP = 5;
const MIN = 0;
const MAX = 500;

const SuperSimple = ({ rtl, values, setValues }) => {
  return (
    <div
      style={{
        transform: "scale(1)",
        cursor: "inherit",
        height: "36px",
        display: "flex",
        width: "50%",
      }}
    >
      <Range
        values={values}
        step={STEP}
        min={MIN}
        max={MAX}
        rtl={rtl}
        onChange={(values) => setValues(values)}
        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: "5px",
              width: "100%",
              borderRadius: "4px",
              background:
                "linear-gradient(to right, rgb(204, 204, 204) 0%, rgb(204, 204, 204) 2%, rgb(44, 177, 186) 2%, rgb(44, 177, 186) 20%, rgb(204, 204, 204) 20%, rgb(204, 204, 204) 100%)",
              alignSelf: " center",
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: "5px",
                width: "100%",
                borderRadius: "4px",
                background: getTrackBackground({
                  values,
                  colors: ["#ccc", "rgb(44, 177, 186)", "#ccc"],
                  min: MIN,
                  max: MAX,
                  rtl,
                }),
                alignSelf: "center",
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ index, props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              position: "absolute",
              zIndex: "0",
              cursor: isDragged ? "grabbing" : "grab",
              userSelect: "none",
              touchAction: "none",
              height: "15px",
              width: "15px",
              borderRadius: "50%",
              border: "1px solid white",
              backgroundColor: "rgb(44, 177, 186)",
              outline: "none",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: "translate(-2.18px, -6px)",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-28px",
                color: "#fff",
                fontSize: "12px",
                fontFamily: "vinted, sans-serif",
                padding: "4px",
                borderRadius: "4px",
                backgroundColor: "rgb(44, 177, 186)",
              }}
            >
              {values[index] + "€"}
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default SuperSimple;
