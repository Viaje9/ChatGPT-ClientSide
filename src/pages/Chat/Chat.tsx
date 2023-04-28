import { ChatProvider } from "./ChatContext/Chat.context";
import ChatContainer from "./ChatContainer";

function Chat() {
  return (
    <>
      <ChatProvider>
        <ChatContainer></ChatContainer>
      </ChatProvider>
    </>
  );
}



export default Chat;
