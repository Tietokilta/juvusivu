import { i18nResources } from "@tietokilta/ilmomasiina-client/dist/locales/index";

const ilmo = i18nResources.fi.public;

export const fi = {
  "sponsors-title": "Mukana Juhlavuodessa",
  "navbar-title": "Tietokilta 40 vuotta",
  "open-button": "Avaa",
  "read-more": "Lue lisää",
  "loading": "Ladataan...",
  "ready": "Valmis",
  "cancel": "Eiku",
  "page-not-found": "Sivua ei löytynyt",
  "tried-to-access": "Yritit hakea sivua:",
  "error": "Virhe",
  "jubilee": "Juhlavuosi",
  "jubilee-events-title": "Juhlavuoden tapahtumia",
  "total-price": "Yhteensä",
  "payment-info": "Maksutiedot",
  "product": "Tuote",
  "price": "Hinta",
  "public": "julkinen",
  "pay": "Maksa",
  "m0-tmk": "Muistinnollaustoimikunta 101000",
  "payment-info-message": "Maksaminen tapahtuu erillisten ohjeiden mukaisesti.",
  "errors": {
    "ilmomasiina-event-not-found": "Tapahtumaa ei löytynyt, tarkista osoite.",
    "ilmomasiina-fetch-fail":
      "Ilmomasiinassa tapahtui virhe. Yritä myöhemmin uudelleen.",
    "ilmomasiina-ilmo-missing-quota-id":
      "Virheellinen pyyntö, yritä uudelleen.",
    "ilmomasiina-signup-not-found":
      "Ilmoittautumista ei löytynyt, tarkista osoite.",
    "ilmomasiina-unknown-error":
      "Ilmomasiinassa tapahtui virhe. Yritä myöhemmin uudelleen.",
    "ilmomasiina-validation-failed": "Validointi epäonnistui. Tarkista lomake.",
    "ilmo": {
      code: {
        BadSession: "Istunto on vanhentunut. Kirjaudu uudelleen.",
        EditConflict: "Muokkausristiriita. Yritä uudelleen.",
        WouldMoveSignupsToQueue: "Ilmoittautumisia siirrettäisiin jonoon.",
        WrongOldPassword: "Väärä vanha salasana.",
        SignupsClosed: "Ilmoittautuminen on suljettu.",
        NoSuchQuota: "Kiintiötä ei löytynyt.",
        NoSuchSignup: "Ilmoittautumista ei löytynyt.",
        BadEditToken: "Virheellinen muokkaustunniste.",
        CannotDeleteSelf: "Et voi poistaa itseäsi.",
        InitialSetupNeeded: "Alustava asetus tarvitaan.",
        InitialSetupAlreadyDone: "Alustava asetus on jo tehty.",
        SignupValidationError: "Ilmoittautumisen validointi epäonnistui.",
        EventValidationError: "Tapahtuman validointi epäonnistui.",
        FST_ERR_VALIDATION: "Validointi epäonnistui.",
        SignupNotConfirmed: "Ilmoittautumista ei ole vahvistettu.",
        OnlinePaymentsDisabled:
          ilmo["editSignup.paymentError.OnlinePaymentsDisabled.description"],
        SignupAlreadyPaid:
          ilmo["editSignup.paymentError.SignupAlreadyPaid.description"],
        PaymentNotRequired:
          ilmo["editSignup.paymentError.PaymentNotRequired.description"],
        PaymentInProgress:
          ilmo["editSignup.paymentError.PaymentInProgress.description"],
        PaymentNotFound:
          ilmo["editSignup.paymentError.PaymentNotFound.description"],
        PaymentNotComplete:
          ilmo["editSignup.paymentError.PaymentNotComplete.description"],
        PaymentRateLimited:
          ilmo["editSignup.paymentError.PaymentRateLimited.description"],
        DefaultPaymentError:
          ilmo["editSignup.paymentError.default.description"],
      },
      fieldError: {
        missing: ilmo["editSignup.fieldError.missing"],
        wrongType: ilmo["editSignup.fieldError.wrongType"],
        tooLong: ilmo["editSignup.fieldError.tooLong"],
        invalidEmail: ilmo["editSignup.fieldError.invalidEmail"],
        notANumber: ilmo["editSignup.fieldError.notANumber"],
        notAnOption: ilmo["editSignup.fieldError.notAnOption"],
        duplicateOption: ilmo["editSignup.fieldError.duplicateOption"],
      },
    },
  },
  "ilmomasiina": {
    "Ilmoittautuminen": "Ilmoittautuminen",
    "Ilmoittautuneet": "Ilmoittautuneet",
    "Ilmoittautuneita": "Ilmoittautuneita",
    "Ei ilmoittautumista": "Ei ilmoittautumista",
    "Piilotettu": "Piilotettu",
    "Vahvistamaton": "Vahvistamaton",
    "Avoin kiintiö": "Avoin kiintiö",
    "Jonossa": "Jonossa",
    "quotas": "Kiintiöt",
    "description": "Tapahtuman kuvaus",
    "signup": "Ilmoittaudu",
    "signup-for": "Ilmoittautuminen tapahtumaan",
    "delete-confirm": "Oletko varma, että haluat poistaa ilmoittautumisesi?",
    "loading-signup": "Ladataan ilmoittautumista",
    "delete-fail":
      "Ilmoittautumisen poistaminen epäonnistui. Yritä myöhemmin uudelleen.",
    "confirm-time-left": "Ilmoittautumisesi on voimassa vielä",
    "confirm-save-or-lose": "Tallenna lomake, jotta se ei vanhene.",
    "form": {
      "optional": "valinnainen",
      "Shown in the public list of sign ups":
        "Näytetään julkisessa osallistujalistassa",
      "First name": ilmo["editSignup.fields.firstName"],
      "Last name": ilmo["editSignup.fields.lastName"],
      "Email": ilmo["editSignup.fields.email"],
      "namePublic": ilmo["editSignup.namePublic"],
      "Submit": "Tallenna",
      "Update": "Päivitä",
      "Delete": "Poista",
      "Edit sign up": "Muokkaa ilmoittautumista",
      "Delete sign up": "Poista ilmoittautuminen",
      "Sign up saved": "Ilmoittautuminen tallennettu!",
      "editInstructions": `${ilmo["editSignup.editInstructions"]} ${ilmo["editSignup.editInstructions.email"]}`,
      "Cancel": "Peruuta",
      "uneditablePaidQuestion": ilmo["editSignup.uneditablePaidQuestion"],
    },
    "headers": {
      Alkaa: ilmo["singleEvent.info.startDate"],
      Kategoria: ilmo["singleEvent.info.category"],
      Loppuu: ilmo["singleEvent.info.endDate"],
      Paikka: ilmo["singleEvent.info.location"],
      Hinta: ilmo["singleEvent.info.price"],
      Sija: ilmo["singleEvent.signups.position"],
      Nimi: ilmo["singleEvent.signups.name"],
      Kiintiö: ilmo["singleEvent.signups.quota"],
      Ilmoittautumisaika: ilmo["singleEvent.signups.signupTime"],
    },
    "path": {
      "events": "tapahtumat",
      "all-events": "kaikki-tapahtumat",
    },
    "all-events": {
      "Kaikki tapahtumat": "Kaikki tapahtumat",
    },
    "status": {
      "Ei ilmoittautuneita vielä": "Ei ilmoittautuneita vielä.",
      "Ilmoittautumistiedot eivät ole julkisia":
        "Ilmoittautumistiedot eivät ole julkisia.",
      "Jonossa": "Jonossa {queueCount}",
    },
    "position": {
      quota: "Olet kiintiössä {quota} sijalla {position}.",
      queue: "Olet jonossa sijalla {position}.",
      openQuota: "Olet avoimessa kiintiössä sijalla {position}.",
    },
  },
  "ilmo": {
    status: {
      "open": "Auki",
      "closed": "Suljettu",
      "opens-at": "Aukeaa",
      "open-until": "Sulkeutuu",
      "closed-at": "Suljettu",
    },
  },
  "duration": {
    secs: "sekuntia",
    mins: "minuuttia",
    hours: "tuntia",
    days: "päivää",
  },
  "payment": {
    status: {
      pending: ilmo["editSignup.payment.status.pending"],
      paid: ilmo["editSignup.payment.status.paid"],
      refunded: ilmo["editSignup.payment.status.refunded"],
    },
  },
};

export default fi;
