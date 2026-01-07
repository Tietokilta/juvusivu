import Image from "next/image";
import { Redaction } from "./Redaction";

export default function MainHeader() {
  return (
    <div
      className={`bg-juvu-blue-dark text-juvu-lightblue-dark relative flex flex-col items-center justify-center md:h-[95dvh] md:max-h-[900px] md:min-h-[600px]`}
    >
      <Redaction text="Tietokilta" size="large" animated={true} />
      <Image
        src="/40_logo.svg"
        width={842}
        height={510}
        alt="Logo"
        className="min-h-4 flex-1 px-5"
      />
      <Redaction text="101000" size="large" animated={true} />
    </div>
  );
}
