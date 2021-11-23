# XPath vs CSS selector

Het probleem: Het programmatisch aanwijzen van specifieke elementen op een pagina (in het val van een 'snapshot' is de content statisch).

de mogelijke oplossing die we gaan bekijken:

- xpath
- css selector

## CSS selector

### Voordelen:

- CSS selector is leesbaarder 
- CSS selector is sneller 

### Nadelen

- Iets minder select opties dan XPath

## XPath

### Voordelen:

- Je kan vanuit een node zowel naar een parent als child node wijzen. CSS selectors kunnen alleen naar een child wijzen.
- Je kan conditionals toevoegen: `//button[starts-with(@id, 'save') and contains(@class,'publish')]`

### Nadelen

- XPath engines zijn verschillend per browser, waardoor ze inconsistent zijn.
- XPath kan snel complex worden, waardoor het moeilijker te lezen is.

## Conclusie

We kiezen voor CSS selectors, omdat de extra flexibiliteit die XPath heeft niet opweegt tegen de nadelen van de performance. Vooral uit de demo is gebleken dat XPath vele malen trager is dan CSS selectors, zelfs op een simpele pagina. Verder is de flexibiliteit ook niet van belang aangezien het gaat om 'snapshots' van een webpagina, hier blijft de content altijd hetzelfde. 

Wanneer je te maken krijgt met dynamische websites is XPath een betere optie, door de flexibele selecteer methodes en conditionele selectie mogelijkheden. Je kan dan niet meer wijzen naar bijvoorbeeld het 6e element uit een lijst en dan moet je op attributen gaan selecteren. Echter krijg je dan ook vaak te maken met roulerende waardes in attributen, waardoor het programmatisch vrij lastig op te lossen is.  

Denk bijvoorbeeld aan het volgende element op een pagina:

`<input type="submit" id=" submit_334350" value="Subscribe">`

De id `submit_334350` van de knop is bij elke refresh anders. Je kan de oplossen door het volgende XPath te gebruiken: `//input[starts-with(@id, ‘submit_’)]`. Je kijkt dan maar naar een deel van het attribuut. Echter is dit programmatisch lastig op te lossen en erg fout gevoelig. 

## sources:

 https://exadel.com/news/how-to-choose-selectors-for-automation-to-make-your-life-a-whole-lot-easier

https://www.jadeglobal.com/blog/ways-locate-dynamic-web-elements-selenium

eigen demo
