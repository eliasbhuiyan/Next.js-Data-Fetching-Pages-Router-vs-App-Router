// Static Site Generation (SSG)
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
