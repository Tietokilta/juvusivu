import type en from "./en";

const fi = {
  "sponsors-title": "Mukana Juhlavuodessa",
  "navbar-title": "Tietokilta 40 vuotta",
  "open-button": "Avaa",
  "read-more": "Lue lisää",
  "loading": "Ladataan...",
  "ready": "Valmis",
  "cancel": "Eiku",
  "ilmomasiina.headers.Alkaa": "Alkaa",
  "ilmomasiina.headers.Ilmoittautumisaika": "Ilmoittautumisaika",
  "ilmomasiina.headers.Kategoria": "Kategoria",
  "ilmomasiina.headers.Kiintiö": "Kiintiö",
  "ilmomasiina.headers.Loppuu": "Loppuu",
  "ilmomasiina.headers.Nimi": "Nimi",
  "ilmomasiina.headers.Paikka": "Paikka",
  "ilmomasiina.headers.Hinta": "Hinta",
  "ilmomasiina.headers.Sija": "Sija",
  "ilmomasiina.Ilmoittautuminen": "Ilmoittautuminen",
  "ilmomasiina.Ilmoittautuneet": "Ilmoittautuneet",
  "ilmomasiina.Ilmoittautuneita": "Ilmoittautuneita",
  "ilmomasiina.Ei ilmoittautumista": "Ei ilmoittautumista",
  "ilmomasiina.Piilotettu": "Piilotettu",
  "ilmomasiina.Vahvistamaton": "Vahvistamaton",
  "ilmomasiina.Avoin kiintiö": "Avoin kiintiö",
  "ilmomasiina.Jonossa": "Jonossa",
  "ilmomasiina.path.events": "tapahtumat",
  "ilmomasiina.path.all-events": "kaikki-tapahtumat",
  "ilmomasiina.all-events.Kaikki tapahtumat": "Kaikki tapahtumat",
  "ilmomasiina.status.Ei ilmoittautuneita vielä": "Ei ilmoittautuneita vielä.",
  "ilmomasiina.status.Ilmoittautuminen alkaa":
    "Ilmoittautuminen alkaa {startDate}",
  "ilmomasiina.status.Ilmo alkaa": "Ilmo alkaa {startDate}",
  "ilmomasiina.status.Ilmoittautuminen auki":
    "Ilmoittautuminen auki {endDate} asti",
  "ilmomasiina.status.Ilmo auki": "Ilmo auki {endDate} asti",
  "ilmomasiina.status.Ilmoittautuminen on päättynyt":
    "Ilmoittautuminen on päättynyt",
  "ilmomasiina.status.Ilmoittautumistiedot eivät ole julkisia":
    "Ilmoittautumistiedot eivät ole julkisia.",
  "ilmomasiina.status.Jonossa": "Jonossa {queueCount}",
  "ilmomasiina.quotas": "Kiintiöt",
  "ilmomasiina.description": "Tapahtuman kuvaus",
  "ilmomasiina.signup": "Ilmoittaudu",
  "page-not-found": "Sivua ei löytynyt",
  "tried-to-access": "Yritit hakea sivua:",
};

type EnKey = keyof typeof en;

// assert types equal at typescript level
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertType<_T>(_val: _T) {}
assertType<Record<EnKey, string>>(fi);

export default fi;
