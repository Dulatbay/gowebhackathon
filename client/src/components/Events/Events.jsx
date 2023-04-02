import React, { useContext, useEffect, useState } from 'react';
import BigCalendar from '../BigCalendar/BigCalendar';
import styles from './events.module.css';
import EventService from '../../services/EventService';
import { Context } from '../../index';
import {Loader} from "../Loader/Loader";
const selectors = ['Популярные', 'Подписанные', 'Все'];

export const Events = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [events, setEvents] = useState(null);
    const { store } = useContext(Context);

    const getEvents = () => {
        if (activeIndex === 0) {
            const temp = [...events];
            if (temp.length < 15) {
                return temp;
            }
            return temp
                .sort((a, b) => a.likes.length > b.likes.length)
                .slice(0, 15);
        } else if (activeIndex === 1) {
            return events.filter((e) => e.followers.includes(store.user.id));
        } else if (activeIndex === 2) {
            return events;
        } else {
            return [];
        }
    };

    const selectorClick = (index) => {
        setActiveIndex(index);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await EventService.fetchAll();
            setEvents(result.data);
        };

        fetchData();
    }, []);
    if(!events) return <Loader />
    return (
        <div className={styles.events}>
            <div className={styles.selector}>
                {selectors.map((e, i) => (
                    <div
                        className={`${styles.selectorItem} ${
                            i === activeIndex ? styles.active : ''
                        }`}
                        onClick={() => selectorClick(i)}
                        key={i}
                    >
                        {e}
                    </div>
                ))}
            </div>
            <BigCalendar events={getEvents()} />
        </div>
    );
};
