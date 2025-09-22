import { ProgressBar } from "@components/basic/ProgressBar";
import { Window } from "@components/Window";
import { IlmomasiinaEvent } from "@lib/api/external/ilmomasiina";
import { getScopedI18n } from "@locales/server";

export default async function QuotaWindow({
  event,
}: {
  event: IlmomasiinaEvent;
}) {
  const t = await getScopedI18n("ilmomasiina");

  return (
    <Window title={t("quotas")} className="font-pixel">
      {event.quotas.map((quota) => (
        <div key={quota.id} className="mb-4">
          <p>
            {quota.title}{" "}
            {quota.size
              ? `(${quota.signupCount ?? 0}/${quota.size ?? 0})`
              : `(${quota.signupCount ?? 0})`}
          </p>
          <ProgressBar
            max={quota.size ?? 1}
            value={
              quota.size ? Math.min(quota.signupCount ?? 0, quota.size) : 0
            }
          />
        </div>
      ))}
    </Window>
  );
}
