// Static Site Generation (SSG)

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