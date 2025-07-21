import CountDown from "@components/CountDown";
import { Redaction } from "@components/Redaction";

export default function M0page() {
  return (
    <>
      <Redaction text="Muistinnollaus 101000" />
      <div className="flex w-full justify-center">
        <CountDown date={"2026-02-13T14:00:00"} />
      </div>
    </>
  );
}
