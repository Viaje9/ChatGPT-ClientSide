import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import axios from "axios";
import './App.css'

const PORT = 8000
// localStorage.clear()
function App() {
  const [textInput, setTextInput] = useState("");
  const [record, setRecord] = useState(
    () => JSON.parse(localStorage.getItem("record")) || []
  );
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);
  const submitRef = useRef(null);

  useEffect(() => {
    const currentScrollRef = scrollRef.current;
    currentScrollRef.scrollTo({
      top: currentScrollRef.scrollHeight - currentScrollRef.offsetHeight,
      behavior: "smooth",
    });

    localStorage.setItem("record", JSON.stringify(record));
  }, [record]);

  const conversationRecord = (user, content) => ({ user, content });

  const translateBtnEvent = (lang) =>
    useCallback(() => {
      if (!textInput) {
        return;
      }
      setTextInput("");
      const dialog = conversationRecord("Human", `"${textInput}"${lang}的意思`);
      const newRecord = [...record, dialog];
      setRecord(newRecord);
      callOpenAi(newRecord);
    });

  function callOpenAi(record) {
    setLoading(true);
    axios
    .post(`https://chat-gtp-server-side.vercel.app/openapi`, {
        record,
      })
      // .post(`http://${ window.location.hostname}:${PORT}/openapi`, {
      //   record,
      // })
      .then(({ data }) => {
        if (data.success) {
          const dialogList = data.record.choices.map((result) =>
            conversationRecord("AI", result.text)
          );
          setRecord([...record, ...dialogList]);
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmit(event) {
    if (!textInput) {
      return;
    }
    submitRef.current.focus()
    setTextInput("");
    const dialog = conversationRecord("Human", textInput);
    const newRecord = [...record, dialog];
    setRecord(newRecord);
    callOpenAi(newRecord);
  }

  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center screen-w  screen-h overflow-y-hidden bg-gray-100 text-gray-800">
        <div className="main-container">
          {/* <div className="header-area">
            {button("翻譯中文", translateBtnEvent("中文"))}
            {button("翻譯英文", translateBtnEvent("英文"))}
            <button
              onClick={() => {
                axios
                .get(`https://chat-gtp-server-side.vercel.app/test`)

                  // .get(`http://${ window.location.hostname}:${PORT}/test`)
                  .then(() => {})
                  .catch((error) => {
                    alert("not working");
                  });
              }}
              type="button"
              className="top-btn"
            >
              連線
            </button>
          </div> */}
         
          <div
            ref={scrollRef}
            className="view-container"
          >
            {useMemo(() => record.map(content))}
            {loadingComponent(loading)}
          </div>

          <div className="input-bar">
            <form
              className="w-full flex"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className="flex outline-color items-center h-9 w-full rounded-3xl px-3 text-base bg-dark-gray text-white"
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
              />
              <input
                ref={submitRef}
                disabled={loading}
                name="submit"
                className="w-20 text-white"
                type="submit"
                onClick={onSubmit}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

function button(title, callback) {
  return (
    <button
      onClick={callback}
      type="button"
      className="top-btn"
    >
      {title}
    </button>
  );
}

function content(params, index) {
  return (
    <div key={index}>
      {params.user !== "AI" ? (
        <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
          <div>
            <div className="input-content bg-bright-green rounded-l-3xl rounded-br-3xl">
              <p
                className="text-base"
                dangerouslySetInnerHTML={{ __html: params.content }}
              ></p>
            </div>
            {/* <span className="text-xs text-gray-500 leading-none">2 min ago</span> */}
          </div>
        </div>
      ) : (
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div>
            <div className="input-content bg-dark-gray rounded-r-3xl rounded-bl-3xl">
              <p
                className="text-base"
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
