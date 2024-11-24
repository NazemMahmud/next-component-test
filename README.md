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

## Server Components VS Client Components

- [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)

- BY DEFAULT, NEXT.JS USES SERVER COMPONENTS
- To use Client Components, you can add the React `"use client"` directive

### Server Components

Benefits :

- **Data Fetching**: 
  - These allow you to move data fetching to the server, closer to the data source. 
  - Can improve performance by reducing time it takes to fetch data needed for rendering, and the amount of requests the client needs to make.
- **Security**: These allow to keep sensitive data and logic on the server, such as tokens and API keys, without the risk of exposing them to the client
- **Caching**: By rendering on the server, the result can be cached and reused on subsequent requests and across users. 
  - This can improve performance and reduce cost by reducing the amount of rendering and data fetching done on each request.
- **Bundle size**: These allow to keep large dependencies that previously would impact the client JS bundle size on the server.
  - Beneficial for users with slower internet or less powerful devices, as the client does not have to download, parse and execute any JS for Server Components.
- **Initial Page Load and First Contentful Paint (FCP)**: On the server, we can generate HTML to allow users to view the page immediately, without waiting for the client to download, parse and execute the JS needed to render the page.
- **SEO and Social Network Shareability**: The rendered HTML can be used by search engine bots to index your pages and social network bots to generate social card previews for your pages.
- **Streaming**: These allow to split the rendering work into chunks and stream them to the client as they become ready. 
  - This allows the user to see parts of the page earlier without having to wait for the entire page to be rendered on the server.

### Client Components

**Benefits:**
- **Interactivity**: Client Components can use state, effects, and event listeners, meaning they can provide immediate feedback to the user and update the UI.
- **Browser APIs**: Client Components have access to browser APIs, like geolocation or localStorage, allowing you to build UI for specific use cases.


## Fetch Data in Server Components

- Follow `tours/page.tsx`: `fetchTours()` method
- Next.tsx extends the native Web fetch() API to allow each request on the server to set its own persistent caching semantics.


## Loading Component

- `loading.js` or `loading.tsx` helps to create meaningful Loading UI with React Suspense. 
- With this convention, we can show an instant loading state from the server while the content of a route segment loads. 
- The new content is automatically swapped in once rendering is complete.
- follow: `tours/loading.tsx`

## Error Component

- The error.tsx file convention allows you to gracefully handle unexpected runtime errors in nested routes.
- follow: `tours/error.tsx`

## Nested Layouts

- Follow: `app/tours/layout.tsx`
- UI will be applied to app/tours segment only
- don't forget about the "children"
- we can fetch data in the layout but... at the moment can't pass data down to children (pages) 😞

## Dynamic Routes

- app/tours/[id]/page.tsx


## Next Image Component

