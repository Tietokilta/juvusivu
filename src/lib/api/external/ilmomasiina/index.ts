import { UserEventResponse } from "@tietokilta/ilmomasiina-models";
import { getLocalizedEvent } from "@tietokilta/ilmomasiina-client/dist/utils/localizedEvent";
import { ApiResponse, err, ok } from "../helpers";
import { ILMOMASIINA_API_BASE_URL } from "@util/constants";

export const OPEN_QUOTA_ID = "open";
export const QUEUE_QUOTA_ID = "queue";

export const fetchEvent = async (
  slug: string,
  locale: string,
): Promise<ApiResponse<UserEventResponse>> => {
  try {
    const response = await fetch(`${ILMOMASIINA_API_BASE_URL}/events/${slug}`, {
      next: {
        tags: ["ilmomasiina-events"],
        revalidate: 30, // 30 seconds
      },
    });
    if (!response.ok) {
      if (response.status === 404) {
        return err("ilmomasiina-event-not-found");
      }

      return err("ilmomasiina-fetch-fail");
    }

    const data = (await response.json()) as UserEventResponse;
    const localized = getLocalizedEvent(data, locale);
    return ok(localized);
  } catch {
    return err("ilmomasiina-fetch-fail");
  }
};
