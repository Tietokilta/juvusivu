import { getScopedI18n } from "@locales/server";
import {
  UserEventResponse,
  SignupStatus,
  Question,
  PublicSignupSchema,
} from "@tietokilta/ilmomasiina-models";
import {
  getSignupsByQuota,
  QuotaSignups,
  SignupWithQuota,
} from "@tietokilta/ilmomasiina-client/dist/utils/signupUtils";

function getFormattedAnswer(
  question: Question,
  answers: PublicSignupSchema["answers"],
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
  signup: SignupWithQuota;
  publicQuestions: Question[];
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
          {signup.quota.title}
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
  quota: QuotaSignups;
  publicQuestions: Question[];
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

  const isOpenQuota = quota.type === SignupStatus.IN_OPEN_QUOTA;
  const isQueueQuota = quota.type === SignupStatus.IN_QUEUE;
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
              (signup) =>
                isGeneratedQuota || signup.status === SignupStatus.IN_QUOTA,
            )
            .toSorted(
              (a, b) => (a.position ?? Infinity) - (b.position ?? Infinity),
            )
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

async function SignUpList({ event }: { event: UserEventResponse }) {
  if (!event.registrationStartDate || !event.registrationEndDate) {
    return null;
  }
  const t = await getScopedI18n("ilmomasiina");

  const signupsByQuota = getSignupsByQuota(event);

  const publicQuestions = event.questions.filter((question) => question.public);

  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {signupsByQuota.map((quota) => (
          <li key={quota.id ?? quota.type} className="space-y-2">
            <h4 className="font-pixel text-lg">
              {quota.type === SignupStatus.IN_OPEN_QUOTA
                ? t("Avoin kiintiö")
                : quota.type === SignupStatus.IN_QUEUE
                  ? t("Jonossa")
                  : quota.title}
            </h4>
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
