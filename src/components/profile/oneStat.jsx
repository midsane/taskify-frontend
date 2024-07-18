export default function OneStat({ number, field }) {
  return (
    <div
      className={`flex w-1/2 flex-col max-[417px]:flex-row-reverse max-[417px]:gap-10 max-[417px]:border-0 gap-2 dark:border-dark-background items-center justify-center ${
        field === "Your rank" ? "border-r-2" : "border-l"
      } `}
    >
      <h1 className="text-2xl max-[500px]:text-sm">{number}</h1>
      <p className="font-light max-[500px]:text-sm opacity-75">{field}</p>
    </div>
  );
}
