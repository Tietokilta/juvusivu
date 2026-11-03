export type EventCategory = "juhlavuosi" | "vujuviikko" | "muu";

export const EVENT_CATEGORY_OPTIONS: Array<{
  label: string;
  value: EventCategory;
}> = [
  {
    label: "Juhlavuosi",
    value: "juhlavuosi",
  },
  {
    label: "Vujuviikko",
    value: "vujuviikko",
  },
  {
    label: "Muu",
    value: "muu",
  },
];

export const ILMOMASIINA_API_BASE_URL =
  process.env.NEXT_PUBLIC_ILMO_URL ?? "https://ilmo.tietokilta.fi/api";

export const MAIN_EVENT_DATE = "2027-03-05T00:00:00+02:00";
