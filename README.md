# EASTEAM — Daydream Skirt Product Experience

An editorial luxury e-commerce product detail page (PDP) engineered for **EASTEAM**, capturing the brand's signature NYC atelier aesthetic. Built with React 19, Vite, Tailwind CSS, and Framer Motion.

---

## Features

### Editorial Product Presentation
- **Two-Column Desktop Architecture**: 8-asset responsive gallery grid paired with a sticky purchasing summary panel.
- **Atelier Measurement Overlays**: Interactive model sizing pills with interactive garment measurement callouts (waist and hip dimensions).
- **Fullscreen Lightbox**: Keyboard-navigable (`←` / `→` / `Esc`) and touch-responsive modal for close-up garment inspection.
- **Mobile Touch-Optimized Carousel**: Isolated horizontal swipe handling, slide indicator badges, and miniature thumbnail navigation strip.

### Commerce & Fulfillment Engine
- **Dual Fulfillment System**: Instant switching between *In Stock Studio Dispatch* (dispatched within 48h) and *Made to Order* (5% discount, handcrafted bespoke in approx. 4–6 weeks).
- **Interactive Color & Size Selectors**: Multi-shade palette swatches and size buttons displaying real-time stock and pre-order indicators.
- **Atelier Slide-Out Cart Drawer**:
  - Live quantity adjustment stepper and removal controls.
  - Dynamic free shipping meter with progressive threshold calculation ($149 USD).
  - Encrypted checkout CTA.
- **Mobile Sticky Action Bar**: Bottom conversion bar with safe-area inset support (`env(safe-area-inset-bottom)`), active past product scroll threshold.

### Editorial & Client Care Modals
- **Size Guide & Fit Advisor**: Centimeter and inch measurement conversion tables with model fit advisory notes.
- **Atelier Store Locator**: Searchable boutique inventory check across NYC and flagship ateliers.
- **Client Services Return Policy**: Modal outlining the 7-day store credit policy and made-to-order terms.
- **Social Proof & Editorial Modules**: "Previously On / As Seen On" muse gallery, "You May Also Like" cross-sell grid, and newsletter subscription modal.

---

## Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Cormorant Garamond, Space Mono, DM Sans

---

## Project Structure

```text
ESATEAM/
├── public/
│   └── images/               # High-resolution product, campaign & swatch assets
├── src/
│   ├── components/
│   │   ├── AnnouncementBar.jsx      # Top promotional bar
│   │   ├── AvailabilityStatus.jsx   # In-stock vs made-to-order fulfillment selector
│   │   ├── CartDrawer.jsx           # Slide-out shopping bag with free shipping bar
│   │   ├── FindInStoreModal.jsx     # Atelier inventory locator modal
│   │   ├── Footer.jsx               # Atelier footer with watermark logo
│   │   ├── Header.jsx               # Navigation bar with search & bag triggers
│   │   ├── MobileStickyBar.jsx      # Bottom conversion bar for mobile viewports
│   │   ├── Newsletter.jsx           # Inner Circle subscription module
│   │   ├── PreviouslyOn.jsx         # Muse community styling gallery
│   │   ├── ProductAccordion.jsx     # Collapsible specs, materials & fit gauges
│   │   ├── ProductGallery.jsx       # Desktop 2-col grid & mobile carousel
│   │   ├── ProductInfo.jsx          # Sticky purchasing and specification panel
│   │   ├── RelatedProducts.jsx      # Cross-sell recommendation grid
│   │   ├── ReturnPolicyModal.jsx    # Client services return policy modal
│   │   ├── ShippingReturns.jsx      # Trust badges & shipping summary
│   │   ├── SizeGuideModal.jsx       # Metric/imperial conversion size modal
│   │   └── SizeSelector.jsx         # Size button grid with status cues
│   ├── data/
│   │   └── productData.js           # Single source of truth for Daydream Skirt
│   ├── App.jsx                      # Page composition and global state
│   ├── index.css                    # Design system tokens and base styles
│   └── main.jsx                     # Application entry point
├── .gitignore                       # Repository exclusion rules
├── .oxlintrc.json                   # Linter configuration
├── index.html                       # HTML document template
├── package.json                     # Dependencies and scripts
├── tailwind.config.js               # Tailwind design system configuration
└── vite.config.js                   # Vite configuration
```

---

## Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm, pnpm, or yarn

### Installation

1. Clone or download the repository:
   ```bash
   git clone <repository-url>
   cd ESATEAM
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

To build the project for production:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## Design System

| Token | Hex Value | Application |
|---|---|---|
| **Cream** | `#FAF8F5` | Primary background, clean editorial feel |
| **Cream Alt** | `#F5F3F0` | Image containers, neutral card backgrounds |
| **Hairline Border** | `#E5E0DA` | Minimalist dividing lines and borders |
| **Carbon** | `#111111` | Deep obsidian text, buttons, and accents |
| **Ginger Yellow** | `#DDA24C` | Product primary tone and status indicator |
| **Petal Blush** | `#F4D9D2` | Selection highlight and accent elements |

---

## License

Private repository for EASTEAM. All product assets and brand identities belong to EASTEAM NY.
