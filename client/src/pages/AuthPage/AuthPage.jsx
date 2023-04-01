import styles from './auth-page.module.css'
import {SiOverleaf} from 'react-icons/si'
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import { gsap } from "gsap";
import Circle from "../../components/Circle/Circle";

export const AuthPage = () => {
    const [isRegistration, setIsRegistration] = useState(true);
    const circleRefs = useRef([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // reset on re-renders
    circleRefs.current = [];

    useEffect(() => {
        const { innerWidth, innerHeight } = window;
        circleRefs.current.forEach(ref => ref.moveTo(innerWidth / 2, innerHeight / 2));

        const onMove = ({ clientX, clientY }) => {
            circleRefs.current.forEach(ref => ref.moveTo(clientX, clientY));
        };

        window.addEventListener("pointermove", onMove);

        return () => window.removeEventListener("pointermove", onMove);
    }, []);

    const addCircleRef = ref => {
        if (ref) {
            circleRefs.current.push(ref);
        }
    };


    const clickSwitch = () => {
        setIsRegistration(!isRegistration)
        setEmail('')
        setPassword('')
    }




    return (
        <>
            <Circle size={'sm'} ref={addCircleRef} delay={0} />
            <Circle size={'md'} ref={addCircleRef} delay={0.1} />
            <Circle size={'lg'} ref={addCircleRef} delay={0.2} />
            <div className={styles.bg}></div>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <div >
                        <SiOverleaf size={"3.5em"} color={"#28a92b"}/>
                    </div>
                    <div className={styles.logoText}>
                        <div>Eco.</div>
                        <div>Life.</div>
                        <div>Style.</div>
                    </div>
                </div>
                <div className={styles.title}>
                    {
                        isRegistration ? "Присоедениться к нам" : "С возвращанием!"
                    }
                </div>
                <div className={styles.form}>
                    <input className={styles.input}
                           type="text"
                           placeholder={"Email..."}
                           onChange={e=>setEmail(e.target.value)}
                           value={email}
                    />
                    <input className={styles.input}
                           type="password"
                           placeholder={"Password..."}
                           onChange={e=>setPassword(e.target.value)}
                           value={password}
                    />
                    <button className={styles.submitBtn}>
                        {
                            isRegistration ? "Зарегистрироваться" : "Войти"
                        }
                    </button>
                </div>
                <div className={styles.line}><p></p></div>
                <button className={styles.switchBtn}
                        onClick={clickSwitch}>
                    {
                        isRegistration ? "Уже есть аккаунт?" : "Создать аккаунт->"
                    }
                </button>
            </div>
        </>
    )
}