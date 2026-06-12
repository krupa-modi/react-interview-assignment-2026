# DECISIONS

## Context API vs Redux

I went with React Context for cart state. Redux would make sense if the app had auth, wishlists, filters, and checkout flow all sharing state. For this project the cart is basically the only global state, and it is a small object with a handful of actions. Context keeps the setup light one provider, one hook without adding another dependency or boilerplate. The downside is that any cart update re-renders components that consume the context. With only the navbar badge and cart drawer depending on it, that is fine here. If the app grew I would probably move cart + checkout into a dedicated store.

## Mock variants instead of a second API

Fake Store API gives title, price, image, and description. It does not include sizes, colours, stock levels, or multiple images. I could have built a local JSON file with full product data, but the brief asked to use fakestoreapi.com. So I kept the real API for listing/detail and added small helper functions to generate sizes, colours, and stock from the product id. It is not production-ready — real stock would come from the backend per SKU — but it let me build the sold-out and low-stock UI without faking the whole catalogue.

## What I would change with more time

First, I would add tests around the variant selector sold out disables the button, low stock shows a warning, quantity cannot go above stock. Second, the gallery reuses the same image four times because the API only returns one URL; with real data I would map actual image URLs. Third, I used plain `fetch` and kept components fairly flat. With more time I might extract a `useProduct` hook for the loading/error pattern used on both pages, and add a loading state on add-to-cart if it hit a real API. I also did not run a full Lighthouse pass and host on Vercel yet — that would be the next step before submission.
