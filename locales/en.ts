import fi, { assertType } from "./fi";

const en = {
  "sponsors-title": "Supporting the Jubilee-year",
  "navbar-title": "Tietokilta 40 years",
  "open-button": "Open",
  "read-more": "Read more",
  "loading": "Loading...",
  "ready": "Ready",
  "cancel": "Cancel",
  "ilmomasiina.headers.Alkaa": "Starts",
  "ilmomasiina.headers.Ilmoittautumisaika": "Sign up time",
  "ilmomasiina.headers.Kategoria": "Category",
  "ilmomasiina.headers.Kiintiö": "Quota",
  "ilmomasiina.headers.Loppuu": "Ends",
  "ilmomasiina.headers.Nimi": "Name",
  "ilmomasiina.headers.Paikka": "Location",
  "ilmomasiina.headers.Hinta": "Price",
  "ilmomasiina.headers.Sija": "Place",
  "ilmomasiina.Ilmoittautuminen": "Sign up",
  "ilmomasiina.Ilmoittautuneet": "Signed up",
  "ilmomasiina.Ilmoittautuneita": "Signed up",
  "ilmomasiina.Ei ilmoittautumista": "No Signup",
  "ilmomasiina.Piilotettu": "Hidden",
  "ilmomasiina.Vahvistamaton": "Unconfirmed",
  "ilmomasiina.Avoin kiintiö": "Open quota",
  "ilmomasiina.Jonossa": "In queue",
  "ilmomasiina.path.events": "events",
  "ilmomasiina.path.all-events": "all-events",
  "ilmomasiina.all-events.Kaikki tapahtumat": "All events",
  "ilmomasiina.status.Ei ilmoittautuneita vielä": "No sign ups yet.",
  "ilmomasiina.status.Ilmoittautuminen alkaa": "Sign up starts on {startDate}",
  "ilmomasiina.status.Ilmo alkaa": "Sign up starts {startDate}",
  "ilmomasiina.status.Ilmoittautuminen auki":
    "Open for sign ups until {endDate}",
  "ilmomasiina.status.Ilmo auki": "Sign up until {endDate}",
  "ilmomasiina.status.Ilmoittautuminen on päättynyt": "Sign up has ended",
  "ilmomasiina.status.Ilmoittautumistiedot eivät ole julkisia":
    "Sign ups are not public",
  "ilmomasiina.status.Jonossa": "{queueCount} in the queue",
  "ilmomasiina.quotas": "Quotas",
  "ilmomasiina.description": "Event description",
  "ilmomasiina.signup": "Sign up",
  "page-not-found": "Page not found",
  "tried-to-access": "You tried to access:",
};

type FiKey = keyof typeof fi;
assertType<Record<FiKey, string>>(en);

export default en;
