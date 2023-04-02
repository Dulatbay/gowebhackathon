import Blog from "../Blog/Blog";

export const Blogs = ({blogs}) => {
    return (
        <>
            {blogs.map((blog, i) => <Blog blog={blog} key={i}/>)}
        </>
    )
}