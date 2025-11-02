import { UserEventResponse } from "@tietokilta/ilmomasiina-models";
import { getLocalizedEvent } from "@tietokilta/ilmomasiina-client/dist/utils/localizedEvent";

export const OPEN_QUOTA_ID = "open";
export const QUEUE_QUOTA_ID = "queue";

export const fetchEvent = async (
  slug: string,
  locale: string,
): Promise<UserEventResponse> => {
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

    const data = (await response.json()) as UserEventResponse;
    const localized = getLocalizedEvent(data, locale);
    return localized;
  } catch {
    throw new Error("ilmomasiina-fetch-fail");
  }
};
