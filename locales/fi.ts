import type en from "./en";

const fi = {
  "sponsors-title": "Mukana sponsoroimassa",
  "navbar-title": "Tietokilta 40 vuotta",
  "open-button": "Avaa",
  "read-more": "Lue lisää",
};

type EnKey = keyof typeof en;

// assert types equal at typescript level
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertType<_T>(_val: _T) {}
assertType<Record<EnKey, string>>(fi);

export default fi;
