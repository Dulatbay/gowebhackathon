import React from 'react';
import {Card, Button, Image} from 'react-bootstrap';
import {AiOutlineHeart, AiOutlineComment, AiFillHeart} from "react-icons/ai";
import {FaShare} from "react-icons/fa";

const Blog = ({blog}) => {
    return (
        <Card>
            <Card.Header>
                <Image src={blog.authors[0].image} roundedCircle className="mr-3"/>
                <span>{blog.authors[0].username}</span>
            </Card.Header>
            {blog.images.length > 0 && (
                <div className="post-images">
                    {blog.images.map((image) => (
                        <Card.Img key={blog.image} src={blog.image}/>
                    ))}
                </div>
            )}
            <Card.Header>
                {blog.title}
            </Card.Header>
            <Card.Body>
                <div dangerouslySetInnerHTML={{__html: blog.content}}/>
            </Card.Body>
            <Card.Footer className={}>
                <Button variant="light">
                    {<AiFillHeart/>} {blog.likes?.length}
                </Button>
                <Button variant="light">
                   <AiOutlineComment /> {blog.comments?.length}
                </Button>
                <Button variant="light">
                    <FaShare /> {blog.shares?.length}
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default Blog;
