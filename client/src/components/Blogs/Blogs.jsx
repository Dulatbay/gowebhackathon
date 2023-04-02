import Blog from "../Blog/Blog";
import BlogForm from "../BlogForm/BlogForm";

export const Blogs = ({blogs}) => {
    return (
        <>
            {blogs && blogs.map((blog, i) => <Blog blog={blog} key={i}/>)}
            <BlogForm />

        </>
    )
}