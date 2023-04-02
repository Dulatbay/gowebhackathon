import styles from './auth-page.module.css'
import {SiOverleaf} from 'react-icons/si'
import {useContext, useEffect, useRef, useState} from "react";
import Circle from "../../components/Circle/Circle";
import {Context} from "../../index";
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthPage = () => {
    const {store} = useContext(Context)

    const circleRefs = useRef([]);

    const navigate = useNavigate()

    const [isRegistration, setIsRegistration] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const [notifications, setNotifications] = useState([]);

    // reset on re-renders
    circleRefs.current = [];
    useEffect(() => {

        if (store.isAuth) {
            navigate(`/`);
        }

        const {innerWidth, innerHeight} = window;
        circleRefs.current.forEach(ref => ref.moveTo(innerWidth / 2, innerHeight / 2));

        const onMove = ({clientX, clientY}) => {
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

    const loginClick = () => [
        store.login(email, password).then(res => {
            if (res.status === 200) {
                navigate(`/`);
            } else {
                toast.error(res?.data?.message ? res.data.message : "Ошибка при валидации данных")
            }
        }).finally((r) => {
            setIsClicked(false);
        })
    ]


    const regClick = () => {
        store.registration(email, password).then(res => {
            if (res.status === 200) {
                navigate(`/`);
            } else {
                console.log(res?.data?.message);
                toast.error(res?.data?.message !== null ? res.data.message : "Ошибка при валидации")
            }
        }).finally(() => {
            setIsClicked(false);
        })
    }

    const submitButtonClick = () => {
        if (!isClicked) {
            setIsClicked(true)
            if (isRegistration) regClick()
            else loginClick()
        }

    }


    return (
        <>
            <ToastContainer position={"bottom-right"}/>
            <Circle size={'sm'} ref={addCircleRef} delay={0}/>
            <Circle size={'md'} ref={addCircleRef} delay={0.1}/>
            <Circle size={'lg'} ref={addCircleRef} delay={0.2}/>
            <div className={styles.bg}></div>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <div>
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
                           onChange={e => setEmail(e.target.value)}
                           value={email}
                    />
                    <input className={styles.input}
                           type="password"
                           placeholder={"Password..."}
                           onChange={e => setPassword(e.target.value)}
                           value={password}
                    />
                    <button className={styles.submitBtn}
                            onClick={submitButtonClick}>
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