- get random image from pexels site
  [Random Image](https://www.pexels.com/photo/assorted-map-pieces-2859169/)

The Next.js Image component extends the HTML <img> element with features for automatic image optimization:

- Size Optimization: Automatically serve correctly sized images for each device, using modern image formats like WebP and AVIF.
- Visual Stability: Prevent layout shift automatically when images are loading.
- Faster Page Loads: Images are only loaded when they enter the viewport using native browser lazy loading, with optional blur-up placeholders.
- Asset Flexibility: On-demand image resizing, even for images stored on remote servers

- disable cache
- width and height

- priority property to prioritize the image for loading
  When true, the image will be considered high priority and preload.
- Follow: `app/tours/[id]/page.tsx`

## Remote Images

- To use a remote image, the src property should be a URL string.
- Since Next.js does not have access to remote files during the build process, need to provide the width, height and optional blurDataURL props manually.
- The width and height attributes are used to infer the correct aspect ratio of image and avoid layout shift from the image loading in. 
  - The width and height do not determine the rendered size of the image file.

- To safely allow optimizing images, define a list of supported URL patterns in next.config.mjs. Be as specific as possible to prevent malicious usage.
- Follow: `app/tours/[id]/page.tsx` and, `next.config.ts` for **images**
- restart dev server

## Responsive Images

- The fill prop allows your image to be sized by its parent element
- sizes property helps the browser select the most appropriate image size to load based on the user's device and screen size, improving website performance and user experience.

A string that provides information about how wide the image will be at different breakpoints. The value of sizes will greatly affect performance for images using fill or which are styled to have a responsive size.

The sizes property serves two important purposes related to image performance:

First, the value of sizes is used by the browser to determine which size of the image to download, from next/image's automatically-generated source set. When the browser chooses, it does not yet know the size of the image on the page, so it selects an image that is the same size or larger than the viewport. The sizes property allows you to tell the browser that the image will actually be smaller than full screen. If you don't specify a sizes value in an image with the fill property, a default value of 100vw (full screen width) is used.

Second, the sizes property configures how next/image automatically generates an image source set. If no sizes value is present, a small source set is generated, suitable for a fixed-size image. If sizes is defined, a large source set is generated, suitable for a responsive image. If the sizes property includes sizes such as 50vw, which represent a percentage of the viewport width, then the source set is trimmed to not include any values which are too small to ever be necessary.

Follow: `app/tours/`

## More Routing

**1. Private folders**: 
- Whatever folder we create in the app, that will become our URL segment.
- But what if I want to have the folder with some kind of logic, but don't want that folder to be a route.
- We simply need to go with underscore. And, we just need to place the underscore \
  `_folder`
- So if let's say wanna place a CSS folder in there, we can go with new folder inside app, underscore then CSS (`_css`) and place the logic: `app/_css`

**2. Route Groups**:
- Say, have a dashboard folder, inside profile, jobs, etc. folder, but don't want to have the URL like, `/dashboard/profile` or `/dashboard/jobs`. \
  But you still want to group them together.

- Set up the folder with the parentheses. `(dashboard)`
- `(dashboard)/auth/page.tsx`, will have the route: `base_url/auth`

**3. Dynamic Routes**: Set up catch all route segment and optional catch all route segment. \
A popular auth provider by the name of Clark is using this optional catch all.
- `(dashboard)/auth/[sign-in]/page.tsx`: This will only catch url like: `base_url/auth/sign-in`, not `base_url/auth/sign-in/hello/123`

```ts
const SignInPage = ({ params }: { params: { 'sign-in': string } }) => {
  console.log(params);
  return <div>SignInPage</div>;
};
export default SignInPage;
```
This will give 404 error, page not found.

- To catch everything after that without error: `(dashboard)/auth/[...sign-in]/page.tsx`: Now, the 404 page error will be gone for `base_url/auth/sign-in/hello/123`. \
 Params will be: [sign-in, hello, 123] \

But, we have to have page.tsx in both auth folder and child folders

- To remove the above problem: 
  - Remove page.tsx from parent folder, in this case auth folder 
  - Add two square brackets, so folder will look like: `[[...sign-in]]`

- [...folder] - Catch-all route segment
- [[...folder]] Optional catch-all route segment (used by Clerk)




## Server Actions

- Modify stuff on a server directly from our component, it effectively eliminates the need to set up your own server.
- typically whenever we want to modify something on a server, approach is:
  - for example, set up the form, prevent the default, and then use the JavaScript to handle all the logics.
  - Make some request (post/delete etc.) back to the API, wait for response and depending on that response, do something.
- In this case, we won't have to do that whole prevent default thing.
---------------------------------------------------------------------------------------------------------------------------------------

- asynchronous server functions that can be called directly from your components.
- typical setup for server state mutations (create, update, delete)
  - endpoint on the server (api route on Next.js)
  - make request from the front-end
    - setup form, handle submission etc
- Next.js server actions allow you to mutate server state directly from within a React component by defining server-side logic alongside client-side interactions.

RSC - React Server Component \
RCC - React Client Component \

**Rules**:
- must be async
- add 'use server' in function body (only in RSC)
- can use in RCC but only as import


```tsx
export default function ServerComponent() {
  async function myAction(formData) {
    'use server';
    // access input values with formData
    // formData.get('name')
    // mutate data (server)
    // revalidate cache
  }

  return <form action={myAction}>...</form>;
}
```

- or setup in a separate file ('use server' at the top)
  - can use in both (RSC and RCC)

utils/actions.js

```tsx
'use server';

export async function myAction() {
  // ...
}
```

```tsx
'use client';

import { myAction } from './actions';

export default function ClientComponent() {
  return (
    <form action={myAction}>
      <button type='submit'>Add to Cart</button>
    </form>
  );
}
```