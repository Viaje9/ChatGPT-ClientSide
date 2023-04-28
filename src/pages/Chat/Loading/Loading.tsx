import { useState, useEffect } from "react";

function Loading(state) {
  const [dot, setDot] = useState(".");

  useEffect(() => {
    const timer = setInterval(() => {
      if (dot.length === 0) {
        setDot("•");
      }

      if (dot.length === 1) {
        setDot("• •");
      }

      if (dot.length === 3) {
        setDot("• • •");
      }

      if (dot.length === 5) {
        setDot("");
      }
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, [dot]);

  if (state) {
    return (
      <div className="flex w-full mt-2 space-x-3 max-w-xs">
        {/* <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300"></div> */}
        <div>
          <div className="bg-dark-gray p-3 rounded-r-2xl rounded-bl-2xl">
            <p className="text-sm min-h-5 text-white">{dot}</p>
          </div>
          {/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
        </div>
      </div>
    );
  }

  return <></>;
}

export default Loading;
