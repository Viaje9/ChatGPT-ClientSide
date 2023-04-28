function Content(params, index) {
  return (
    <div key={index}>
      {params.user !== "assistant" ? (
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

export default Content;
