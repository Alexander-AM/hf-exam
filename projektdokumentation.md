# Projektdokumentation
## Projektinfo
- Projektnavn: Dyrevelfærd
- Udvikler: Alexander Ahlgreen Madsen, WU HF02
- Stack: React (React-Router, React-Icons), Sass/SCSS
- URL: https://trusting-gates-fb82e6.netlify.app/
- Login URL: https://trusting-gates-fb82e6.netlify.app/login
- Username/password: admin/1234

## Indsats
Min vurdering af min indsats under dette forløb er at jeg har gjort mit bedste for at opfylde alle de stillede mål og intet mere eller mindre.

## Argumentation
Jeg valgte at placere den implementerede slider imellem "about" sektionen og "volunteer" sektionen, da alle andre sektioner var opdelt af et billede. Det virkede som den mest balancerede position.

Jeg placerede newsletter afmeld knappen i formen for at timelde sig, sådan så at brugerene har en let-tilgængelig knap fra forsiden af, der giver mening i sammenhængen. Jeg har dog også placeret en afmeld knap på kvitteringssiden i tilfælde af at brugeren registererede den forkerte email, eller ændrede mening om nyhedsbrevet.

## Teknologier
Til dette projekt valgte jeg at bruge React fordi at jeg skulle udvikle en hjemmeside med et enkelt, fokuseret tema, på en kort mængde tid. For at få sideskift og hash links til at fungere, tog jeg brug af React-Router, et router system der sørger for at servere den rigtige kode for de rigtige URLs, såvel som en udvidelse til det, da der var problemer med anchor URLs. Jeg brugte React-Icons biblioteket til "burger menu" ikonet. Jeg brugte også Sass/SCSS for bedre at strukturere og oganiserere mit CSS.

## Teknisk dokumentation
```js
const Slideshow = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className="slideshow">
            <div
                className="slideshow-inner"
                style={{ transform: `translateX(-${currentSlide}00%)` }}
            >
                {props.slides.map((slide, i) => {
                    return (
                        <div className="slideshow-item" key={i}>
                            {slide}
                        </div>
                    );
                })}
            </div>
            <div className="slideshow-controls">
                {props.slides.map((slide, i) => {
                    return (
                        <div
                            className={`slideshow-control${
                                currentSlide === i ? " current" : ""
                            }`}
                            key={i}
                            onClick={(e) => {
                                setCurrentSlide(i);
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};
```
Dette er et uddrav fra Slideshow.js, som jeg selv har skrevet. Det er en simpel, React-baseret, metode til at lave en slider med meget lidt HTML, CSS og JavaScript. Denne version har ikke autoplay, da jeg ikke dømte det nødvendigt for denne side. Koden er afhængig af Reacts re-render system. Den flytter bare en statisk container (slide)*100% til venstre via CSS transforms.

## Kanban board
URL: https://trello.com/b/X5S6fQhn/dyrevelf%C3%A6rd-kanban