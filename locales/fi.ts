import type en from "./en";

const fi = {
  "sponsors-title": "Mukana Juhlavuodessa",
  "navbar-title": "Tietokilta 40 vuotta",
  "open-button": "Avaa",
  "read-more": "Lue lisää",
  "loading": "Ladataan...",
  "ready": "Valmis",
  "cancel": "Eiku",
  "errors.ilmomasiina-event-not-found":
    "Tapahtumaa ei löytynyt, tarkista osoite.",
  "errors.ilmomasiina-fetch-fail":
    "Ilmomasiinassa tapahtui virhe. Yritä myöhemmin uudelleen.",
  "errors.ilmomasiina-ilmo-missing-quota-id":
    "Virheellinen pyyntö, yritä uudelleen.",
  "errors.ilmomasiina-signup-not-found":
    "Ilmoittautumista ei löytynyt, tarkista osoite.",
  "errors.ilmomasiina-unknown-error":
    "Ilmomasiinassa tapahtui virhe. Yritä myöhemmin uudelleen.",
  "errors.ilmomasiina-validation-failed":
    "Validointi epäonnistui. Tarkista lomake.",
  "errors.ilmo.code.BadSession": "Istunto on vanhentunut. Kirjaudu uudelleen.",
  "errors.ilmo.code.EditConflict": "Muokkausristiriita. Yritä uudelleen.",
  "errors.ilmo.code.WouldMoveSignupsToQueue":
    "Ilmoittautumisia siirrettäisiin jonoon.",
  "errors.ilmo.code.WrongOldPassword": "Väärä vanha salasana.",
  "errors.ilmo.code.SignupsClosed": "Ilmoittautuminen on suljettu.",
  "errors.ilmo.code.NoSuchQuota": "Kiintiötä ei löytynyt.",
  "errors.ilmo.code.NoSuchSignup": "Ilmoittautumista ei löytynyt.",
  "errors.ilmo.code.BadEditToken": "Virheellinen muokkaustunniste.",
  "errors.ilmo.code.CannotDeleteSelf": "Et voi poistaa itseäsi.",
  "errors.ilmo.code.InitialSetupNeeded": "Alustava asetus tarvitaan.",
  "errors.ilmo.code.InitialSetupAlreadyDone": "Alustava asetus on jo tehty.",
  "errors.ilmo.code.SignupValidationError":
    "Ilmoittautumisen validointi epäonnistui.",
  "errors.ilmo.code.EventValidationError": "Tapahtuman validointi epäonnistui.",
  "errors.ilmo.code.FST_ERR_VALIDATION": "Validointi epäonnistui.",
  "errors.ilmo.code.OnlinePaymentsDisabled":
    "Verkkomaksut eivät ole käytössä tässä tapahtumassa.",
  "errors.ilmo.code.SignupAlreadyPaid":
    "Ilmoittautumisesi on jo maksettu. Kokeile päivittää sivu.",
  "errors.ilmo.code.PaymentNotRequired":
    "Ilmoittautumisesi ei vaadi maksua. Kokeile päivittää sivu.",
  "errors.ilmo.code.PaymentInProgress":
    "Maksutapahtuman luonti on jo käynnissä. Kokeile hetken kuluttua uudestaan.",
  "errors.ilmo.code.PaymentNotFound":
    "Maksutapahtumaa ei löytynyt. Kokeile päivittää sivu.",
  "errors.ilmo.code.PaymentNotComplete":
    "Maksutapahtuma ei ole vielä valmis. Kokeile päivittää sivu.",
  "errors.ilmo.code.PaymentRateLimited":
    "Maksupalvelussa on ruuhkaa. Kokeile hetken kuluttua uudestaan.",
  "errors.ilmo.code.DefaultPaymentError":
    "Maksutapahtuma epäonnistui. Kokeile päivittää sivu tai ota yhteyttä ylläpitäjiin.",
  "errors.ilmo.code.SignupNotConfirmed": "Ilmoittautumista ei ole vahvistettu.",
  "errors.ilmo.fieldError.missing": "Tämä kenttä on pakollinen.",
  "errors.ilmo.fieldError.wrongType": "Virheellinen tyyppi.",
  "errors.ilmo.fieldError.tooLong": "Liian pitkä arvo.",
  "errors.ilmo.fieldError.invalidEmail": "Virheellinen sähköpostiosoite.",
  "errors.ilmo.fieldError.notANumber": "Arvon tulee olla numero.",
  "errors.ilmo.fieldError.notAnOption": "Virheellinen valinta.",
  "ilmomasiina.form.You are in queue at position": "Olet jonossa sijalla",
  "ilmomasiina.form.You are in the open quota at position":
    "Olet avoimessa kiintiössä sijalla",
  "ilmomasiina.form.You are in the quota": "Olet kiintiössä",
  "ilmomasiina.form.at position": "sijalla",
  "ilmomasiina.form.fieldError.missing": "Tämä kenttä on pakollinen.",
  "ilmomasiina.form.fieldError.wrongType":
    "Kentän vastaus on väärää tyyppiä. Kokeile päivittää sivu.",
  "ilmomasiina.form.fieldError.tooLong": "Kentän vastaus on liian pitkä.",
  "ilmomasiina.form.fieldError.invalidEmail":
    "sähköpostiosoite on virheellinen. Syötä sallittu sähköpostiosoite.",
  "ilmomasiina.form.fieldError.notANumber":
    "Kentän vastauksen tulee olla numero.",
  "ilmomasiina.form.fieldError.notAnOption":
    "Kentän vastaus ei ole sallituissa vaihtoehdoissa. Kokeile päivittää sivu.",
  "ilmomasiina.form.optional": "valinnainen",
  "ilmomasiina.form.Shown in the public list of sign ups":
    "Näytetään julkisessa osallistujalistassa",
  "ilmomasiina.form.Note: Sign up integration is in beta, if you encounter any issues you can sign up directly on the event page: {eventUrl}":
    "Huomio: Ilmoittautuminen suoraan sivuilla on beta-vaiheessa, jos kohtaat ongelmia voit ilmoittautua tapahtuman sivulla ilmomasiinassa: {eventUrl}",
  "ilmomasiina.form.First name": "Etunimi",
  "ilmomasiina.form.Last name": "Sukunimi",
  "ilmomasiina.form.Email": "Sähköposti",
  "ilmomasiina.form.Show name in the public list of sign ups":
    "Näytä nimi julkisessa osallistujalistassa",
  "ilmomasiina.form.Submit": "Tallenna",
  "ilmomasiina.form.Update": "Päivitä",
  "ilmomasiina.form.Delete": "Poista",
  "ilmomasiina.form.Edit sign up": "Muokkaa ilmoittautumista",
  "ilmomasiina.form.Delete sign up": "Poista ilmoittautuminen",
  "ilmomasiina.form.Sign up saved": "Ilmoittautuminen tallennettu!",
  "ilmomasiina.form.You can edit your sign up or delete it later from this page, which will be sent to your email in the confirmation message":
    "Voit muokata ilmoittautumistasi tai poistaa sen myöhemmin tästä osoitteesta, joka lähetetään sähköpostiisi vahvistusviestissä.",
  "ilmomasiina.form.Your signup cannot be changed anymore as the signup for the event has closed":
    "Ilmoittautumistasi ei voi enää muokata tai perua, koska tapahtuman ilmoittautuminen on sulkeutunut.",
  "ilmomasiina.form.Are you sure you want to delete your sign up to {eventTitle}? If you delete your sign up, you will lose your place in the queue.":
    "Oletka varma, että haluat poistaa ilmoittautumisesi tapahtumaan {eventTitle}? Jos poistat ilmoittautumisesi, menetät paikkasi jonossa.",
  "ilmomasiina.form.This action cannot be undone.":
    "Tätä toimintoa ei voi perua.",
  "ilmomasiina.form.Cancel": "Peruuta",
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
  "ilmomasiina.signup-for": "Ilmoittautuminen tapahtumaan",
  "ilmomasiina.delete-confirm":
    "Oletko varma, että haluat poistaa ilmoittautumisesi?",
  "ilmomasiina.loading-signup": "Ladataan ilmoittautumista",
  "ilmomasiina.delete-fail":
    "Ilmoittautumisen poistaminen epäonnistui. Yritä myöhemmin uudelleen.",
  "ilmomasiina.confirm-time-left": "Ilmoittautumisesi on voimassa vielä",
  "ilmomasiina.confirm-save-or-lose": "Tallenna lomake, jotta se ei vanhene.",
  "ilmo.status.open": "Auki",
  "ilmo.status.closed": "Suljettu",
  "ilmo.status.opens-at": "Aukeaa",
  "ilmo.status.open-until": "Sulkeutuu",
  "ilmo.status.closed-at": "Suljettu",
  "page-not-found": "Sivua ei löytynyt",
  "tried-to-access": "Yritit hakea sivua:",
  "error": "Virhe",
  "jubilee": "Juhlavuosi",
  "jubilee-events-title": "Juhlavuoden tapahtumia",
  "duration.secs": "sekuntia",
  "duration.mins": "minuuttia",
  "duration.hours": "tuntia",
  "duration.days": "päivää",
  "total-price": "Yhteensä",
  "payment-info": "Maksutiedot",
  "product": "Tuote",
  "price": "Hinta",
  "public": "julkinen",
  "pay": "Maksa",
  "payment-info-message": "Maksaminen tapahtuu erillisten ohjeiden mukaisesti.",
  "payment.status.pending":
    "Ilmoittautumisesi odottaa maksua. Kun olet maksanut ilmoittautumisen, sitä ei voi enää muokata tai perua itse.",
  "payment.status.paid":
    "Ilmoittautumisesi on maksettu onnistuneesti. Ota yhteyttä tapahtuman järjestäjiin, jos haluat muokata tai perua ilmoittautumisesi.",
  "payment.status.refunded": "Maksusi on palautettu.",
};

type EnKey = keyof typeof en;

// assert types equal at typescript level
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function assertType<_T>(_val: _T) {}
assertType<Record<EnKey, string>>(fi);

export default fi;
