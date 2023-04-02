import React from 'react';
import {Card, Button, Image} from 'react-bootstrap';
import {AiOutlineHeart, AiOutlineComment, AiFillHeart} from "react-icons/ai";
import {MdAccountCircle} from 'react-icons/md'
import {FaShare} from "react-icons/fa";
import styles from './blog.module.css'
import {API_URL} from "../../http";

const Blog = ({blog}) => {
    return (
        <Card className={styles.card}>
            <Card.Header>
                {blog.authors[0]?.image ? <Image src={blog.authors[0].image} roundedCircle className="mr-3"/> :
                    <MdAccountCircle/>}
                <span>{!blog.authors[0]?.username ? blog.authors[0]?.email : blog.authors[0]?.username}</span>
            </Card.Header>
            {blog.images.length > 0 && (
                <div className="post-images">
                    {blog.images.map((image, index) => (
                        <Card.Img key={index} src={`${API_URL}/static/${image}`}/>
                    ))}
                </div>
            )}
            <Card.Header>
                {blog.title}
            </Card.Header>
            <Card.Body>
                <div dangerouslySetInnerHTML={{__html: blog.content}}/>
            </Card.Body>
            <Card.Footer className={styles.footer}>
                <Button variant="light">
                    {<AiFillHeart/>} {blog.likes?.length}
                </Button>
                <Button variant="light">
                    <AiOutlineComment/> {blog.comments?.length}
                </Button>
                <Button variant="light">
                    <FaShare/> {blog.shares?.length}
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default Blog;
