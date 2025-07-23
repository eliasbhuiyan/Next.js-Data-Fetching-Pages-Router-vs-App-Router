# 📘 Next.js Data Fetching: Pages Router vs App Router

This documentation explains the four primary data fetching methods in Next.js — **SSG, SSR, ISR, and CSR** — and how they work in both the **Pages Router** and the **App Router** (Next.js 13+).


- ✅ SSG (Static Site Generation)
- ✅ SSR (Server-Side Rendering)
- ✅ ISR (Incremental Static Regeneration)
- ✅ CSR (Client-Side Rendering)

Each method has its own use case depending on how dynamic your content is and where the data fetching should occur (server vs client).

---

## 🔑 What is SSG, SSR, ISR, and CSR?

| Method | Full Form | Render Time | Where Rendered | Good For |
|--------|-----------|-------------|----------------|----------|
| **SSG** | Static Site Generation | At build time | Server | Public blogs, docs |
| **SSR** | Server-Side Rendering | On every request | Server | Auth-based dashboard |
| **ISR** | Incremental Static Regeneration | On-demand after N seconds | Server | Medium-dynamic content |
| **CSR** | Client-Side Rendering | After page load | Browser (Client) | User dashboards, real-time apps |

---


## ✅ 1. Static Site Generation (SSG)

**Static Site Generation (SSG)** means the HTML for your page is **generated at build time** and **served as a static file** to users.

### 🔹 How it works: 

- Runs **at build time**
- Generates HTML and caches it via CDN
- Extremely fast and SEO-friendly

## 🔹 Example: 🧭 Pages Router (`pages/` directory)

```jsx
// pages/blogs.js

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/blogs');
  const blogs = await res.json();

  return {
    props: { blogs },
  };
}

export default function Blogs({ blogs }) {
  return (
    <div>
      <h1>Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog.id}>{blog.title}</div>
      ))}
    </div>
  );
}
```
## 🔹 Example: 🧪 App Router (app/ directory)

### ✅ SSG (Default behavior)

```jsx
// app/blogs/page.tsx

async function getBlogs() {
  const res = await fetch('https://api.example.com/blogs');
  return res.json();
}

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div>
      <h1>SSG Blogs</h1>
      {blogs.slice(0, 5).map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}

```
### 🔹 When to use:

- Static content like blogs, docs, or landing pages
- Best when the content doesn’t change frequently

###
-------------------------------------------------------------

## ✅ 2. Server-Side Rendering (SSR)

***Server-Side Rendering (SSR)*** generates the HTML on ***every request*** at runtime on the server.

### 🔹 How it works:

- Runs on ***every page load***
- Provides fresh, dynamic content
- Slightly slower than SSG

## 🔹 Example: 🧭 Pages Router (pages/ directory)

```jsx
// pages/news.js

export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/news');
  const news = await res.json();

  return {
    props: { news },
  };
}

export default function News({ news }) {
  return (
    <div>
      <h1>News</h1>
      {news.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  );
}
```
## 🔹 Example: 🧪 App Router (app/ directory)

### ✅ SSR using cache: 'no-store'

```jsx
// app/news/page.tsx

async function getNews() {
  const res = await fetch('https://api.example.com/news', {
    cache: 'no-store',
  });
  return res.json();
}

export default async function NewsPage() {
  const news = await getNews();

  return (
    <div>
      <h1>SSR News</h1>
      {news.slice(0, 5).map((n) => (
        <p key={n.id}>{n.body}</p>
      ))}
    </div>
  );
}


```
### 🔹 When to use:

- Content changes often
- Personalized or user-specific pages (e.g., dashboards)
- SEO is important

###
-------------------------------------------------------------

## 🔁 3. Incremental Static Regeneration (ISR)

***ISR*** allows you to use static generation with the ability to ***update content after deployment*** at a specified interval.

### 🔹 How it works:

- Uses ***getStaticProps*** like SSG
- Adds ***revalidate*** to re-fetch and regenerate the static page

## 🔹 Example: 🧭 Pages Router (pages/ directory)

