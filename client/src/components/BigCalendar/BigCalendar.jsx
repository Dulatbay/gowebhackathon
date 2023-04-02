import React, {useState} from 'react';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import {parseISO} from "date-fns";
import moment from 'moment';
import styles from './big-calendar.module.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {useNavigate} from "react-router-dom";

// русские настройки для календаря
const messages = {
    allDay: 'Весь день',
    previous: 'Назад',
    next: 'Вперед',
    today: 'Сегодня',
    month: 'Месяц',
    week: 'Неделя',
    day: 'День',
    agenda: 'Список',
    date: 'Дата',
    time: 'Время',
    event: 'Событие',
    noEventsInRange: 'В этом промежутке времени нет событий.',
};

const localizer = momentLocalizer(moment);

const BigCalendar = ({events}) => {
    const navigate = useNavigate()

    const eventsData = (events.map((event) => {
        return {
            title: event.title,
            start: parseISO(event.eventAt),
            end: parseISO(event.eventAt),
            allDay: true,
            id: event._id
        }
    }));

    const handleSelectEvent = ({start, end, id}) => {
        navigate(`/events/${id}`)
    };

    const handleSelectSlot = (event) =>{
        // todo: create event

    }
    return (< div
        className={styles.bigCalendar}>
        < Calendar
            views={["day", "agenda", "work_week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={eventsData}
            style={{ height: "100vh" }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
        />
    </div>)
}

export default BigCalendar;
