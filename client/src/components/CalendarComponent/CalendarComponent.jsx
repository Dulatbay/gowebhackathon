import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = () => {
    const [date, setDate] = useState(new Date());
    const [importantDates, setImportantDates] = useState([
        new Date(2023, 2, 25),
        new Date(2023, 2, 27),
        new Date(2023, 3, 1)
    ]);

    const tileClassName = ({ date }) => {
        const dateObj = importantDates.find((d) => d.getTime() === date.getTime());
        return dateObj ? 'important-date' : null;
    };

    return (
        <div className="App">
            <Calendar value={date} onChange={setDate} tileClassName={tileClassName} />
        </div>
    );
};

export default CalendarComponent;
