import { Block } from "payload";
import { EVENT_CATEGORY_OPTIONS, EventCategory } from "@util/constants";

export interface EventGridBlockType {
  category?: EventCategory;
  blockType: "eventGrid";
}

export const EventGridBlock: Block = {
  slug: "eventGrid",
  fields: [
    {
      name: "category",
      type: "select",
      localized: false,
      options: EVENT_CATEGORY_OPTIONS,
    },
  ],
};

export const CommitteeGridBlock: Block = {
  slug: "committeeGrid",
  fields: [
    {
      name: "description",
      type: "text",
      localized: true,
      required: false,
    },
  ],
};