```jsx
// pages/posts.js

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 10, // Regenerate this page every 10 seconds
  };
}

```
## 🔹 Example: 🧪 App Router (app/ directory)

### ✅ ISR using next: { revalidate: N }

```jsx
// app/posts/page.tsx

async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 10 },
  });
  return res.json();
}

export default async function PostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <h1>ISR Posts</h1>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}

```
### 🔹 When to use:

- Dynamic data that can be updated periodically (e.g., product pages, news)
- Need for both speed and freshness

---

## ✅ 4. Client-Side Rendering (CSR)

***Client-Side Rendering (CSR)*** means the page is rendered in the ***browser after fetching data using JavaScript***. The initial HTML is empty or minimal, and data is loaded after the page is mounted.

### 🔹 How it works:

- Data is fetched inside ***useEffect()*** or similar hooks
- Runs ***only in the browser***

## 🔹 Example: 🧭 Pages Router (pages/ directory)

```jsx
// pages/profile.js
import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users/1')
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}


```

## 🔹 Example: 🧪 App Router (app/ directory)

### To use CSR, you must explicitly opt in by writing: `'use client'` at the top of the file, before any imports:

```jsx
// app/profile/page.tsx
'use client'

import { useEffect, useState } from 'react';

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('https://api.example.com/users/1')
      .then((res) => res.json())
      .then(setUser);
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}


```
### 🔹 When to use:

- Content does not need to be indexed by search engines
- Content is user-specific or requires authentication
- Highly interactive pages (e.g., dashboards, admin panels)

###

| Feature         | SSG                        | SSR                    | ISR                             | CSR                          |
| --------------- | -------------------------- | ---------------------- | ------------------------------- | ---------------------------- |
| Runs when?      | At build time              | On every request       | After build (on revalidate)     | In the browser (client-side) |
| HTML generation | Ahead of time              | On-demand server       | Ahead of time + scheduled regen | After page load (JS)         |
| Performance     | ⚡ Very fast                | ⏱️ Slower than SSG     | ⚡ Fast + Updated                | 🚀 Depends on network speed  |
| SEO support     | ✅ Yes                      | ✅ Yes                  | ✅ Yes                           | ❌ No                         |
| Use case        | Blogs, docs, landing pages | Auth pages, dashboards | News, products, semi-frequent   | Authenticated user areas     |
| API fetching    | At build time              | On request             | At build + revalidate           | In browser after mount       |

---

### 🔁 Pages Router vs App Router

| Feature     | Pages Router (Old)            | App Router (New)                   |
| ----------- | ----------------------------- | ---------------------------------- |
| SSG         | `getStaticProps()`            | `fetch()` in server component      |
| SSR         | `getServerSideProps()`        | `fetch()` with `cache: 'no-store'` |
| ISR         | `getStaticProps + revalidate` | `fetch()` with `revalidate`        |
| CSR         | `useEffect()`                 | `'use client'` + `useEffect()`     |
| Routing     | File-based `pages/`           | File-based `app/` + layouts        |
| Flexibility | Limited                       | Highly flexible (RSC, streaming)   |

### 🧠 Best Practices

| Use Case            | Best Option                 |
| ------------------- | --------------------------- |
| Blog, Docs          | ✅ SSG (fast & SEO)          |
| Authenticated pages | ✅ SSR or CSR                |
| Realtime data       | ✅ SSR or CSR                |
| Periodic updates    | ✅ ISR                       |
| User dashboards     | ✅ CSR (in client component) |


## 📎 References

- [Next.js Data Fetching Docs](https://nextjs.org/docs/app/building-your-application/data-fetching)

- [Pages Router Docs](https://nextjs.org/docs/pages/building-your-application/data-fetching)

- [App Router Guide](https://nextjs.org/docs/app)

## ✅ Conclusion

Both routers support all major rendering types, but the ***App Router*** is the future of Next.js development.

Use the ***Pages Router*** if:
- You want simplicity or backwards compatibility.

Use the ***App Router*** if:
- You want powerful, modern features like React Server Components and streaming.

---

# 🙌 Happy Coding with Next.js!
