# ShopHub — Mini E-commerce App

A small React storefront built for a frontend assignment. Products come from the [Fake Store API](https://fakestoreapi.com). Cart data is saved in `localStorage`.

**Live site:** add your deployed URL here after hosting on Vercel/Netlify.

## Setup

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview the build locally

## What it does

- Product grid on `/` with quick add to cart
- Product detail on `/product/:id` with image gallery, size/color pickers, and quantity
- Cart drawer from the navbar with item count badge
- Selected size and color stay in the URL (`?size=M&color=Black`)
- Cart survives page refresh via `localStorage`

## Tech

- React 18+ with hooks
- React Router
- SCSS modules (no Tailwind)
- Vite
- Context API for cart state

## Notes

- Fake Store API does not return sizes, colors, or stock. I added simple mock logic in `src/utils/variants.js` so the variant UI can be tested.
- Sale prices and brands are also mocked from product id/category because the API does not provide them.
- I used Context instead of Redux because the only shared state is the cart.

