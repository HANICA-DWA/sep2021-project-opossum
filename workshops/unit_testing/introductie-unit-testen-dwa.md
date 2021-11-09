# 'Unit'-testing bij DWA

Wat is een Unit?

---

# Pyramid of testing

![pyramid](./images/testing-pyramid.png)

Het idee is dat je Unit testen gaat doen, maar het kan zijn dat deze testen eigenlijk integratie testen zouden moeten heten. 

---

## Eisen voor 'unit'- testing bij DWA 

Er zijn voldoende testen voor functies uit eigen Node-backend code

Voldoende:

- Happy path wordt getest
- Belangrijke uitzonderingen worden getest

Niet:

- Mocking hoeft niet (maar mag wel)
- Router handlers in principe niet (tenzij er anders niet overblijft)

## Eisen E2E-testen

Deze moeten er ook komen, maar meestal is het geen goed idee om ze vanaf het begin te schrijven omdat de applicatie die ze testen dan nog teveel verandert.  

Eisen volgen tijdens de E2E workshop.

---

## Voorbeeld van een test

### De code die we willen testen

De code is expres zo simpel mogelijk gehouden.

- Een quiz bestaat uit drie vragen
- Met de methode `nextQuestion` gaan we naar de volgende vraag
- Na drie vragen beginnen we opnieuw

```js

class Quizz {
    
    constructor() {
        this.currentQuestion = 1;
    }

    nextQuestion() {
        this.currentQuestion++

        if (this.currentQuestion > 3) {
            this.currentQuestion = 1;
        }
    }

}

```
---

## De test-code

Volgt het AAA pattern:

- Arrange: alle data klaarzetten in een 'schone' toestand
- Act: methode(s) uitvoeren
- Assert: checken dat het resultaat gelijk is aan de verwachting

### Test 1: basisgeval


```js

// Test 1

const quizz = new Quizz();  //Arrange

quizz.nexQuestion(); //Act

if (quiz.currentQuestion === 2) { //Assert
    console.log('TEST SUCCESS');
} else {
    console.log('TEST FAIL');
}

```

Je kunt discussieren over of het een goed idee is om de waarde van `currentQuestion` te willen weten omdat het een implementatie-detail is (en wellicht kan veranderen). 

Hier gaan we bij DWA niet heel moeilijk over doen, omdat we willen dat je eerst het idee van testen onder de knie krijgt.

---

### Test 2: randgeval

Bij elke test maken we een nieuw Quiz object zodat we zeker weten wat de waarde van `currentQuestion` is.

```js

const quizz = new Quizz();  //Arrange

for(let i = 0; i < 3; i++) {
    quizz.nexQuestion(); //Act    
}

if (quiz.currentQuestion === 1) { //Assert
    console.log('TEST SUCCESS');
} else {
    console.log('TEST FAIL');
}

```

--- 

## Test framework

De console.logs willen we veranderen door een mooi rapport en dat doen we met een test-framework. Zie verderop in de demo.

---

## Zijn dit nog Unit tests?

### Remote server

We hebben een methode toegevoegd die alle vragen ophaalt van een een of andere vragen-server.

```js

class Quizz {

    async getQuestionsWithCategory(category) {
        const allQuestions = await fetch('http://the-question-db.nl/')

        this.possibleQuestions = allQuestions.filter(
            question => question.category === category
        );
    }
}

```

### Opslaan in een database

Als de quizmaster een vraag selecteert, dan wordt deze in de database opgeslagen.

```js

class Quizz {

    async selectCurrentQuestion(selectedQuestion) {
        this.quizzQuestions[this.currentQuestion] = selectedQuestion;
        
        await this.quizzQuestions.save();
    }
}

```

---

## Bij DWA

Dit zijn eigenlijk geen unit tests meer vanwege de externe dependencies, maar ook hier doen we bij DWA niet moeilijk.

Nadelen hiervan zijn:

- Het testresultaat is nu afhankelijk van de externe systemen (en die ben je niet aan het testen)
- Je moet de externe systemen in een 'schone' toestand brengen na elke test en dat kan best veel werk zijn.

De oplossing is dat je de externe systemen gaat simuleren (met zgn mocks). Uiteindelijk is dit de beste oplossingen, maar nadelen zijn:

- Erg complex als je net begint met leren testen
- Je kunt jezelf makkelijk voor de gek houden doordat je een test maakt die alleen die specifieke mock test.

---

## Voor de bonus

Een lijstje met testen die je voor andere onderdelen van de applicatie kunt gebruiken.

Als je het leuk vindt, mag je jezelf hierin verdiepen.

## Front-end

### React

- React component testing
- Snapshot testing

### Redux

- action creators
- async action creators
- reducers

## Back-end

- Functies in node module
- Mongoose methode
- Route Handler
- Middleware

