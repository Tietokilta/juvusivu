import localFont from "next/font/local";

const redaction35 = localFont({
  src: "../../../public/fonts/Redaction_35-Bold.woff2",
});

export const Redaction = ({ text }: { text: string }) => {
  return (
    <h1 className={`${redaction35.className} m-8 text-center text-8xl`}>
      {text}
    </h1>
  );
};
