---
name: High-Voltage Fitness
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf2'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eef4ff'
  surface-container: '#e5efff'
  surface-container-high: '#dbe9ff'
  surface-container-highest: '#d4e4fa'
  on-surface: '#0d1c2d'
  on-surface-variant: '#583f4e'
  inverse-surface: '#233143'
  inverse-on-surface: '#e9f1ff'
  outline: '#8c6f7f'
  outline-variant: '#dfbdcf'
  surface-tint: '#b1008e'
  primary: '#ac008a'
  on-primary: '#ffffff'
  primary-container: '#d800ae'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffaedf'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e5e2e1'
  on-secondary-container: '#656464'
  tertiary: '#4f5d72'
  on-tertiary: '#ffffff'
  tertiary-container: '#67758c'
  on-tertiary-container: '#fdfcff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd8ec'
  primary-fixed-dim: '#ffaedf'
  on-primary-fixed: '#3b002e'
  on-primary-fixed-variant: '#87006c'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474646'
  tertiary-fixed: '#d5e3fd'
  tertiary-fixed-dim: '#b9c7e0'
  on-tertiary-fixed: '#0d1c2f'
  on-tertiary-fixed-variant: '#3a485c'
  background: '#f8f9ff'
  on-background: '#0d1c2d'
  surface-variant: '#d4e4fa'
typography:
  display-lg:
    fontFamily: Oswald
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
  headline-lg:
    fontFamily: Oswald
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Oswald
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: Oswald
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 48px
---

## Brand & Style
The brand personality is high-energy, authoritative, and motivating. It targets dedicated fitness enthusiasts who value performance and precision. The visual style is **Corporate Modern** with a **High-Contrast** edge, but has transitioned to a **Vibrant Light Mode** to evoke a fresh, high-intensity daytime energy.

The UI should evoke a sense of momentum and elite coaching. By mixing the utility of a technical SaaS product with the aggressive aesthetics of professional sports apparel, the design system creates a premium environment for high-intensity training.

## Colors
This design system utilizes a high-contrast light mode strategy to provide maximum clarity and a sense of cleanliness and energy.

*   **Primary (Electric Magenta):** Used exclusively for high-priority calls to action, active progress states, and critical highlights.
*   **Secondary (Deep Charcoal):** Used for primary text and high-contrast UI elements to maintain the brand's authoritative edge.
*   **Tertiary (Slate Gray):** Used for secondary text and structural borders to provide definition without the harshness of pure black.
*   **Functional Shadows:** Soft ambient shadows are used on containers to create depth against the light background.

## Typography
The typographic scale emphasizes hierarchy through weight and casing. All headlines use **Oswald** in uppercase to convey strength and urgency, mimicking the look of traditional gym signage and editorial sports magazines.

**Inter** is used for all functional and reading text to ensure maximum legibility at high speeds. Line heights are kept tight for headlines to maintain a dense, energetic block feel, while body text is given ample breathing room for readability during physical activity.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a heavy emphasis on vertical rhythm. 

*   **Mobile:** 4-column grid with 20px side margins. 
*   **Desktop:** 12-column grid with a max-width of 1440px.
*   **Rhythm:** Use an 8px base unit for all component spacing. 
*   **Video Integration:** YouTube embeds should always maintain a 16:9 aspect ratio and span the full width of the grid on mobile to prioritize the visual workout content.

## Elevation & Depth
Depth is achieved through **Tonal Layers** and subtle shadows. Since the background is Light/White, elevation is communicated by adding depth through layering or soft shadows.

*   **Level 0 (Background):** White (#FFFFFF).
*   **Level 1 (Cards/Sections):** Ultra-light gray or white with a 1px Slate Gray border (10% opacity).
*   **Level 2 (Modals/Popups):** White with a soft shadow and a subtle 1px Electric Magenta border (20% opacity).
*   **Overlays:** Use a 60% white blur on background elements when modals are active to maintain focus.

## Shapes
The shape language is defined by **Rounded (16px/1rem)** corners. This specific radius balances the aggressive nature of the typography with a modern, "tech-premium" feel. 

*   **Cards & Containers:** 16px (rounded-lg).
*   **Buttons:** Fully pill-shaped (rounded-xl) to contrast against the rectangular grid.
*   **Small Elements (Tags/Chips):** 8px (rounded-md).

## Components
*   **Buttons:** Primary buttons use a solid Electric Magenta fill with white text. Secondary buttons use a Deep Charcoal outline with Deep Charcoal text. Apply a subtle "glow" (outer shadow) of Electric Magenta on hover.
*   **Progress Bars:** Use thick, 8px tracks. The progress fill should be Electric Magenta.
*   **Cards:** Use clean light surfaces. For "Active" workout cards, include a 2px Electric Magenta left-accent border.
*   **Inputs:** Clean white backgrounds with a 1px border that turns Electric Magenta upon focus.
*   **YouTube Player:** Custom skin for the play/pause button using the system's Electric Magenta and Oswald typography for overlay titles.
*   **Data Visualization:** Use Electric Magenta for positive trends and a muted red for missed goals; keep charts minimal with no grid lines.