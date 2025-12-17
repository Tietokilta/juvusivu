import CountDown from "@components/CountDown";
import Header from "@components/Header";
import { Window } from "@components/Window";
import { getCurrentLocale } from "@locales/server";

export default async function M0page() {
  const locale = await getCurrentLocale();
  return (
    <>
      <Header text="Muistinnollaus 101000" />
      <main className="container mx-auto max-w-5xl px-4 py-8">
        <Window className="mx-auto max-w-[500px]">
          <div className="bg-juvu-white font-pixel">
            <CountDown date={"2026-02-13T14:00:00"} locale={locale} />
          </div>
        </Window>
      </main>
    </>
  );
}
