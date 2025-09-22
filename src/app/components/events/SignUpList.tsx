import {
  EventQuestion,
  QuestionAnswer,
  QuotaSignup,
  QuotaSignupWithQuotaTitle,
  EventQuota,
  EventQuotaWithSignups,
  OPEN_QUOTA_ID,
  QUEUE_QUOTA_ID,
  IlmomasiinaEvent,
  getQuotasWithOpenAndQueue,
} from "@lib/api/external/ilmomasiina";
import { getScopedI18n } from "@locales/server";

function getFormattedAnswer(
  question: EventQuestion,
  answers: QuestionAnswer[],
) {
  const answer = answers.find((a) => a.questionId === question.id)?.answer;

  if (!answer) {
    return "";
  }

  if (Array.isArray(answer)) {
    return answer.join(", ");
  }

  return answer;
}

async function SignUpRow({
  signup,
  publicQuestions,
  isGeneratedQuota,
}: {
  signup: QuotaSignup | QuotaSignupWithQuotaTitle;
  publicQuestions: EventQuestion[];
  isGeneratedQuota: boolean;
}) {
  const t = await getScopedI18n("ilmomasiina");
  return (
    <tr className="odd:bg-row-odd even:bg-row-even">
      <td className="font-pixel border-b border-gray-900 px-2 py-1 text-base">
        <span>{signup.position}.</span>
      </td>
      <td className="font-pixel border-b border-gray-900 px-2 py-1 text-base">
        {signup.namePublic ? (
          <span>
            {signup.firstName} {signup.lastName}
          </span>
        ) : (
          <span className="italic">
            {signup.confirmed ? t("Piilotettu") : t("Vahvistamaton")}
          </span>
        )}
      </td>
      {publicQuestions.map((question) => (
        <td
          key={question.id}
          className="font-pixel border-b border-gray-900 px-2 py-1 text-base"
        >
          {getFormattedAnswer(question, signup.answers)}
        </td>
      ))}
      {isGeneratedQuota ? (
        <td className="font-pixel border-b border-gray-900 px-2 py-1 text-base">
          {"quotaTitle" in signup ? signup.quotaTitle : ""}
        </td>
      ) : null}
      <td className="font-pixel border-b border-gray-900 px-2 py-1 text-base">
        {new Date(signup.createdAt).toLocaleString("fi-FI", {
          timeZone: "Europe/Helsinki",
        })}
      </td>
    </tr>
  );
}

async function SignUpTable({
  quota,
  publicQuestions,
  signupsPublic,
}: {
  quota: EventQuota | EventQuotaWithSignups;
  publicQuestions: EventQuestion[];
  signupsPublic?: boolean;
}) {
  const t = await getScopedI18n("ilmomasiina");

  if (!signupsPublic) {
    return <p>{t("status.Ilmoittautumistiedot eivät ole julkisia")}</p>;
  }

  const signups = quota.signups ?? [];
  if (signups.length === 0) {
    return <p>{t("status.Ei ilmoittautuneita vielä")}</p>;
  }

  const isOpenQuota = quota.id === OPEN_QUOTA_ID;
  const isQueueQuota = quota.id === QUEUE_QUOTA_ID;
  const isGeneratedQuota = isOpenQuota || isQueueQuota;

  return (
    <div className="shadow-solid border-accent-dark block w-full overflow-x-auto border-2">
      <table className="w-full table-auto border-separate border-spacing-0">
        <thead>
          <tr className="bg-row-even">
            <th className="font-pixel rounded-tl-md border-b border-gray-900 p-2 text-lg">
              {t("headers.Sija")}
            </th>
            <th className="font-pixel border-b border-gray-900 p-2 text-lg">
              {t("headers.Nimi")}
            </th>
            {publicQuestions.map((question) => (
              <th
                key={question.id}
                className="font-pixel border-b border-gray-900 p-2 text-lg"
              >
                {question.question}
              </th>
            ))}
            {isGeneratedQuota ? (
              <th className="font-pixel border-b border-gray-900 p-2 text-lg">
                {t("headers.Kiintiö")}
              </th>
            ) : null}
            <th className="font-pixel rounded-tr-md border-b border-gray-900 p-2 text-lg">
              {t("headers.Ilmoittautumisaika")}
            </th>
          </tr>
        </thead>
        <tbody>
          {signups
            .filter(
              (signup) => isGeneratedQuota || signup.status === "in-quota",
            )
            .toSorted((a, b) => a.position - b.position)
            .map((signup) => (
              <SignUpRow
                key={signup.position}
                signup={signup}
                publicQuestions={publicQuestions}
                isGeneratedQuota={isGeneratedQuota}
              />
            ))}
        </tbody>
      </table>
    </div>
  );
}

async function SignUpList({ event }: { event: IlmomasiinaEvent }) {
  if (!event.registrationStartDate || !event.registrationEndDate) {
    return null;
  }

  const quotasWithOpenAndQueue = getQuotasWithOpenAndQueue(
    event.quotas,
    event.openQuotaSize,
  );

  const publicQuestions = event.questions.filter((question) => question.public);

  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {quotasWithOpenAndQueue.map((quota) => (
          <li key={quota.id} className="space-y-2">
            <h4 className="font-pixel text-lg">{quota.title}</h4>
            <SignUpTable
              signupsPublic={event.signupsPublic}
              publicQuestions={publicQuestions}
              quota={quota}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SignUpList;
