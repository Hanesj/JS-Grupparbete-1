# Task Handler - Projektdokumentation

## Projektöversikt

Task Handler är en webbapplikation för att hantera och organisera uppgifter (tasks). Applikationen erbjuder en användarvänlig gränssnitt för att skapa, redigera och spåra olika uppgifter med tillhörande underuppgifter.

## Funktioner

- Skapa nya uppgifter med följande attribut:
  - Uppgiftsbeskrivning
  - Deadline
  - Status (Not Started, In Progress, Completed)
  - Prioritet (Low, Medium, High)
- Lägga till underuppgifter till befintliga uppgifter
- Redigera befintliga uppgifter genom att klicka på uppgiftsnamnet
- Ta bort uppgifter
- Persistent lagring av uppgifter i localStorage
- Responsiv design med stöd för både desktop och mobil

## Teknisk Stack

- **Frontend**: Vanilla JavaScript, HTML5, SASS/CSS
- **Lagring**: localStorage API
- **Testning**: Vitest
- **Byggverktyg**: Node.js package management

## Installation och Setup

1. Klona repot:

   ```bash
   git clone https://github.com/Hanesj/JS-Grupparbete-1.git
   ```

2. Installera beroenden:

   ```bash
   npm install
   ```

3. Kör tester:

   ```bash
   npm test
   ```

## Designprinciper

- Mobile-first approach med breakpoint vid 768px
- Responsiv layout använder CSS Grid
- Konsekvent färgschema med lila/blå gradient
- Tydlig visuell hierarki
- Användarvänlig formulärdesign

## Kodkonventioner

**JavaScript**:

- camelCase för variabel- och funktionsnamn
- ES6+ syntax
- Modulbaserad arkitektur

**CSS/SASS**:

- BEM-liknande namnkonvention
- Separata filer för olika komponenter
- Mobile-first media queries

**HTML**:

- Semantiska element
- Beskrivande class- och ID-namn
- Tillgänglighetsattribut där relevant

## Lagring

- Applikationen använder localStorage för att spara uppgifter.
- Datastrukturen för en uppgift ser ut så här:

```javascript
{
  Task: string,
  Deadline: date,
  Status: "Not Started" | "In Progress" | "Completed",
  Prio: "Low" | "Medium" | "High"
}
```

## Gruppkontrakt

- Tydlig rollfördelning inom teamet
- Använder Gitmoji för commits
- Engelska och svenska som kodspråk
- Se separat gruppkontrakt för fullständiga detaljer

## Team

- Github-koordinator: Hannes
- HTML-ansvarig: Manuel
- CSS-ansvarig: Erik
- JavaScript-funktionalitetsansvariga: Max, Philip
- Testare och problemlösare: Jihi
- Scrum-master & Dokumentationsansvarig: David

## Licens

- ISC License

Du kan nu kopiera denna kod och spara den som en .md-fil i ditt projekt, till exempel som `README.md` eller `documentation.md`. Filen kommer att renderas korrekt på GitHub och andra plattformar som stödjer Markdown.
