# BenTech — formulier met bevestigingsmail

## Afgebakende uitbreiding

De gebruiker vraagt een gratis formulier met echte verzending en een bevestiging aan de afzender, met weinig beheerwerk. De bestaande navy/blue/Manrope-vormgeving blijft. De nieuwe /bedankt/-pagina hergebruikt de bestaande informatieve pagina-opbouw; geen visuele systeemwijziging.

## Gekozen transport

FormSubmit, native HTTPS POST naar de bestaande BenTech-mailbox. Geen eigen SMTP, serverdatabase, DNS-wijziging, betaalabonnement of nieuwe SDK. Instellingen: dienst/contactgegevens/omschrijving, onderwerp, tabelmail, autoresponse met kopie, honeypot en provider-reCAPTCHA. Geen AJAX en geen uitgeschakelde CAPTCHA: volgens de provider werkt autoresponse in die modi niet.

## Toestanden

Leeg/ongeldig: native validatie blokkeert verzending. Geldig: knop Naar spamcontrole, status nog niet bevestigd. Native navigatie naar provider; de provider beheert CAPTCHA en verwerking. Terugkeer met geschiedenis herstelt de knop. /bedankt/ is noindex en verwijst naar de mailkopie; de URL zelf bewijst geen inboxontvangst. WhatsApp blijft expliciete conceptoverdracht.

## Activatie- en publicatiepoort

Alleen concept. Nog geen echte activatiemail, notificatie of autoresponse verstuurd/gecontroleerd. De eerste echte POST laat FormSubmit een activatiemail naar info@bentechsolutions.be sturen; de mailboxhouder moet die zelf bevestigen. Na expliciete toestemming voor die mail en één proefaanvraag: echte eigenaar-notificatie én afzenderbevestiging controleren, dan pas merge/publicatie. Die toestemming vraagt de agent pas met het voorbereide concept en testresultaten beschikbaar. Geen archive-APIkey aangemaakt; een later archiefcredential alleen via de reguliere Vault/BWS-route opslaan.

## Bewijs en beperkingen

Officieel gecontroleerd 23 oktober 2026: https://formsubmit.co/ en https://formsubmit.co/documentation . Gratis, onbeperkte inzendingen, autoresponse bij native/CAPTCHA en archief30dagen (API-uitlezen5keer/dag). Dit zijn providerfuncties, geen reeds bewezen klantontvangst of gegarandeerde inboxaflevering. Archief staat bij provider; niet als eigen database of actief ingericht herstelproces presenteren. Geen SLA/100%-aflevergarantie beweren.

Lokale QA onderschept alle providerverzoeken en bewijst native POST, encoding, mailinstellingen, validatie, no-JS en terugkeer. Browsermatrix1440/1024/390/320, consent, oude routes en content blijven groen. Echte mailaflevering blijft open tot de liveproef. Bestaande Vikunja#496 blijft de opvolgtaak; het afzonderlijke offerteplatform wordt niet gebouwd.
