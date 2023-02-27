import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import "./Chat.css";
import request from "/src/core/api";
import Loading from "./Loading/Loading";
import ErrorContent from "./ErrorContent/ErrorContent";
import Content from "./Content/Content";
import menu from "/src/assets/images/menu.svg";

// localStorage.clear()
function Chat() {
  const [textInput, setTextInput] = useState("");
  const [record, setRecord] = useState(
    () => JSON.parse(localStorage.getItem("record")) || []
  );
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [showTool, setShowTool] = useState(false);
  const [toolClassName, setToolClassName] = useState('tool');
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

  useEffect(()=>{
    if(showTool) {
      setToolClassName('tool')
    }

    if(!showTool) {
      setToolClassName('tool hidden')
    }
  }, [showTool])

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
    setApiError(false);
    setLoading(true);
    request
      .post(`/openapi`, {
        record,
      })
      .then(({ data }) => {
        if (data.success) {
          const dialogList = data.record.choices.map((result) =>
            conversationRecord("AI", result.text)
          );
          setRecord([...record, ...dialogList]);
        }

        if (!data.success) {
          setApiError(true);
        }
      })
      .catch((error) => {
        setApiError(true);
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmit(event) {
    if (!textInput) {
      return;
    }
    submitRef.current.focus();
    setTextInput("");
    const dialog = conversationRecord("Human", textInput);
    const newRecord = [...record, dialog];
    setRecord(newRecord);
    callOpenAi(newRecord);
  }

  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center w-full screen-h overflow-y-hidden bg-gray-100 text-gray-800">
        <div className="main-container">
          <div className="header-area"></div>

          <div ref={scrollRef} className="view-container">
            {useMemo(() => record.map(Content))}
            {ErrorContent(apiError, () => callOpenAi(record))}
            {Loading(loading)}
          </div>
          <div className={toolClassName}>
            {button("翻譯中文", translateBtnEvent("中文"))}
            {button("翻譯英文", translateBtnEvent("英文"))}
            <button
              onClick={() => {
                request
                  .get(`/test`)
                  .then(() => {})
                  .catch((error) => {
                    console.log(error);
                    alert("not working");
                  });
              }}
              type="button"
              className="top-btn"
            >
              連線
            </button>
            <button
              className="top-btn"
              onClick={() => {
                localStorage.clear();
                setRecord([]);
                setApiError(false);
              }}
            >
              清除
            </button>
          </div>

          <div className="input-bar">
            <form
              className="w-full flex"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowTool(!showTool);
                }}
                type="button"
                className="pr-2"
              >
                <img src={menu} alt="" />
              </button>
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
    <button onClick={callback} type="button" className="top-btn">
      {title}
    </button>
  );
}

export default Chat;
