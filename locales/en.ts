import fi, { assertType } from "./fi";

const en = {
  "sponsors-title": "Our sponsors",
  "navbar-title": "Tietokilta 40 years",
  "open-button": "Open",
  "read-more": "Read more",
  "loading": "Loading...",
  "ready": "Ready",
  "cancel": "Cancel",
};

type FiKey = keyof typeof fi;
assertType<Record<FiKey, string>>(en);

export default en;
