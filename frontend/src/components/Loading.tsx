const Loading = ({ text = "Loading..." }: { text?: string }) => {
  const letters = text?.split("");
  return (
    <>
      <div className="flex items-center justify-center text-slate-900 flex-col">
        <div className="flex items-center justify-center size-20">
          <div className="size-10 animate-spin duration-500 border-4 border-slate-800 rounded-full border-t-transparent flex items-center justify-center  ">
            <div className="size-6 animate-spin duration-500 border-4 border-slate-700 rounded-full border-t-transparent  border-r-transparent  "></div>
          </div>
        </div>
        {text && (
          <div className="flex text-xl font-bold">
            {letters?.map((letter, index) => (
              <div
                key={index}
                className={` animate-fading-text `}
                style={{ animationDelay: `${index * 0.12}s` }}
              >
                {letter === " " ? "\u00A0" : letter}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Loading;
