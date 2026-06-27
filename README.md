# Nexora – Digitalagentur Website

Produktionsreife, mehrseitige Website der Digitalagentur **Nexora**. Gebaut mit
reinem **HTML, CSS und JavaScript** – kein Build-Schritt, keine Abhängigkeiten,
sofort einsatzbereit.

## Highlights

- ⚡ **Reine Web-Standards** – HTML5, modernes CSS, Vanilla JS (kein Framework, kein Bundler)
- 🎨 **Premium Design System** – Design-Tokens, Glassmorphism, weiche Schatten, Farbverläufe
- 🌙 **Dark Mode** – automatisch nach Systemeinstellung + manueller Umschalter (gespeichert)
- 📱 **Mobile First & vollständig responsive** – Sticky Navbar, Mega-Menü, mobiles Menü
- ✨ **Mikroanimationen** – Scroll-Reveal, Counter, Parallax, Hover-Effekte (IntersectionObserver)
- ♿ **Accessibility** – semantisches Markup, Fokuszustände, Skip-Link, ARIA, reduced-motion
- 🔍 **SEO-optimiert** – Meta-Tags, Open Graph, sprechende Titel, sitemap.xml & robots.txt

## Seitenstruktur

| Seite | Datei |
|-------|-------|
| Home | `index.html` |
| Leistungen (9 Bereiche) | `leistungen.html` |
| Portfolio | `portfolio.html` |
| Projekt-Detail | `projekt.html` |
| Über uns | `ueber-uns.html` |
| Preise | `preise.html` |
| Blog Übersicht | `blog.html` |
| Blog Artikel | `blog-artikel.html` |
| FAQ | `faq.html` |
| Kontakt | `kontakt.html` |
| Impressum | `impressum.html` |
| Datenschutz | `datenschutz.html` |
| 404 | `404.html` |

## Projektaufbau

```
NEXORA/
├── index.html              # Startseite
├── *.html                  # weitere Seiten
├── css/
│   └── style.css           # komplettes Design-System
├── js/
│   └── main.js             # Header/Footer-Injektion + Interaktionen
└── assets/
    ├── logo.svg            # N-Logo (Verlauf)
    ├── favicon.svg         # Favicon
    └── images/team/        # Teamfotos
```

Header und Footer werden zentral in `js/main.js` gepflegt und auf jeder Seite
in `<div id="site-header">` bzw. `<div id="site-footer">` eingefügt – so bleibt
die Navigation überall konsistent.

## Lokal starten

Da es sich um statische Dateien handelt, genügt ein beliebiger Webserver:

```bash
# Python
python3 -m http.server 8000

# oder Node
npx serve .
```

Anschließend `http://localhost:8000` im Browser öffnen.

## Design-Tokens

Farben, Typografie und Abstände sind als CSS-Variablen in `:root` (und
`[data-theme="dark"]`) in `css/style.css` definiert.

| Token | Wert |
|-------|------|
| Primary | `#2563EB` |
| Secondary | `#06B6D4` |
| Accent | `#38BDF8` |
| Dark | `#0F172A` |
| Background | `#F8FAFC` |
| Text | `#111827` |

**Schriften:** Poppins (Headlines) & Inter (Fließtext).

---

© Nexora Digital Solutions
