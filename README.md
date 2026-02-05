# EcommerceProject - Frontend

A concise frontend for a MERN-stack ecommerce app built with React. This repo contains the client-side app: product listing, product pages, cart, checkout flow, user auth, and admin interfaces.

Tech
- React (CRA / Vite)
- Redux or Context for state
- Axios / fetch for API calls
- Tailwind / Bootstrap / CSS modules for styles

Key features
- Browse products, search, and filter
- Product detail pages with reviews
- Add to cart & update quantities
- Checkout flow (addresses & order review)
- User authentication (login / register)
- Admin pages for product and order management

Quick start
1. Install dependencies
   - npm install
2. Run locally
   - npm start
3. Build for production
   - npm run build

Environment
- Create a .env file with at least:
  - REACT_APP_API_URL=https://your-api.example.com
  - REACT_APP_STRIPE_KEY=your_stripe_key (if using Stripe)
- Adjust other variables as needed for auth, analytics, etc.

Notes
- Ensure the backend (MERN API) is running and reachable by REACT_APP_API_URL.
- For production, build the app and deploy the `build` (or `dist`) folder to your static host (Netlify, Vercel, S3, etc.).

Contributing & License
- Contributions welcome — open an issue or PR.
- Add your chosen license here.
