import { useState, useRef, useMemo, useEffect } from "react";
import axios from "axios";

function App() {
  const [textInput, setTextInput] = useState("");
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const currentScrollRef = scrollRef.current;
    currentScrollRef.scrollTo({
      top: currentScrollRef.scrollHeight - currentScrollRef.offsetHeight,
      behavior: "smooth",
    });
  }, [record]);

  const conversationRecord = (user, content) => ({ user, content });

  async function onSubmit(event) {
    if(!textInput) {
      return
    }
    setTextInput("");
    const dialog = conversationRecord("Human", textInput);
    const newRecord = [...record, dialog];
    setRecord(newRecord);

    setLoading(true);
    await axios
      .post("http://192.168.0.170:8000/openapi", {
        record: newRecord,
      })
      .then(({ data }) => {
        if (data.success) {
          const dialogList = data.record.choices.map((result) =>
            conversationRecord("AI", result.text)
          );
          setRecord([...newRecord, ...dialogList]);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center screen-w  screen-h overflow-y-hidden bg-gray-100 text-gray-800">
        <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
          <div ref={scrollRef} className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {useMemo(() => record.map(content))}
            {loadingComponent(loading)}
          </div>

          <div className="bg-gray-300 p-4 flex">
            <form className="w-full flex" onSubmit={(e) => e.preventDefault()}>
              <input
                className="flex items-center h-10 w-full rounded px-3 text-sm"
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <input name="submit" className="w-20" type="submit" onClick={onSubmit} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function content(params, index) {
  return (
    <div key={index}>
      {params.user !== "AI" ? (
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: params.content }}
              ></p>
            </div>
            {/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
          </div>
        </div>
      ) : (
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div>
            <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
              <p
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: params.content }}
              ></p>
            </div>
            {/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
          </div>
        </div>
      )}
    </div>
  );
}

function loadingComponent(state) {
  const [dot, setDot] = useState(".");

  useEffect(() => {
    const timer = setInterval(() => {
      if (dot.length === 0) {
        setDot(".");
      }

      if (dot.length === 1) {
        setDot("..");
      }

      if (dot.length === 2) {
        setDot("...");
      }

      if (dot.length === 3) {
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
          <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
            <p className="text-sm min-h-5">{dot}</p>
          </div>
          {/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
        </div>
      </div>
    );
  }

  return <></>;
}

export default App;
