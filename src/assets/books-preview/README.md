# Book shelf preview assets

The original sample books have been replaced with Ayoub's current read and two free Quran offers. See `../books/README.md` for product sources.

`reading-shelf.png` was generated with the built-in image generation tool for the featured preview variant. It is decorative photography of unbranded books, not a product photograph. Astro optimizes the source images for delivery. The comparison routes exist only in development; the chosen cover shelf appears on the homepage.

Generation prompt:

> Create a quiet editorial photograph for the header of a personal reading shelf on an Islamic learning website. Landscape 3:1 composition. Three closed, unbranded clothbound books in deep muted teal, sage green and slate blue resting upright and leaning slightly together on a clean pale stone shelf, afternoon window light, subtle paper texture, generous empty space on left. No writing, no text, no logos, no people, no sacred text, no decorative objects. Realistic sophisticated still-life product photography, soft natural shadows. This is an atmospheric illustration, not a depiction of specific published books.

Run the browser check against `pnpm dev` with `node scripts/check-book-shelves.mjs`. Set `PLAYWRIGHT_MODULE` to an installed Playwright package if it is not available through normal Node resolution, and `TEST_BASE_URL` if the server is not at `http://127.0.0.1:4322`.
