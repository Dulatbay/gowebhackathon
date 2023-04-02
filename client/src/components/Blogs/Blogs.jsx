import Blog from "../Blog/Blog";

export const Blogs = ({blogs}) => {
    return (
        <>
            {blogs && blogs.map((blog, i) => <Blog blog={blog} key={i}/>)}
        </>
    )
}