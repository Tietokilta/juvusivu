import { getI18n } from "@locales/server";
import Header from "@components/Header";
import { Window } from "@components/Window";

export default async function NotFound() {
  const t = await getI18n();

  return (
    <>
      <Header
        text="Tietokilta 404 - Page Not Found"
        animated
        size="small"
        className="min-w-full py-10"
      />
      <main className="container mx-auto max-w-5xl px-8 py-8 sm:max-w-[90dvw]">
        <Window title={t("page-not-found")} className="mx-auto max-w-[500px]">
          <p className="mb-4">{t("page-not-found")}</p>
        </Window>
      </main>
    </>
  );
}
