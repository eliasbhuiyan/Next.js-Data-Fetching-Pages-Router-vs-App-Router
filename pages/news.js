// Server-Side Rendering (SSR)

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