import {gsap, ScrollTrigger} from 'gsap/all'
import {useEffect} from "react";
import {Button} from "react-bootstrap";

export const WelcomePage = () => {

    gsap.registerPlugin(ScrollTrigger);
    useEffect(() => {


        gsap.fromTo('.hero-section', {
            opacity: 1
        }, {
            opacity: "0",
            scrollTrigger: {
                trigger: '.hero-section',
                start: -20,
                scrub: true
            }
        })

        const itemsLeft = gsap.utils.toArray('.gallery__left .gallery__item')

        itemsLeft.forEach(item => {
            gsap.fromTo(item, {
                opacity: 0,
                x: -150
            }, {
                start: -850,
                end: 150,
                x: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: item,
                    scrub: true
                }
            })
        })

        const itemsRight = gsap.utils.toArray('.gallery__right .gallery__item')

        itemsRight.forEach(item => {
            gsap.fromTo(item, {
                opacity: 0,
                x: 150
            }, {
                start: '-850',
                end: '-150',
                x: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: item,
                    scrub: true
                }
            })
        })
    }, [])


    return (
        <div className={"welcome-page"}>
            <div className="wrapper">
                <div className="content">
                    <header className="hero-section">
                        <img data-speed=".6" className="hero" src="/images/img1.jpg" alt="alt"/>
                        <div className="container">
                            <div data-speed=".75" className="main-header">
                                <h1 className="main-title">creative scroll</h1>
                            </div>
                        </div>
                    </header>
                    <div className="portfolio">
                        <div className="container">
                            <div className="gallery">
                                <div data-speed=".9" className="gallery__left">
                                    <img className="gallery__item" src="/images/img1.jpg" alt="alt"/>
                                    <img className="gallery__item" src="/images/img1.jpg" alt="alt"/>
                                    <div className="text-block gallery__item">
                                        <h2 className="text-block__h">Creative floating scroll with amazing
                                            parallax effect</h2>
                                        <p className="text-block__p">Lorem Ipsum is simply dummy text of the
                                            printing and typesetting industry. Lorem Ipsum has been the
                                            industry's standard dummy text ever since the 1500s, when an unknown
                                            printer took a galley of type and scrambled it to make a type
                                            specimen book.</p>
                                    </div>
                                    <img className="gallery__item" src="/images/img1.jpg" alt="alt"/>
                                </div>
                                <div data-speed="1.1" className="gallery__right">
                                    <div className="text-block gallery__item">
                                        <h2 className="text-block__h">Creative floating scroll with amazing parallax
                                            effect</h2>
                                        <p className="text-block__p">Lorem Ipsum is simply dummy text of the printing
                                            and typesetting industry. Lorem Ipsum has been the industry's standard dummy
                                            text ever since the 1500s, when an unknown printer took a galley of type and
                                            scrambled it to make a type specimen book.</p>
                                    </div>
                                    <img className="gallery__item" src="/images/img1.jpg" alt="alt"/>
                                    <img className="gallery__item" src="/images/img1.jpg" alt="alt"/>
                                    <img className="gallery__item" src="/images/img1.jpg" alt="alt"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="buttons">
                        <Button>Начать сейчас!</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}