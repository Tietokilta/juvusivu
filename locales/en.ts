import { i18nResources } from "@tietokilta/ilmomasiina-client/dist/locales/index";

const ilmo = i18nResources.en.public;

export const en = {
  "sponsors-title": "Supporting the Jubilee-year",
  "navbar-title": "Tietokilta 40 years",
  "open-button": "Open",
  "read-more": "Read more",
  "loading": "Loading...",
  "ready": "Ready",
  "cancel": "Cancel",
  "page-not-found": "Page not found",
  "tried-to-access": "You tried to access:",
  "error": "Error",
  "jubilee": "Jubilee",
  "jubilee-events-title": "Jubilee events",
  "total-price": "Total",
  "payment-info": "Payment information",
  "product": "Product",
  "price": "Price",
  "public": "public",
  "pay": "Pay",
  "payment-info-message": "Payment is done according to separate instructions.",
  "errors": {
    "ilmomasiina-event-not-found": "Event not found. Please check the URL.",
    "ilmomasiina-fetch-fail":
      "Failed to fetch events from Ilmomasiina. Please try again later.",
    "ilmomasiina-ilmo-missing-quota-id": "Invalid request. Please try again.",
    "ilmomasiina-signup-not-found": "Sign up not found. Please check the URL.",
    "ilmomasiina-unknown-error":
      "An unknown error occurred. Please try again later.",
    "ilmomasiina-validation-failed":
      "Validation failed. Please check the form.",
    "ilmo": {
      code: {
        BadSession: "Session has expired. Please log in again.",
        EditConflict: "Edit conflict. Please try again.",
        WouldMoveSignupsToQueue: "Signups would be moved to the queue.",
        WrongOldPassword: "Incorrect old password.",
        SignupsClosed: "Signups are closed.",
        NoSuchQuota: "Quota not found.",
        NoSuchSignup: "Signup not found.",
        BadEditToken: "Invalid edit token.",
        CannotDeleteSelf: "You cannot delete yourself.",
        InitialSetupNeeded: "Initial setup needed.",
        InitialSetupAlreadyDone: "Initial setup already done.",
        SignupValidationError: "Signup validation failed.",
        EventValidationError: "Event validation failed.",
        FST_ERR_VALIDATION: "Validation failed.",
        SignupNotConfirmed: "Signup not confirmed.",
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
    "Ilmoittautuminen": "Sign up",
    "Ilmoittautuneet": "Signed up",
    "Ilmoittautuneita": "Signed up",
    "Ei ilmoittautumista": "No Signup",
    "Piilotettu": "Hidden",
    "Vahvistamaton": "Unconfirmed",
    "Avoin kiintiö": "Open quota",
    "Jonossa": "In queue",
    "quotas": "Quotas",
    "description": "Event description",
    "signup": "Sign up",
    "signup-for": "Sign up for",
    "delete-confirm": "Are you sure you want to delete your signup?",
    "loading-signup": "Loading signup",
    "delete-fail": "Failed to delete signup. Please try again later.",
    "confirm-time-left": "Your signup is still valid for",
    "confirm-save-or-lose": "Save the form to make sure it doesn't expire.",
    "form": {
      "optional": "optional",
      "Shown in the public list of sign ups":
        "Shown in the public list of sign ups",
      "First name": ilmo["editSignup.fields.firstName"],
      "Last name": ilmo["editSignup.fields.lastName"],
      "Email": ilmo["editSignup.fields.email"],
      "namePublic": ilmo["editSignup.namePublic"],
      "Submit": "Submit",
      "Update": "Update",
      "Delete": "Delete",
      "Edit sign up": "Edit sign up",
      "Delete sign up": "Delete sign up",
      "Sign up saved": "Sign up saved!",
      "editInstructions": `${ilmo["editSignup.editInstructions"]} ${ilmo["editSignup.editInstructions.email"]}`,
      "Cancel": "Cancel",
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
      "events": "events",
      "all-events": "all-events",
    },
    "all-events": {
      "Kaikki tapahtumat": "All events",
    },
    "status": {
      "Ei ilmoittautuneita vielä": "No sign ups yet.",
      "Ilmoittautumistiedot eivät ole julkisia": "Sign ups are not public",
      "Jonossa": "{queueCount} in the queue",
    },
    "position": {
      quota: "You are in the quota {quota} in position {position}.",
      queue: "You are in the queue in position {position}.",
      openQuota: "You are in the open quota in position {position}.",
    },
  },
  "ilmo": {
    status: {
      "open": "Open",
      "closed": "Closed",
      "opens-at": "Opens at",
      "open-until": "Open until",
      "closed-at": "Closed at",
    },
  },
  "duration": {
    secs: "seconds",
    mins: "minutes",
    hours: "hours",
    days: "days",
  },
  "payment": {
    status: {
      pending: ilmo["editSignup.payment.status.pending"],
      paid: ilmo["editSignup.payment.status.paid"],
      refunded: ilmo["editSignup.payment.status.refunded"],
    },
  },
};

export default en;
