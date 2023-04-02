import React, {useContext, useEffect, useState} from 'react';
import {Card, Button, Image} from 'react-bootstrap';
import {AiOutlineHeart, AiOutlineComment, AiFillHeart} from "react-icons/ai";
import {MdAccountCircle} from 'react-icons/md'
import {FaShare} from "react-icons/fa";
import styles from './blog.module.css'
import $api, {API_URL} from "../../http";
import {Context} from "../../index";
import BlogService from "../../services/BlogService";
import {observer} from "mobx-react-lite";

const Blog = ({blog}) => {
    const [isBasicallyLicked, setIiBasicallyLicked] = useState(0);
    const [isCurrentLicked, setIsCurrentLicked] = useState(0);
    const {store} = useContext(Context)
    const [isSubmitted, setIsSubmitted] = useState(0);
    useEffect(() => {
        setIiBasicallyLicked(blog.likes.includes(store.user.id))
    }, [])

    useEffect(() => {
        setIsCurrentLicked(isBasicallyLicked)
    }, [isBasicallyLicked])


    const likeClick = (e) => {
        if (!isSubmitted) {
            console.log(isCurrentLicked)
            if (!isCurrentLicked) {
                BlogService.fetchOnAddLike(blog._id).then(res => {
                    if (res.status === 200) setIsCurrentLicked(1)

                }).finally(() => {
                    setIsSubmitted(0)
                });
            } else {
                BlogService.fetchOnRemoveLike(blog._id).then(res => {
                    if (res.status === 200) setIsCurrentLicked(0)
                }).finally(() => {
                    setIsSubmitted(0)
                });
            }
            setIsSubmitted(1)
        }
    }

    return (
        <Card className={styles.card}>
            <Card.Header className={styles.header}>
                <div className={styles.headerLeft}>
                    {blog.authors[0]?.image ? <Image src={blog.authors[0].image} roundedCircle className="mr-3"/> :
                        <MdAccountCircle size={"2.4em"}/>}
                    <span>{!blog.authors[0]?.username ? blog.authors[0]?.email : blog.authors[0]?.username}</span>
                </div>
                <div className={styles.headerRight}>
                        <span>...</span>
                </div>

            </Card.Header>
            {blog.images.length > 0 && (
                <div className="post-images">
                    {blog.images.map((image, index) => (
                        <Card.Img key={index} src={`${API_URL}/static/${image}`}/>
                    ))}
                </div>
            )}
            <Card.Header className={styles.title}>
                {blog.title}
            </Card.Header>
            <Card.Body>
                <div dangerouslySetInnerHTML={{__html: blog.content}}/>
            </Card.Body>
            <Card.Footer className={styles.footer}>
                <div className={styles.footerLeft}>
                    <Button variant="light"
                            className={styles.like}
                            onClick={likeClick}
                    >
                        {
                            isCurrentLicked ?
                                <AiFillHeart/> : <AiOutlineHeart/>
                        }

                        {blog.likes?.length - (isBasicallyLicked - isCurrentLicked)}
                    </Button>
                    <Button variant="light" className={styles.comments}>
                        <AiOutlineComment/> {blog.comments?.length}
                    </Button>
                    <Button variant="light" className={styles.saves}>
                        <FaShare/> {blog?.saves?.length}
                    </Button>
                </div>
                <div className={styles.footerRight}>
                    <span>Брэндов поддерживают: {blog.supportBrands.length}</span>
                </div>
            </Card.Footer>
        </Card>
    );
};


export default observer(Blog);
