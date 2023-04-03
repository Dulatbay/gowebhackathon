import { useState, useEffect } from 'react';
import { Pagination } from 'react-bootstrap';
import Blog from '../Blog/Blog';
import BlogService from "../../services/BlogService";
import styles from "./Blogs.module.css";

export const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt');
    const blogsPerPage = 3;
    console.log(1)
    useEffect(() => {
        const fetchBlogs =  () => {
           BlogService.fetchWithParams(currentPage, blogsPerPage, `-${sortBy}`).then(r=>{
               setBlogs(r.data.blogs);
               setTotalPages(r.data.totalPages);
           });
        };
        window.scrollTo({ top: 0, behavior: 'smooth' });
        fetchBlogs();
    }, [currentPage, sortBy]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleSortChange = (event) => setSortBy(event.target.value);

    return (
        <div className={styles.blogs}>
            <h1>Blogs</h1>
            <select value={sortBy} onChange={handleSortChange} className={styles.select}>
                <option value="createdAt">Newest</option>
                <option value="likes">Most Liked</option>
                <option value="views">Most Viewed</option>
            </select>
            {blogs.map((blog) => (
                <Blog key={blog._id} blog={blog} />
            ))}
            <Pagination className="justify-content-center">
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};


