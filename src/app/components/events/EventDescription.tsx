import { Window } from "@components/Window";
import { UserEventResponse } from "@tietokilta/ilmomasiina-models";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { remarkI18n } from "@lib/plugins/remark-i18n";
import { getLocale, getTranslations } from "next-intl/server";

export const EventDescription = async ({
  event,
}: {
  event: UserEventResponse;
}) => {
  const t = await getTranslations("ilmomasiina");
  const locale = await getLocale();
  return (
    <Window title={t("description")}>
      {event.description ? (
        <div className="prose text-accent-dark max-w-none">
          <Markdown remarkPlugins={[[remarkI18n, { locale }], remarkGfm]}>
            {event.description}
          </Markdown>
        </div>
      ) : null}
    </Window>
  );
};
