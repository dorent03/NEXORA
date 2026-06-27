# Nexora — Digitalagentur Website

Produktionsreife, mehrseitige Website für die Digitalagentur **Nexora** – umgesetzt
mit **reinem HTML, CSS und JavaScript** (kein Build-Schritt nötig).

## Highlights

- Premium-, minimalistisches Design im Stil von Apple, Stripe, Linear & Vercel
- **Dark Mode** mit Umschalter (Einstellung wird gespeichert)
- Sticky Navbar mit **Mega-Menü** für Leistungen, mobiles Menü, aktiver Menüpunkt
- Mikro-Animationen, **Scroll-Reveal**, Parallax, Zähler, sanfte Hover-Effekte (GSAP optional)
- Vollständig **responsive / Mobile First**
- SEO-optimiert (Meta-Tags, Open Graph, JSON-LD, `sitemap.xml`, `robots.txt`)
- Barrierearm: Skip-Link, Fokus-Stile, ARIA, `prefers-reduced-motion`
- Eigenes **N-Logo**, **Favicon** und **Design System**

## Projektstruktur

```
.
├── index.html                  # Home
├── leistungen.html             # Leistungsübersicht
├── leistungen/                 # 9 Leistungs-Unterseiten
│   ├── webseiten.html
│   ├── onlineshops.html
│   ├── softwareentwicklung.html
│   ├── corporate-design.html
│   ├── printdesign.html
│   ├── seo.html
│   ├── hosting.html
│   ├── wartung.html
│   └── ki-loesungen.html
├── portfolio.html              # Projektübersicht (mit Filter)
├── portfolio/                  # Projekt-Detailseiten
│   ├── meisterbau.html
│   ├── trattoria-sole.html
│   └── dentalplus.html
├── ueber-uns.html
├── preise.html
├── blog.html
├── blog/                       # Blog-Artikel
│   ├── warum-ladezeit-wichtig.html
│   ├── lokales-seo-guide.html
│   └── ki-im-mittelstand.html
├── faq.html
├── kontakt.html                # Formular + Kontaktdaten + Karte
├── impressum.html
├── datenschutz.html
├── 404.html
├── styleguide.html             # Design System / Komponentenbibliothek
├── robots.txt
├── sitemap.xml
└── assets/
    ├── css/
    │   ├── design-system.css   # Tokens, Reset, Themes, Typografie
    │   ├── components.css       # Buttons, Karten, Navbar, Footer, Formulare
    │   └── main.css            # Seiten-Patterns (Hero, Pricing, Blog …)
    ├── js/
    │   ├── components.js        # Navbar/Mega-Menü/Footer-Injektion, Theme, Scroll
    │   └── main.js             # Scroll-Reveal, Zähler, Akkordeon, Filter, Formular
    └── img/                     # Logo, Favicon, Bilder
```

## Architektur

Navbar (inkl. Mega-Menü & Mobile-Menü) und Footer werden über `assets/js/components.js`
zentral in `#site-nav` bzw. `#site-footer` eingefügt. Dadurch existiert die Navigation
nur an **einer** Stelle und bleibt über alle Seiten konsistent.

Jede Seite setzt am `<body>`:

```html
<body data-page="<aktive-seite>" data-base="<''-für-Root | '../'-für-Unterordner>" data-year="2026">
```

- `data-page` steuert den aktiven Menüpunkt.
- `data-base` ist der Pfad-Präfix, damit Links aus Unterordnern (`leistungen/`, `blog/`,
  `portfolio/`) korrekt aufgelöst werden.

## Lokal starten

Da es sich um statische Dateien handelt, genügt ein einfacher Webserver:

```bash
# Python
python3 -m http.server 8000
# danach: http://localhost:8000
```

> Hinweis: Über einen Webserver öffnen (nicht per Doppelklick `file://`), damit
> relative Pfade und das Karten-iframe sauber funktionieren.

## Externe Abhängigkeiten (CDN)

- **Google Fonts** – Poppins & Inter
- **Lucide Icons** – `unpkg.com/lucide`
- **GSAP** – optionale Hero-Animation (Seite funktioniert auch ohne)
- **OpenStreetMap** – eingebettete Karte auf der Kontaktseite

## Anpassen

Farben, Abstände, Radien und Schatten sind als CSS-Variablen in
`assets/css/design-system.css` definiert und an einer Stelle änderbar.
Die wichtigsten Inhalte (Telefon, E-Mail, Adresse, Leistungen) lassen sich in
`assets/js/components.js` zentral pflegen.

---

© 2026 Nexora Digital Solutions.
