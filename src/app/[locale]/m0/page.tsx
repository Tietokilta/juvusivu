import CountDown from "@components/CountDown";
import Header from "@components/Header";
import { Window } from "@components/Window";
import { getCurrentLocale } from "@locales/server";

export default async function M0page() {
  const locale = await getCurrentLocale();
  return (
    <>
      <Header text="Muistinnollaus 101000" />
      <div className="mx-4 my-10 flex w-full justify-center">
        <Window>
          <div className="bg-juvu-white font-pixel">
            <CountDown date={"2026-02-13T14:00:00"} locale={locale} />
          </div>
        </Window>
      </div>
    </>
  );
}
