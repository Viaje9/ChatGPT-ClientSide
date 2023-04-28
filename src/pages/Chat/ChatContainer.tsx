import { useState, useRef, useMemo, useEffect, useCallback } from "react";
import "./Chat.css";
import Loading from "./Loading/Loading";
import ErrorContent from "./ErrorContent/ErrorContent";
import Content from "./Content/Content";
import menu from "/src/assets/images/menu.svg";

import { useChatContext } from "./ChatContext/Chat.context";
import { addMessage, removeRecord, setCurrentText } from "./ChatContext/Chat.action";
import { ChatUser } from "../../enum/chat-user.enum";
import { RecordInfo } from "./ChatContext/Chat.model";
import { ApiService } from "@/core/api/api.service";
import { isSuccess } from "@/core/utils/api-helper";

export const conversationRecord = (user: ChatUser, content: string): RecordInfo => ({
  user,
  content,
});

function ChatContainer() {
  const { state, getState, dispatch } = useChatContext();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [showTool, setShowTool] = useState(false);
  const scrollRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const currentScrollRef = scrollRef.current;

    if (currentScrollRef) {
      currentScrollRef.scrollTo({
        top: currentScrollRef.scrollHeight - currentScrollRef.offsetHeight,
        behavior: "smooth",
      });
    }
  }, [state.record]);


  const useTranslateBtnEvent = (lang: string) =>
    useCallback(() => {
      if (!state.userCurrentInputText) {
        return;
      }
      dispatch(setCurrentText(""));
      const dialog = conversationRecord(
        ChatUser.HUMAN,
        `"${state.userCurrentInputText}"${lang}的意思`
      );
      dispatch(addMessage(dialog));

      callOpenAi(state.record);
    }, [lang]);

  function callOpenAi(record: RecordInfo[]) {
    setApiError(false);
    setLoading(true);

    ApiService.callOpenAiCompletions({
      record,
    })
      .then((res) => {
        if (isSuccess(res.header)) {
          res.body.record
            .map((result) => conversationRecord(ChatUser.AI, result.text))
            .forEach((recordInfo: RecordInfo) => {
              dispatch(addMessage(recordInfo));
            });
        }

        if (isSuccess(res.header)) {
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

  function onSubmit() {
    if (!state.userCurrentInputText) {
      return;
    }

    if (submitRef && submitRef.current) {
      submitRef.current.focus();
    }
    const dialog = conversationRecord(ChatUser.USER, state.userCurrentInputText);
    dispatch(addMessage(dialog))
    console.log(getState());

    dispatch(setCurrentText(""));
    // console.log(state.record);

    callOpenAi(state.record)
  }

  return (
    <div className="App">
      <div className="flex flex-col items-center justify-center w-full screen-h overflow-y-hidden bg-gray-100 text-gray-800">
        <div className="main-container">
          <div className="header-area"></div>

          <div ref={scrollRef} className="view-container">
            {useMemo(() => state.record.map(Content), [state.record])}
            {ErrorContent(apiError, () => callOpenAi(state.record))}
            {Loading(loading)}
          </div>
          <div className={showTool ? "tool" : "tool hidden"}>
            {button("翻譯中文", useTranslateBtnEvent("中文"))}
            {button("翻譯英文", useTranslateBtnEvent("英文"))}
            <button
              onClick={() => {
                ApiService.callTest()
                  .then()
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
                dispatch(removeRecord());
                setApiError(false);
              }}
            >
              清除
            </button>
          </div>

          <div className="input-bar">
            <div className="w-full flex">
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
              <textarea
                className="flex outline-color items-center h-7 w-full rounded-3xl px-3 text-base bg-dark-gray text-white"
                value={state.userCurrentInputText}
                onChange={(e) => dispatch(setCurrentText(e.target.value))}
              ></textarea>
              <input
                ref={submitRef}
                disabled={loading}
                name="submit"
                className="w-20 text-white"
                type="submit"
                onClick={onSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function button(title: string, callback: () => void) {
  return (
    <button onClick={callback} type="button" className="top-btn">
      {title}
    </button>
  );
}

export default ChatContainer;
