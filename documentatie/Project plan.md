# Project plan

Team Opossum

- [Inleiding](#inleiding)
- [Product Backlog](#product-backlog)
- [Dagplanning](#dagplanning)
- [De opdracht](#de-opdracht)
  * [De A11y Annotatie-tool.](#de-a11y-annotatie-tool)
- [Definition of Done](#definition-of-done)
  * [Code](#code)
  * [Documentatie](#documentatie)
- [Periodeplanning](#periodeplanning)
- [Procesbeschrijving](#procesbeschrijving)

## Inleiding

Dit document is het projectplan voor de DWA project periode. Hierin staan de afspraken beschreven tussen de teamleden en tussen het team en de opdrachtgever.

Dit team heet Opossum bestaande uit 4 personen:

- Ruben Eppink
- Stefan oude Lohuis
- Mark Jansen
- Iliass El Kaddouri

Robert Holwerda is in dit project product owner.


## Product Backlog

De eerste versie van de product backlog is te vinden in het volgende document:

[Product backlog](https://docs.google.com/document/d/172tH_gmdLupHA3CApQ1GJsjTFZ4jGqPBvUU64uAUdgM/edit?usp=sharing). Alle PBI’s zijn geprioriteerd en onderverdeeld per sprint.

In dat document onder het kopje [moeilijkheden](https://docs.google.com/document/d/172tH_gmdLupHA3CApQ1GJsjTFZ4jGqPBvUU64uAUdgM/edit#bookmark=id.qn64rk97fje2) staan knelpunten waar we verwachten tegen aan te lopen. Op aanraden van de Product Owner, eerst technische risico’s op te lossen, hebben wij deze PBI’s als eerst geprioriteerd.

Tussen de pre-game en begin eerste sprint, nadat de user stories zijn aangescherpt, gaan wij over tot het gebruik van Github Issues voor de product backlog, welke hier te vinden is: [Project-opossum - issues](https://github.com/HANICA-DWA/sep2021-project-opossum/issues). Om de pagina te bekijken moet toegang verleend worden door een van de docenten van DWA.


## Dagplanning

Hieronder een overzicht van regels binnen het team m.b.t. dagplanning.

| **Werktijden** | 9.00 - 17.00                                                 |
| -------------- | ------------------------------------------------------------ |
| **DSU**        | 9.15 (Uitzondering maandag wegens team demo’s)               |
| **Pauze**      | Eigen keuze, alleen laten weten wanneer je weg gaat en terug komt. |
| **Team Demos** | Wekelijks op maandag om 9.30 voorafgaand aan de DSU.         |
| **Afsluiting** | 16.45                                                        |

- De team demos zijn momenten waarbij er binnen het team kort aan elkaar gedemonstreerd wordt waar er aan gewerkt is. Hiermee kan het team feedback geven aan elkaar over functies, design, ect.
- Na de team demos wordt de DSU gedaan. Dit maakt het mogelijk om op basis van wat het team van elkaar heeft gezien bij te sturen tijdens de eerste DSU van de week. De DSU op maandag is dus niet om 9.15, maar aansluitend na de team demo’s.


## De opdracht


### De A11y Annotatie-tool.

Maak een tool waarmee een willekeurige site (de subject-site) voorzien kan worden van annotaties waarmee accessibility-problemen gehighlight kunnen worden. Die annotaties verwijzen op vergelijkbare manier naar officiële standaarden, maar de analist kan ook eigen tekst en afbeeldingen aan een annotatie toevoegen. De tool kan, op basis van die annotaties een rapport genereren waarmee een organisatie een overzicht heeft van de omvang van het probleem.

In technisch opzicht denken we aan de volgende zaken:

- De tool wordt geïnstalleerd als een browser extensie (of webapplicatie) van de analist, en van medewerkers van de klant-organisatie.
- Een back-end bevat de annotaties en de verwijzingen naar de W3C kennisbank.
- De site is collaboratief: als een gebruiker annotaties verandert, dan zullen andere gebruikers die naar dezelfde subject-pagina kijken, de veranderingen ‘live’ zien gebeuren, zowel in de pagina-view met de annotaties, als in de rapport-pagina.

Er zijn nogal wat would-like-to-haves denkbaar voor deze opdracht:

- De tool zou een statische versie van de pagina’s kunnen opslaan waardoor de annotaties ook in beeld gebracht kunnen worden voor hen die de extensie niet geïnstalleerd hebben. Dit zou het ook mogelijk maken om meerdere versies van dezelfde pagina te managen.
- De tool zou de analist ook de onderliggende HTML-structuren moeten laten zien, omdat veel a11y problemen te maken hebben met die onzichtbare structuren.
- Het zou cool zijn als de tool de layout van de subject-site kan herstructureren zodat meteen zichtbaar wordt hoe een voorleesprogramma door de site zou gaan.
- etc.


## Definition of Done

Om ervoor te zorgen dat het duidelijk is wanneer iets als ‘af’ verklaard kan worden, is deze definition of done opgezet. Hierin worden regels of stappen aangegeven die doorlopen of afgevinkt moeten worden om zo een taak volledig af te ronden.


### Code

- Voordat een pull requests goedgekeurd mag worden moet deze door 2 (andere) teamleden gecontroleerd en vervolgens goedgekeurd worden.
- Opmerkingen en feedback op een pull request moet worden verwerkt (of besproken).
- Code formatting moet voldoen aan de linter.
- Code is voorzien van (nuttige) unit tests en deze testen slagen.
- Er wordt zoveel mogelijk gehouden aan de regels van DRY, SOLID, KISS en andere design principles.
- Namen van methodes, variabelen, etc. zijn de gebruikelijk conventies van de programmeertaal, framework of library gevolgd.
- Code is functioneel getest.
- Indien mogelijk zijn er mock API endpoints opgezet in postman
- Code is in het Engels geschreven.


### Documentatie

- Voldoet aan APA en AIM controlekaart
- Geschreven in markdown op basis van het software guidebook




## Periodeplanning

  


| **Datum**           | **Schoolweek** | **Maandag**          | **Dinsdag**           | **Woensdag** | **Donderdag**               | **Vrijdag**                                      |
| ------------------- | -------------- | -------------------- | --------------------- | ------------ | --------------------------- | ------------------------------------------------ |
| 08-11-2021(week 45) | 2-1Pre-game    | Worshop User Stories | Workshop Unit Testing | Workshop C4  | Workshop Software Guidebook | Sprint planning                                  |
| 15-11-2021(week 46) | 2-2Sprint 1    |                      | PS meeting            |              | Coach sessie                |                                                  |
| 22-11-2021(week 47) | 2-3Sprint 1    |                      | PS meeting            |              | Coach sessie                | Sprint planningSprint reviewSprint retrospective |
| 29-11-2021(week 48) | 2-4Sprint 2    |                      | PS meeting            |              | Coach sessie                |                                                  |
| 06-12-2021(week 49) | 2-5Sprint 2    |                      | PS meeting            |              | Coach sessie                | Sprint planningSprint reviewSprint retrospective |
| 13-12-2021(week 50) | 2-6Sprint 3    |                      | PS meeting            |              | Coach sessie                |                                                  |
| 20-12-2021(week 51) | 2-7Sprint 3    |                      | PS meeting            |              | Coach sessie                | Sprint reviewSprint retrospective                |
| 27-12-2021(week 52) | KERSTVAKANTIE  |                      |                       |              |                             |                                                  |
| 03-01-2022(week 1)  | KERSTVAKANTIE  |                      |                       |              |                             |                                                  |
| 10-01-2022(week 2)  | 2-8Post-game   |                      | PS?.meeting           |              | Coach sessie                |                                                  |
| 17-01-2022(week 3)  | 2-9Assessments |                      |                       |              |                             |                                                  |


## Procesbeschrijving

Tijdens dit project wordt er gewerkt volgens de [scrum methode](https://www.scrumcompany.nl/wat-is-scrum/).

We nemen een aantal scrum ceremonies over zoals de daily standup, planning, retrospective en review.

Tijdens de sprint planning wordt bepaald welke user stories er worden ontwikkeld in een sprint.

Op Github, in de repository, worden de user stories als issues aangemaakt en krijgen ze een uitgebreide beschrijving volgens het template die de HAN heeft aangeleverd. Dit is onze product backlog. In een issue staat welke taken daarvoor gedaan moeten worden.

De issues die bij een sprint horen worden gekoppeld aan een Github project. Wederom staan projecten in de opossum repository. Dit is onze sprint backlog en ook de manier hoe we de issues volgen.

Issues in een sprint krijgen labels die aangeven in welke fase ze zitten. Fasen kunnen zijn todo, in-progress, review, done. Deze kunnen nog veranderen zodra we meer te weten komen over hoe prettig is te werken in projecten op Github.

Er zijn een aantal momenten die ervoor zorgen dat iedereen te weten komt welke taken er zijn, wat ze inhouden en hoe ver ze zijn gevorderd. Bij deze momenten is het dan ook mogelijk om feedback te geven op de taken of uitvoering ervan.

Deze momenten zijn de ‘daily standup’ waarbij iedereen van elkaar te weten komt waarmee men bezig is en wat de voortgang is. Mocht er vertraging zijn wordt dat op dit moment aangegeven en een teamlid kan vragen om hulp bij een taak. Vertraging en hulp kan natuurlijk altijd aangekaart worden maar dit is het formele moment ervoor.

De team demo’s zijn een ander moment waarbij nog concreter getoond kan worden wat de voortgang is en wat een taak precies inhoudt. Dit is een wekelijks moment waarbij we kort aan elkaar laten zien wat er is gemaakt. Hierdoor kan het team concreet zien wat er is gemaakt en kan er feedback gegeven worden.

Integratie is tijdens dit project opgenomen in de werkwijze van het team. De applicatie die wordt ontwikkeld heeft een front-end en back-end die met elkaar communiceren. Tijdens programmeren wordt er in eerste instantie met mocking gewerkt vanuit beide kanten. Het team heeft ervoor gekozen om front-end werk en back-end werk van een feature bij elkaar te houden. Een teamlid doet dus beide. Zodra een teamlid de front-end en back-end onderdelen die bij een feature horen af heeft worden ze geïntegreerd.

Tijdens dit project werken we met feature branches als git strategie.

Deze strategie staat in het volgende artikel beschreven: [gitflow-workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

Hierbij maken wij alleen geen gebruik van release branches. Dit houd in dat we 5 soorten branches hebben.

- Main
- Develop
- Feature
- Fix
- Hotfix

De strategie luidt als volgt.

1. Develop branch wordt gemaakt van main
2. Hotfix branch wordt gemaakt van main om breaking bugs in live code snel te repareren (niet nodig tijdens dit project.)
3. Feature branch wordt gemaakt van develop
4. Fix branch wordt gemaakt van develop
5. Merge van een Feature/Fix branch naar develop door middel van pull requests waarbij de code gecontroleerd wordt.
6. Merge van develop naar main door middel van pull request waarbij de code nogmaals grofweg gecontroleerd wordt en functioneel getest wordt met het team.

Er wordt niet gebruik gemaakt van een release branch aangezien er niet ontwikkeld gaat worden op de momenten dat we de develop branch functioneel gaan testen en gaan mergen naar main. Als er wel nog ontwikkeld zou worden in die tijd is een release branch handig om te gebruiken voor het testen zonder dat er nieuwe code bij komt.

Op github wordt een buildstraat opgezet die automatisch gecontroleerd of alle tests slagen, code kwaliteit goed is en of de code goed geformatteerd is.

- Nadat een feature of fix klaar is wordt er gemerget naar de develop branch.
- Tegen het einde van de sprint voor de sprint review wordt er een pull request aangemaakt om te mergen van develop naar main. Hierbij wordt de develop branch functioneel getest. Voor mogelijk fouten worden fix branches aangemaakt. Dan na de sprint review wordt het pull request gemerget van develop naar main.

  