## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Create Next App

```shell
npx create-next-app@14 appName
```

# Project

## Folder Structure

- app folder
    - setup routes, layouts, loading states, etc
- node_modules - project dependencies
- public - static assets
- .gitignore - sets which will be ignored by source control
- bunch of config files
- in package.json look scripts
- 'npm run dev' to spin up the project on http://localhost:3000

```shell
npm run dev
```

## Home Page

- page.tsx in the root of app folder
- represents root of our application
  '/' local domain or production domain
- react component (server component)
- bunch of css classes
- export component as default
- file name "page" has a special meaning, it must have to be `page`
- snippets extension

## Create Pages in Next.js

- in the app folder create a folder with the page.js file
    - about/page.js
- can have .js .jsx .tsx extension

## Link Component

- navigate around the project
- `import Link from 'next/link'`. Like, in **home page**

```tsx
import Link from 'next/link';
const HomePage = () => {
  return (
    <div>  <Link href='/about'>  about page </Link> </div>
  );
};
export default HomePage;
```


## Nested Routes

- app/info/contact/page.tsx
- if no page.tsx in a segment will result in 404

## CSS and Tailwind

- vanilla css in globals.css
- [Tailwind](https://tailwindcss.com/)


## Layouts and Templates

1. layout.tsx 
2. template.tsx

* Layout is a component which wraps other pages and layouts. 
  * Allow to share UI. Even when the route changes, layout DOES NOT re-render. 
  * Can fetch data but can't pass it down to children. 
* Templates are the same but they re-render.

- the top-most layout is called the Root Layout. This required layout is shared across all pages in an application. Root layouts must contain html and body tags.
- any route segment can optionally define its own Layout. These layouts will be shared across all pages in that segment.
- layouts in a route are nested by default. Each parent layout wraps child layouts below it using the React children prop.

## Navbar

- create components/Navbar.tsx
- render in layout.tsx


## Fonts - Google Fonts

- Automatically self-host any Google Font. 
- Fonts are included in the deployment and served from the same domain as your deployment. 
- No requests are sent to Google by the browser.

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] }); // there are more options

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

## Metadata

Next.js has a Metadata API that can be used to define your application metadata (e.g. meta and link tags inside your HTML head element) for improved SEO and web shareability.
To define static metadata, export a Metadata object from a layout.tsx or page.tsx file.

**Example:** in root `layout.tsx` file look for `metadata`