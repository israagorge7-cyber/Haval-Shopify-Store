# STIQO – Shopify Theme (German)

A custom Shopify Liquid theme for **STIQO**, a one-product German store selling **STIQO Protein Loaded Coffee** – instant coffee sachets with 10 g Whey-Protein and 180 mg caffeine.

## Why this product

Currently the **#1 / #3 best-seller on TikTok Shop US** (Fastmoss data, May 2026). Functional drink trend is exploding in Germany too (gut health + protein + caffeine combo). High-margin (~70%), repeat-buy consumable, perfect for TikTok video demos (mixing shot, sip reaction, "POV" hooks).

## What's inside

```
theme/
├── assets/
│   ├── theme.css         # Warm coffee tones, mobile-first, responsive
│   └── theme.js          # Cart drawer (AJAX), variant picker, gallery, accordion
├── config/
│   ├── settings_schema.json
│   └── settings_data.json   # Coffee color palette pre-set
├── layout/
│   └── theme.liquid      # Base layout, lang="de", SEO, fonts
├── locales/
│   ├── de.default.json   # All German strings
│   └── en.json
├── sections/
│   ├── header.liquid + header-group.json
│   ├── footer.liquid + footer-group.json
│   ├── hero.liquid          # "10 g Protein. 180 mg Koffein. 0 g Kompromiss."
│   ├── benefits.liquid      # Protein / Koffein / Heiß-Kalt / Versand DE
│   ├── featured-product.liquid
│   ├── how-it-works.liquid  # Sachet → Schütteln → Genießen
│   ├── testimonials.liquid
│   ├── faq.liquid           # Geschmack, Koffein, Vegan, Versand, …
│   ├── cta-banner.liquid
│   ├── main-product.liquid  # Variants (Geschmack, Pack-Größe), trust badges
│   ├── main-collection.liquid
│   ├── main-cart.liquid
│   ├── main-page.liquid
│   ├── main-contact.liquid
│   ├── main-search.liquid
│   └── main-404.liquid
├── snippets/
│   ├── icon.liquid
│   ├── price.liquid
│   ├── product-card.liquid
│   ├── meta-tags.liquid
│   └── cart-drawer.liquid
└── templates/
    ├── index.json     # Pre-filled with coffee copy
    ├── product.json
    ├── collection.json
    ├── cart.json
    ├── page.json
    ├── page.contact.json
    ├── search.json
    └── 404.json
```

## Color palette (warm coffee theme)

| Token | Value | Usage |
|---|---|---|
| primary | `#A0522D` (Sienna) | CTAs, accents, sale badges |
| secondary | `#3E2A1F` (Espresso) | Footer, dark surfaces |
| accent | `#F4ECE2` (Cream) | Soft section background |
| text | `#1F1410` | Body text |

All editable in **Theme → Customize → Theme settings → Farben**.

## Features

- 100% German UI – built for the DACH market
- EUR formatting, GDPR-aware footer (Impressum, Datenschutz, AGB, Widerrufsrecht)
- Mobile-first, responsive, accessible
- AJAX cart drawer with **free-shipping progress bar** (default threshold: 39 €)
- Sticky header, mobile burger nav
- Conversion-optimized homepage: Hero → Benefits → Featured Product → How it works → Reviews → FAQ → CTA
- Product page: variant pills (Geschmack / Pack-Größe), qty selector, trust badges, payment icons
- Newsletter form (10% off lead magnet)
- SEO meta tags + Open Graph (locale `de_DE`)

## How to upload to Shopify

### Option A – Zip & upload (easiest)

1. Open the `theme/` folder.
2. Select **all** sub-folders (`assets`, `config`, `layout`, `locales`, `sections`, `snippets`, `templates`) and zip them.
   The zip's root MUST contain those folders directly (not a wrapping `theme/` folder).
3. In Shopify admin go to **Online Store → Themes → Add theme → Upload zip file**.
4. Click **Customize** to start editing.

### Option B – Shopify CLI (recommended for development)

```bash
npm install -g @shopify/cli @shopify/theme

cd theme
shopify theme dev --store=your-store.myshopify.com
# or push directly:
shopify theme push --unpublished --store=your-store.myshopify.com
```

## Required Shopify setup before launch

1. **Settings → Store details**
   - Store name: `STIQO`
   - Currency: **EUR**
   - Time zone: `(GMT+01:00) Berlin`

2. **Settings → Markets**
   - Primary market: **Germany** (add Austria & Switzerland for DACH)
   - Language: **Deutsch (Standard)**

3. **Settings → Policies** (German legal requirements)
   - Refund policy → **Widerrufsrecht** (auto-attached to checkout)
   - Privacy policy → **Datenschutzerklärung**
   - Terms of service → **AGB**
   - Shipping policy → **Versandbedingungen**
   - Legal notice → **Impressum** (mandatory in Germany!)

4. **Settings → Payments**
   - Activate Shopify Payments (Visa/Mastercard/Apple Pay)
   - Add **Klarna** (Rechnung & Ratenkauf – critical for DE)
   - Add **PayPal**
   - Add **SOFORT/Sofortüberweisung**

5. **Settings → Shipping**
   - Zone: **Deutschland**, free shipping over 39 €
   - Rate: 3,90 € flat for orders under 39 €
   - DHL integration

6. **Navigation → Main menu**
   - Startseite → `/`
   - Protein Coffee → `/products/stiqo-protein-coffee`
   - So funktioniert's → `/pages/how-it-works`
   - Bewertungen → `/pages/reviews`
   - Kontakt → `/pages/contact`

7. **Products → Add product** (use `PRODUCT_COPY.md` for full copy)
   - Title: `STIQO Protein Loaded Coffee – 10g Protein, 180mg Koffein | 14er-Pack`
   - Handle: `stiqo-protein-coffee`
   - Price: 24,99 € · Compare-at: 39,99 €
   - Variants:
     - **Geschmack**: Classic Latte · Vanille Caramel · Schokolade Mokka · Hazelnut Cold Brew
     - **Pack-Größe**: 7er · 14er ⭐ · 30er
   - Add 5–7 high-quality lifestyle photos (sachet + iced latte)
   - Required German labelling fields:
     - Grundpreis (price per 100g)
     - Füllmenge (224 g for 14er)
     - Allergene (Milch / Laktose)
     - Caffeine warning ("Hoher Koffeingehalt. Für Kinder, Schwangere und Stillende nicht empfohlen – 180 mg pro Portion.")

8. **Required apps (DE compliance + conversion)**
   - **Pandectes / Consentmo** – Cookie banner (GDPR Pflicht)
   - **Klaviyo** – E-Mail Marketing, GDPR-compliant
   - **Loox / Judge.me** – Bewertungen mit Foto
   - **Trusted Shops** – DE trust seal (massively boosts CR)

## Suggested ad copy (TikTok / Meta)

- "Dieses Sachet hat 10 g Protein UND 180 mg Koffein. Mein Gym-Game ist fertig."
- "Hab den TikTok-Hype getestet – und kann nicht mehr ohne."
- "Wenn dein Pre-Workout und dein Iced Latte ein Baby hätten…"
- "Warum trinken Berliner Bürohengste plötzlich diesen Kaffee aus dem Sachet?"

See `PRODUCT_COPY.md` for full product description, variants, SEO, and ad hooks.

## License

Private theme for STIQO. Do not redistribute.
