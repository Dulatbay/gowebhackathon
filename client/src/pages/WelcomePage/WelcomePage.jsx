import {gsap, ScrollTrigger} from 'gsap/all'
import {useEffect} from "react";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export const WelcomePage = () => {
    const navigate = useNavigate();
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
                        <img data-speed=".6" className="hero" src="/images/img6.jpg" alt="alt"/>
                        <div className="container">
                            <div data-speed=".75" className="main-header">
                                <h1 className="main-title">Eco Life Style</h1>
                            </div>
                        </div>
                    </header>
                    <div className="portfolio">
                        <div className="container">
                            <div className="gallery">
                                <div data-speed=".9" className="gallery__left">
                                    <img className="gallery__item" src="/images/img2.jpg" alt="alt"/>
                                    <div className="text-block gallery__item">
                                        <h2 className="text-block__h"></h2>
                                        <p className="text-block__p"></p>
                                    </div>
                                    <div className="text-block gallery__item">
                                        <h2 className="text-block__h">У нас вы найдете</h2>
                                        <p className="text-block__p">Cтатьи и советы
                                            об устойчивом потреблении, энергосбережении, сортировке и переработке отходов, использовании экологически чистых материалов и продуктов, а также о других важных
                                            аспектах экологической жизни.
                                            В целом, сайт "EcoLifestyle" направлен на то,
                                            чтобы помочь люди помогали друг другу понять важность экологического мышления
                                            и действий в повседневной жизни, а также дать им возможность принимать осознанные
                                            решения в пользу окружающей среды и сохранения природных
                                            ресурсов для будущих поколений. </p>
                                    </div>
                                    <img className="gallery__item" src="/images/img8.jpg" alt="alt"/>
                                </div>
                                <div data-speed="1.1" className="gallery__right">
                                    <div className="text-block gallery__item">
                                        <h2 className="text-block__h">Для кого наш сайт?</h2>
                                        <p className="text-block__p">Наш сайт ориентирован на пользователей, которые хотят внести изменения в свою жизнь и сделать ее более экологичной.</p>
                                    </div>
                                    <img className="gallery__item" src="/images/img1.jpg" alt="alt"/>
                                    <img className="gallery__item" src="/images/img7.jpg" alt="alt"/>

                                    <div className="text-block gallery__item">
                                        <h2 className="text-block__h">Создавай посты, выкладывай истории, делись рецептами, делай события</h2>
                                        <p className="text-block__p">Прямо как социальная сеть, но нет,
                                            ведь у нас только достоверная информация о развитии жизни человека в хорошую сторону.
                                            О безопасности можете не волноваться, наши модераторы и админы тщатильно проверяют допускаемость каждого контента
                                            Также у нас вы можете создать свой брэнд и продвигать его, зарабатывая нашу валюта сайта, так называемые - Листики.
                                            За них вы можете купить продукты в нашем встроенным магазине. К сожалению, на сайте на данный момент не доступен интерфейсная для реализации своих многих должностей, которые уже были созданы на серваре.
                                        </p>
                                    </div>
                                    <div>
                                        <Button className={"btn-outline-light"} variant={'outline-light'} onClick={()=>{navigate('/auth')}}>Начать сейчас!</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}