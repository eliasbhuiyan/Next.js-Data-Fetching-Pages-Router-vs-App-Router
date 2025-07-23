// Incremental Static Regeneration (ISR)

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();

  return {
    props: { posts },
    revalidate: 10, // Regenerate this page every 10 seconds
  };
}