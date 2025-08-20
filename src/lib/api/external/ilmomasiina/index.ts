export interface IlmomasiinaEvent {
  id: string;
  questions: EventQuestion[];
  title: string;
  slug: string;
  date?: string | null;
  endDate?: string | null;
  registrationStartDate?: string | null;
  registrationEndDate?: string | null;
  openQuotaSize: number;
  category: string;
  description: string;
  /**
   * Can be empty string
   */
  price: string;
  location: string;
  /**
   * Can be empty string
   */
  webpageUrl: string;
  /**
   * Can be empty string
   */
  facebookUrl: string;
  signupsPublic: boolean;
  quotas: EventQuota[];
  millisTillOpening?: number | null;
  registrationClosed?: boolean | null;
  nameQuestion?: boolean;
  emailQuestion?: boolean;
}

export interface EventQuestion {
  id: string;
  question: string;
  public: boolean;
  type?: "text" | "textarea" | "number" | "select" | "checkbox";
  options?: string[] | null;
  required?: boolean | null;
}

export interface EventQuota {
  id: string;
  title: string;
  size?: number | null;
  signupCount?: number;
  signups?: QuotaSignup[] | null;
}

export interface EventQuotaWithSignups extends EventQuota {
  signups: QuotaSignupWithQuotaTitle[];
}

export interface QuotaSignup {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  namePublic: boolean;
  answers: QuestionAnswer[];
  status: "in-quota" | "in-open" | "in-queue";
  position: number;
  createdAt: string;
  confirmed: boolean;
}

export interface QuestionAnswer {
  questionId: string;
  answer: string | string[];
}

export interface QuotaSignupWithQuotaTitle extends QuotaSignup {
  quotaTitle: string;
}

export interface IlmomasiinaSignupSuccessResponse {
  id: string;
  editToken: string;
}

export const OPEN_QUOTA_ID = "open";
export const QUEUE_QUOTA_ID = "queue";

export const fetchEvent = async (slug: string): Promise<IlmomasiinaEvent> => {
  try {
    const response = await fetch(
      `https://ilmo.tietokilta.fi/api/events/${slug}`,
      {
        next: {
          tags: ["ilmomasiina-events"],
          revalidate: 30, // 30 seconds
        },
      },
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error("ilmomasiina-event-not-found");
      }

      throw new Error("ilmomasiina-fetch-fail");
    }
    const data = (await response.json()) as IlmomasiinaEvent;

    return data;
  } catch (_) {
    throw new Error("ilmomasiina-fetch-fail");
  }
};

export const getQuotasWithOpenAndQueue = (
  quotas: EventQuota[],
  openQuotaSize: number,
  options: {
    includeOpen?: boolean;
    includeQueue?: boolean;
    openQuotaName?: string;
    queueQuotaName?: string;
  } = {},
) => {
  const {
    includeOpen = true,
    includeQueue = true,
    openQuotaName = "Avoin kiintiö",
    queueQuotaName = "Jonossa",
  } = options;
  const openQuota = quotas.reduce<EventQuotaWithSignups>(
    (openQ, quota) => {
      const quotaSignups = quota.signups ?? [];
      const openSignups = quotaSignups
        .filter((signup) => signup.status === "in-open")
        .map((signup) => ({
          ...signup,
          quotaTitle: quota.title,
        }));
      return {
        ...openQ,
        signupCount: (openQ.signupCount ?? 0) + openSignups.length,
        signups: [...openQ.signups, ...openSignups],
      };
    },
    {
      id: OPEN_QUOTA_ID,
      title: openQuotaName,
      size: openQuotaSize,
      signupCount: 0,
      signups: [],
    },
  );

  const queuedQuota = quotas.reduce<EventQuotaWithSignups>(
    (queuedQ, quota) => {
      const quotaSignups = quota.signups ?? [];
      const queuedSignups = quotaSignups
        .filter((signup) => signup.status === "in-queue")
        .map((signup) => ({
          ...signup,
          quotaTitle: quota.title,
        }));
      return {
        ...queuedQ,
        signupCount: (queuedQ.signupCount ?? 0) + queuedSignups.length,
        signups: [...queuedQ.signups, ...queuedSignups],
      };
    },
    {
      id: QUEUE_QUOTA_ID,
      title: queueQuotaName,
      size: 0,
      signupCount: 0,
      signups: [],
    },
  );

  const quotasWithOpenAndQueue = [
    ...quotas,
    ...(includeOpen && openQuotaSize > 0 ? [openQuota] : []),
    ...(includeQueue && (queuedQuota.signupCount ?? 0) > 0
      ? [queuedQuota]
      : []),
  ];

  return quotasWithOpenAndQueue;
};
