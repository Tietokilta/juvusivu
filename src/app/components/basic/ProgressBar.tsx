export const ProgressBar = ({ max, value }: { max: number; value: number }) => {
  return (
    <div className="border-accent-dark flex w-1/1 gap-[2px] border-2 p-[2px]">
      {Array.from({ length: value }).map((_, i) => (
        <span
          key={`filled-${i}`}
          className="bg-accent-dark inline-block h-[15px] min-w-1 flex-1"
        />
      ))}
      {Array.from({ length: max - value }).map((_, i) => (
        <span
          key={`empty-${i}`}
          className="inline-block h-[15px] min-w-1 flex-1"
        />
      ))}
    </div>
  );
};
