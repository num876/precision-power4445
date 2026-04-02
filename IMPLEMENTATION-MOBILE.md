# IMPLEMENTATION-MOBILE.md

> [!IMPORTANT]
> **Objective:** Comprehensive mobile UX re-engineering for the "Digital Front Desk" brand.
> **Target Devices:** iPhone 12 Mini (375px) through large Android devices (480px).

---

## Phase 1: Functionality & Interaction (Core UX)

### 1.1 Touch Target Engineering
- **Buttons & Nav:** All interactive regions set to **48px minimum height** for precision tapping.
- **Form Inputs:** Padding increased to **16px**, ensuring a consistent **48px touch zone**.
- **Hamburger Icon:** Expanded tap target to **44px x 44px** via transparent padding.

### 1.2 Hero & Accessibility
- **Viewport Optimization:** Reduce Hero height to **78vh** on mobile to reveal the "Automation" section partially, encouraging scroll activity.
- **iOS Zoom Fix:** Lock all input font sizes to **16px (1rem)** minimum to prevent the disruptive iOS "auto-zoom" on focus.
- **Full-Width Action:** Submit buttons and primary CTAs converted to **100% width** on screens `< 640px`.

### 1.3 Modal Mechanics
- **Close Velocity:** Large **44px close icon** with a high-contrast background.
- **Swipe Logic:** Implementation of a simple `touchstart` / `touchend` listener for **swipe-down-to-close** functionality.
- **Margin Safety:** Guaranteed **16px safety margins** on all axes to prevent edge-clipping.

---

## Phase 2: Aesthetic & Layout (Visual Rhythm)

### 2.1 Responsive Column Architecture
- **Tablets (481px-768px):** Refactor Services Bento Grid to **2 columns**.
- **Mobile (< 480px):** Single column vertical stack with **increased card padding (24px)** for readability.

### 2.2 Typography & Spacing Hierarchy
- **Fluid Type:** Refine `clamp()` values for `h1` and `h2` to prevent word-breaking on 320px devices.
- **Padding Standardization:** 
  - Desktop: `8rem` vertical padding.
  - Mobile: `3.5rem` vertical padding.
- **Navbar Compression:** Logo font size reduced to **1.3rem** and navbar height reduced by **15%** on mobile scroll.

### 2.3 Image Aspect Ratios
- **Project Cards:** Shift from 16:10 to **16:14 (Taller)** on mobile. This reduces the horizontal scroll burden while keeping the "Technical Brief" visuals prominent.

---

## Phase 3: Performance & Motion (Energy Efficiency)

### 3.1 Animation Pruning
- **Scroll Marquee:** Font size increased to **0.95rem**; animation speed increased by **20%** for better legibility on fast scrolls.
- **GPU Optimization:** Force hardware acceleration on all `.reveal` classes using `will-change: transform`.
- **Reduced Motion:** If `prefers-reduced-motion: reduce` is detected, complex background orbs will be replaced with static gradients.

### 3.2 Haptic Feedback
- **Native Logic:** Utilize `window.navigator.vibrate(10)` (where supported) for subtle feedback on Card Press and Toggle Menu actions.

---

## Technical Mapping (Files to Modify)

| File | Primary Responsibility |
| :--- | :--- |
| **`style.css`** | Media queries for grid-refactors, button heights, and fluid typography. |
| **`src/js/ui.js`** | Swipe-to-close modal logic and touch-feedback handlers. |
| **`src/js/animations.js`** | Performance throttling for marquee and hero on mobile. |
| **`index.html`** | Input accessibility labels and meta-viewport checks. |

---

## Acceptance Criteria
- ✅ NO touch target below **44px**.
- ✅ NO layout shifts during modal activation on iPhone 12 Mini.
- ✅ **100% WCAG AA** contrast compliance on all mobile text overlays.
- ✅ Success/Error messages stay visible above the soft keyboard.
