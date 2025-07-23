// Incremental Static Regeneration (ISR)
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