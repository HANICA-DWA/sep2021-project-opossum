# User Stories & Acceptatie Criteria

Denken en praten over Backlog Items

---

## Voorbeelden

- As a customer, I want to add products to a shopping cart, so that I can collect multiple products in a single purchase.

- As a web-shop owner, I want to send newsletters to customers, so that I can motivate them to buy more products in my shop.

- Als een quizzmaster wil ik antwoorden van teams zelf kunnen goed- en afkeuren, zodat ik flexibel kan omgaan met spelfouten

- Als klant wil ik het huidige gemiddelde van mijn toetsen zien zodat ik kan bepalen of ik hard moet studeren voor de volgende toets.


---

## Voorbeelden

- _As a_ customer, _I want to_ add products to a shopping cart, _so that_ I can collect multiple products in a single purchase.

- _As a_ web-shop owner, _I want to_ send newsletters to customers, _so that_ I can motivate them to buy more products in my shop.

- _Als_ quizzmaster _wil ik_ antwoorden van teams zelf kunnen goed- en afkeuren, _zodat_ ik flexibel kan omgaan met spelfouten

- _Als_ klant _wil ik_ het huidige gemiddelde van mijn toetsen zien _zodat_ ik kan bepalen of ik hard moet studeren voor de volgende toets.

---

## Template

### Engels

- As a \<\<role\>\>
- I want to \<\<do something\>\>
- so that I can \<\<realize a goal\>\>

### Nederlands

- Als \<\<rol\>\>
- Wil ik \<\<iets doen\>\>
- Zodat ik \<\<een doel kan bereiken\>\>

---

## Aandachtspunten

- Denk aan de gebruiker  
  Denk aan een een gebruikers-rollen die herkenbaar zijn voor de gebuikers van de app en de P.O. Let op: developers zijn (meestal) geen gebruikers

- Denk aan de waarde voor de gebruiker  
  Probeer de User Stories die het meest belangrijk voor de gebruiker zijn als eerste te doen. De belangrijkste User Stories staan bovenaan in het Backlog

- Houd ze informeel  
  User Stories zijn bedoeld als format om gesprek aan op te kunnen hangen, niet als specificatie

---

## User Story's maken

1. Bedenkt ene feature, of requirement en schrijf deze op
1. Schrijf de feature om naar een User Story
1. Overleg binnen het team
1. Splits grote user stories (Epics) in kleinere 
1. Voeg Acceptatie Criteria toe
1. Herorden het Product Backlog
1. Bepaal welke User Stories in het Sprint Backlog moeten komen
1. Overleg met de P.O.

---

## Niet OK

- Hele kleine User Stories
- User Stories voor Developers
- Veel ontwerpdetails (zoals use cases)
- User Stories zonder duidelijke meerwaarde voor de gebruiker

## OK

- Grotere User Stories (Epics), maar zorg wel dat je ze splitst
- User Stories die niet alle beslissingen bevatten

---

## Risicoanalyse?

- Probeer voor je te zien hoe de feature eruit komt te zien als je het als User Story opschrijft.
- Probeer je voor te stellen dat je de gebruiker bent die een doel wil bereiken
- Probeer voor jezelf na te gaan welke technische stappen je moet zetten om te User Story gaat implementeren.

Als deze dingen niet lukken, dan kan dit een teken zijn van teveel onzekerheid. Schrijf deze dingen op en overleg met de PO.

---

## GITHUB DEMO

---

## Details van User Story

Welke details maken de User Story zelf duidelijker?

"As a customer, I want to add products to a shopping cart, so that I can collect multiple products in a single purchase."

1. Not add product if not available.
1. Increase number next to cart-icon.
1. When product already in cart, update existing DB-record (do not add new record).
1. Create payments/shipping page for completing the purchase.
1. Remember cart contents if user closes browser.
1. User must have selected product-options (if applicable) before - adding to cart.
1. Write techn. documentation for this feature.

---

## Details van User Story

Welke details maken de User Story zelf duidelijker?

"As a customer, I want to add products to a shopping cart, so that I can collect multiple products in a single purchase."

1. _Not add product if not available._
1. _Increase number next to cart-icon._
1. When product already in cart, update existing DB-record (do not add new record). [tech desig/implementatie]
1. Create payments/shipping page for completing the purchase. [andere US]
1. _Remember cart contents if user closes browser._
1. _User must have selected product-options (if applicable) before - adding to cart._
1. Write techn. documentation for this feature. [DoD]

---

## Acceptatie Criteria

### Engels

- Given \<\<some precondition\>\>
- When \<\<action\>\>
- Then \<\<result\>\>

### Nederlands

- Gegeven \<\<preconditie\>\>
- Als \<\<actie\>\>
- Dan \<\<resultaat\>\>

---

## Voorbeelden

### Not add product if not available

_Given_ that the product is not available, _when_ the user tries to add the product to the cart, _then_ show an error message (do not add to cart)

### Remember cart contents if user closes browser

_Given_ that the user has products in his/her cart and the user has closed the web-page, _when_ the user visits the webshop later, _then_ the cart contains the product form the earlier ‘session’.

---

## Twee soorten Acceptatie Criteria

### Functioneel

- Wat doet het systeem, wat mag er, wat moet er gecontroleerd worden. 
- Kan ook een nieuwe User Storie zijn.

### Niet-functioneel

security, performance, deployment (komt niet zoveel voor in het DWA-project)

---

## Acceptatie Criteri zijn User Story Specifiek

- Zorg ervoor dat ze bij de User Story te vinden zijn.
- Algemen eisen die voor elke User Story gelden moeten in de Definition of Done
- Eisen die toevallig ook relevant zijn voor een andere  User Story mag je kopierene en plakken

---

## Tips

- Het format van de Acceptatie Criteria is niet verplicht (want soms niet zo handig)
- Acceptatie Criteria zijn goed te zien als tests. Probeer je voor te stellen hoe je een bepaalde User Story zou testen.
- Randgevallen zijn vaak onderdeel van goede Acceptatie Criteria

---

## GITHUB DEMO

---

## Definition-of-Done

- Welke regels moeten voor elke User Story gelden om ervoor te zorgen dat we een hoge kwaliteit opleveren?
- Een User Story is pas af als:
  - Hij voldoet aan alle regels uit de DoD
  - Hij voldoet aan alle Acceptatie Criteria voor die User Story 
- Je mag je eigen DoD bepalen
  - Maar voeg deze zaken toe: code reviews, automatische tests, documentatie, integratie
  - Overleg met de PO over de DoD
  - Verander de DoD tijdens het project als dat nodig is

---

## Hoeveel User Stories plan je in?

- Op intuitie
- In overleg met elkaar en met de PO
- Kwaliteit gaat boven kwantiteit
- Wees kritisch tijdens de acceptatie van een User Story 
- Plan eventueel reserve User Stories in

### Niet verplicht/niet verboden

- T-shirt-maten, of tijdseenheden aan User Stories geven
- Planning Poker
