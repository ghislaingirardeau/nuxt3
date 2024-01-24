# Composables

Similar to mixins
to reuse logic for common tasks. For example, we may need to format dates in many places,
so we extract a reusable function for that.

debug du projet

# Env

create env file to the root to automaticly set dotenv
Since the URL is not secret and sensitive data, we can use the publicRuntimeConfig: key.
If it was private, like an API token, you’d want to do this using the privateRuntimeConfig:

const config = useRuntimeConfig();
console.log(config.DATABASE);

# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/guide/deploy/presets) for more information.
