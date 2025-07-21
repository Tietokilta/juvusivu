import fi, { assertType } from "./fi";

const en = {
  "sponsors-title": "Our sponsors",
  "navbar-title": "Tietokilta 40 years",
  "open-button": "Open",
};

type FiKey = keyof typeof fi;
assertType<Record<FiKey, string>>(en);

export default en;
