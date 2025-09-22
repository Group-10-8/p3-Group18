'use-strict';

class DatePicker{
    // Constructor for DatePicker
    constructor(id, onDateSelect) {
        this.id = id;
        this.onDateSelect = onDateSelect;
        this.currentDate - new Date();
    }

    // Helper function to create calendar header
    getCalendarHeader() {
        const date = this.currentDate;
        const month = date.getMonth();
        const year = date.getFullYear();

        const months = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

        const header = document.createElement('div');
        header.className = 'calendar-header';

        const prevButton = document.createElement('button');
        prevButton.className = 'nav-button';
        prevButton.innerHTML = '<';

        const nextButton = document.createElement('button');
        nextButton.className = 'nav-button';
        nextButton.innerHTML = '>';

        const monthYearText = document.createElement('p');
        monthYearText.className = 'month-year';
        monthYearText.innerText = `${months[month]} ${year}`;

        prevButton.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() - 1);
            this.render(this.currentDate);
        });

        nextButton.addEventListener('click', () => {
            this.currentDate.setMonth(this.currentDate.getMonth() + 1);
            this.render(this.currentDate);
        });

        header.appendChild(prevButton);
        header.appendChild(monthYearText);
        header.appendChild(nextButton);

        return header;
    }

    // Helper function to display the days of the week
    getWeekdayHeader() {
        const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

        const row = document.createElement('div');
        row.className = 'weekday-header';

        for (let i = 0; i < weekDays.length; i++) {
            const day = document.createElement('div');
            day.className = 'weekday-cell';
            day.innerText = weekDays[i];
            row.appendChild(day);            
        }

        return row
    }

    calculateCalendarDays(){
        const month = this.currentDate.getMonth(); 
        const year = this.currentDate.getFullYear();
        const firstDayIndex = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();

        let totalCells = firstDayIndex + daysInMonth;
        if (totalCells % 7 !== 0){
            totalCells += 7- (totalCells % 7);
        }

        const days = [];

        for (let i = 0; i < totalCells; i++) {
            let dayObj = {};

            if (i < firstDayIndex) {
                dayObj.day = daysInPrevMonth - firstDayIndex + i + 1;
                dayObj.dimmed = true;
            } else if (i < firstDayIndex + daysInMonth) {
                dayObj.day = i - firstDayIndex + 1;
                dayObj.dimmed = false;
                dayObj.current = true;
            } else {
                dayObj.day = i - (firstDayIndex + daysInMonth) + 1;
                dayObj.dimmed = true;
            }

            days.push(dayObj);
        }

        return days;
    }

    createCalendarGrid(days) {
        const daysGrid = document.createElement('div');
        daysGrid.className = 'days-grid-div';

        for (let i = 0; i < days.length; i++) {
            const dayNumber = days[i].day
            const dayDiv = document.createElement('div');

            if (days[i].dimmed === true) {
                dayDiv.className = 'day-div-dimmed';
            } else {
                dayDiv.className = 'day-div';
                dayDiv.addEventListener('click', () => {
                    this.onDateSelect(this.id, {
                        day: dayNumber,
                        month: this.currentDate.getMonth() + 1,
                        year: this.currentDate.getFullYear()
                    });
                });
            }

            dayDiv.innerText = dayNumber;
            daysGrid.appendChild(dayDiv);
        }

        return daysGrid;
    }

    // Render method to display one-month calendar
    render(date) {
        this.currentDate = date;

        const container = document.getElementById(this.id);
        container.innerHTML = '';
        
        const header = this.getCalendarHeader();
        container.appendChild(header);

        const weekDayRow = this.getWeekdayHeader();
        container.appendChild(weekDayRow);

        const days = this.calculateCalendarDays();
        const daysGrid = this.createCalendarGrid(days);
        container.appendChild(daysGrid);
    }
}