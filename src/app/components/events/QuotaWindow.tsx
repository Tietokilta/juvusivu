import { ProgressBar } from "@components/basic/ProgressBar";
import { Window } from "@components/Window";
import { getScopedI18n } from "@locales/server";
import { getSignupsByQuota } from "@tietokilta/ilmomasiina-client/dist/utils/signupUtils";
import {
  SignupStatus,
  UserEventResponse,
} from "@tietokilta/ilmomasiina-models";

export default async function QuotaWindow({
  event,
}: {
  event: UserEventResponse;
}) {
  const t = await getScopedI18n("ilmomasiina");

  return (
    <Window title={t("quotas")} className="font-pixel">
      {getSignupsByQuota(event).map((quota) => {
        switch (quota.type) {
          case SignupStatus.IN_QUOTA:
            return (
              <QuotaProgress
                key={quota.id}
                title={quota.title ?? t("headers.Kiintiö")}
                size={quota.size}
                signupCount={quota.signupCount}
              />
            );
          case SignupStatus.IN_OPEN_QUOTA:
            return (
              <QuotaProgress
                key={quota.id}
                title={t("Avoin kiintiö")}
                size={quota.size}
                signupCount={quota.signupCount}
              />
            );
          case SignupStatus.IN_QUEUE:
            if (quota.signupCount > 0) {
              return <p>{`${t("Jonossa")}: ${quota.signupCount}`}</p>;
            }
        }
      })}
    </Window>
  );
}

const QuotaProgress = ({
  title,
  size,
  signupCount,
}: {
  title: string;
  size: number | null;
  signupCount: number | null;
}) => {
  return (
    <div className="mb-4">
      <p>
        {title}{" "}
        {size ? `(${signupCount ?? 0}/${size ?? 0})` : `(${signupCount ?? 0})`}
      </p>
      <ProgressBar
        max={size ?? 1}
        value={size ? Math.min(signupCount ?? 0, size) : 0}
      />
    </div>
  );
};
