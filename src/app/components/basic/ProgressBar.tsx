export const ProgressBar = ({ max, value }: { max: number; value: number }) => {
  let maxValue = max;
  let progressValue = value;

  // Limit amount of segments to prevent overflow
  if (max > 25) {
    maxValue = 25;
    progressValue = Math.round((value / max) * 25);
  }

  return (
    <div className="border-accent-dark flex w-full gap-[2px] border-2 p-[2px]">
      {Array.from({ length: progressValue }).map((_, i) => (
        <span
          key={`filled-${i}`}
          className="bg-accent-dark inline-block h-[15px] min-w-1 flex-1"
        />
      ))}
      {Array.from({ length: maxValue - progressValue }).map((_, i) => (
        <span
          key={`empty-${i}`}
          className="inline-block h-[15px] min-w-1 flex-1"
        />
      ))}
    </div>
  );
};
