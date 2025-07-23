// Server-Side Rendering (SSR)
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