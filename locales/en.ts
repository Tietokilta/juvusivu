import fi, { assertType } from "./fi";

const en = {
  "sponsors-title": "Supporting the Jubilee-year",
  "navbar-title": "Tietokilta 40 years",
  "open-button": "Open",
  "read-more": "Read more",
  "loading": "Loading...",
  "ready": "Ready",
  "cancel": "Cancel",
  "errors.ilmomasiina-event-not-found":
    "Event not found. Please check the URL.",
  "errors.ilmomasiina-fetch-fail":
    "Failed to fetch events from Ilmomasiina. Please try again later.",
  "errors.ilmomasiina-ilmo-missing-quota-id":
    "Invalid request. Please try again.",
  "errors.ilmomasiina-signup-not-found":
    "Sign up not found. Please check the URL.",
  "errors.ilmomasiina-unknown-error":
    "An unknown error occurred. Please try again later.",
  "errors.ilmomasiina-validation-failed":
    "Validation failed. Please check the form.",
  "errors.ilmo.code.BadSession": "Session has expired. Please log in again.",
  "errors.ilmo.code.EditConflict": "Edit conflict. Please try again.",
  "errors.ilmo.code.WouldMoveSignupsToQueue":
    "Signups would be moved to the queue.",
  "errors.ilmo.code.WrongOldPassword": "Incorrect old password.",
  "errors.ilmo.code.SignupsClosed": "Signups are closed.",
  "errors.ilmo.code.NoSuchQuota": "Quota not found.",
  "errors.ilmo.code.NoSuchSignup": "Signup not found.",
  "errors.ilmo.code.BadEditToken": "Invalid edit token.",
  "errors.ilmo.code.CannotDeleteSelf": "You cannot delete yourself.",
  "errors.ilmo.code.InitialSetupNeeded": "Initial setup needed.",
  "errors.ilmo.code.InitialSetupAlreadyDone": "Initial setup already done.",
  "errors.ilmo.code.SignupValidationError": "Signup validation failed.",
  "errors.ilmo.code.EventValidationError": "Event validation failed.",
  "errors.ilmo.code.FST_ERR_VALIDATION": "Validation failed.",
  "errors.ilmo.fieldError.missing": "This field is required.",
  "errors.ilmo.fieldError.wrongType": "Invalid type.",
  "errors.ilmo.fieldError.tooLong": "Value is too long.",
  "errors.ilmo.fieldError.invalidEmail": "Invalid email address.",
  "errors.ilmo.fieldError.notANumber": "Value must be a number.",
  "errors.ilmo.fieldError.notAnOption": "Invalid option.",
  "ilmomasiina.form.You are in queue at position":
    "You are in queue at position",
  "ilmomasiina.form.You are in the open quota at position":
    "You are in the open quota at position",
  "ilmomasiina.form.You are in the quota": "You are in the quota",
  "ilmomasiina.form.at position": "at position",
  "ilmomasiina.form.fieldError.missing": "This field is required.",
  "ilmomasiina.form.fieldError.wrongType":
    "The answer to this field is of the wrong type. Try refreshing the page.",
  "ilmomasiina.form.fieldError.tooLong":
    "Please enter a shorter value for this field.",
  "ilmomasiina.form.fieldError.invalidEmail":
    "Please enter a valid email address.",
  "ilmomasiina.form.fieldError.notANumber": "Please enter a valid number.",
  "ilmomasiina.form.fieldError.notAnOption":
    "The answer to this question isn't in the allowed options. Try refreshing the page.",
  "ilmomasiina.form.optional": "optional",
  "ilmomasiina.form.Shown in the public list of sign ups":
    "Shown in the public list of sign ups",
  "ilmomasiina.form.Note: Sign up integration is in beta, if you encounter any issues you can sign up directly on the event page: {eventUrl}":
    "Note: Sign up integration is in beta, if you encounter any issues you can sign up directly on the event page: {eventUrl}",
  "ilmomasiina.form.First name": "First name",
  "ilmomasiina.form.Last name": "Last name",
  "ilmomasiina.form.Email": "Email",
  "ilmomasiina.form.Show name in the public list of sign ups":
    "Show name in the public list of sign ups",
  "ilmomasiina.form.Submit": "Submit",
  "ilmomasiina.form.Update": "Update",
  "ilmomasiina.form.Delete": "Delete",
  "ilmomasiina.form.Edit sign up": "Edit sign up",
  "ilmomasiina.form.Delete sign up": "Delete sign up",
  "ilmomasiina.form.Sign up saved": "Sign up saved!",
  "ilmomasiina.form.You can edit your sign up or delete it later from this page, which will be sent to your email in the confirmation message":
    "You can edit your sign up or delete it later from this page, which will be sent to your email in the confirmation message.",
  "ilmomasiina.form.Are you sure you want to delete your sign up to {eventTitle}? If you delete your sign up, you will lose your place in the queue.":
    "Are you sure you want to delete your sign up to {eventTitle}? If you delete your sign up, you will lose your place in the queue.",
  "ilmomasiina.form.This action cannot be undone.":
    "This action cannot be undone.",
  "ilmomasiina.form.Your signup cannot be changed anymore as the signup for the event has closed":
    "Your signup cannot be changed anymore as the signup for the event has closed.",
  "ilmomasiina.form.Cancel": "Cancel",
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
  "ilmomasiina.signup-for": "Sign up for",
  "ilmomasiina.delete-confirm": "Are you sure you want to delete your signup?",
  "ilmomasiina.loading-signup": "Loading signup",
  "ilmomasiina.delete-fail": "Failed to delete signup. Please try again later.",
  "ilmo.status.open": "Open",
  "ilmo.status.closed": "Closed",
  "ilmo.status.opens-at": "Opens at",
  "ilmo.status.open-until": "Open until",
  "ilmo.status.closed-at": "Closed at",
  "page-not-found": "Page not found",
  "tried-to-access": "You tried to access:",
  "error": "Error",
  "jubilee": "Jubilee",
};

type FiKey = keyof typeof fi;
assertType<Record<FiKey, string>>(en);

export default en;
