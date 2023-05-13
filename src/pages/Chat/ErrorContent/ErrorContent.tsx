import refresh from "/src/assets/images/refresh.svg";

function ErrorContent(errorState:boolean, resend:()=>void) {
  if (errorState) {
    return (
      <div>
        <div className="flex w-full mt-2 space-x-3 max-w-xs">
          <div onClick={resend}>
            <div className="input-content border-2 border-rose-500 bg-dark-gray rounded-r-3xl rounded-bl-3xl flex">
              <p className=" text-base text-red-400">發生錯誤，點擊後重新發送。</p>
              <img src={refresh} alt="" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <></>;
}

export default ErrorContent;
