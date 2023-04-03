import {useState, useEffect} from 'react';
import {Button, Pagination} from 'react-bootstrap';
import Blog from '../Blog/Blog';
import BlogService from "../../services/BlogService";
import styles from "./Blogs.module.css";
import {useNavigate} from "react-router-dom";

export const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [sortBy, setSortBy] = useState('createdAt');
    const blogsPerPage = 3;
    const navigate = useNavigate()
    useEffect(() => {
        const fetchBlogs = () => {
            BlogService.fetchWithParams(currentPage, blogsPerPage, `-${sortBy}`).then(r => {
                setBlogs(r.data.blogs);
                setTotalPages(r.data.totalPages);
            });
        };
        window.scrollTo({top: 0, behavior: 'smooth'});
        fetchBlogs();
    }, [currentPage, sortBy]);

    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
    const handleSortChange = (event) => setSortBy(event.target.value);

    return (
        <div className={styles.blogs}>
            <div className={styles.headerTools}>
                <div className="tools">
                    <h1>Blogs</h1>
                    <select value={sortBy} onChange={handleSortChange} className={styles.select}>
                        <option value="createdAt">Newest</option>
                        <option value="likes">Most Liked</option>
                        <option value="views">Most Viewed</option>
                    </select>
                </div>
                <div className="tools">
                    <Button variant={"outline-primary"} onClick={() => {
                        navigate('/blogs/create')
                    }
                    }>Create</Button>
                </div>
            </div>
            {blogs.map((blog) => (
                <Blog key={blog._id} blog={blog}/>
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


