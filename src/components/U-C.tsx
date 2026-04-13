import moment from 'moment';
import React from 'react'
import { InView } from "react-intersection-observer";

const ViewElement = ({
  visibleElement,
  setVisibleElement,
  i,
}: {
  visibleElement: number;
  setVisibleElement: (v: number) => void;
  i: number;
}) => {
  return (
    <div className="relative">
      <InView
        threshold={0.89}
        onChange={(v) => {
          if (v) {
            setVisibleElement(i);
          }
        }}
      >
        {({ ref }) => {
          return (
            <div
              ref={ref}
              style={{ width: 100 + i + "px" }}
              className={`h-[calc(100vh-_77px)] absolute border border-red-500 w-80 ${
                visibleElement == i ? "" : ""
              }`}
            ></div>
          );
        }}
      </InView>
      <div className="p-4 h-full relative">
        <div
          className={`text-[16px] border-b h-9 flex justify-start items-center text-gray-500 sticky top-[76px] font-bold bg-white ${
            visibleElement == i ? "bg-red-500" : ""
          }`}
        >
          {moment().add(i, "day").format("D MMM [•] dddd")}
        </div>
        <p>Hee</p>
        <p>Hee</p>
        <p>Hee</p>
        <p>Hee</p>
        <p>Hee</p>
        <p>Hee</p>
        <p>Hee</p>
        <p>Hee</p>
        <p>Hee</p>
        <p>Hee</p>
        <p>Hee</p>
        <p>Hee</p>
      </div>
    </div>
  );
};








function UpcomingSection() {
  return (
    <>
    



    
    
    </>
  )
}

export default UpcomingSection