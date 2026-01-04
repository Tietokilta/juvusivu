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
