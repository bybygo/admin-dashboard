import React, { useState } from 'react';

import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import {
  Agenda,
  Day,
  DragAndDrop,
  Inject,
  Month,
  Resize,
  ScheduleComponent,
  View,
  ViewDirective,
  ViewsDirective,
  Week,
  WorkWeek,
} from '@syncfusion/ej2-react-schedule';

import { Header } from '@/components';
import { scheduleData } from '@/data/dummy';

interface ScheduleProps {
  [key: string]: any;
}

const PropertyPane: React.FC<ScheduleProps> = (props) => {
  return <div className="mt-5">{props.children}</div>;
};

const Calendar = () => {
  const [scheduleObj, setScheduleObj] = useState<ScheduleComponent | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const change = (args: { value: Date }) => {
    try {
      if (scheduleObj && args.value) {
        setCurrentDate(args.value);
        scheduleObj.selectedDate = args.value;
        scheduleObj.dataBind();
      }
    } catch (error) {
      console.error('Error updating calendar date:', error);
    }
  };

  const onDragStart = (arg: { event: { target: HTMLElement } }) => {
    try {
      if (arg.event && arg.event.target) {
        arg.event.target.classList.add('e-selected');
      }
    } catch (error) {
      console.error('Error on drag start:', error);
    }
  };

  return (
    <div className="dark:bg-secondary-dark m-2 mt-16 rounded-3xl bg-white p-2 md:m-10 md:p-10">
      <Header category="Page" title="Calendar" />
      <ScheduleComponent
        width="100%"
        height="650px"
        ref={(schedule) => setScheduleObj(schedule)}
        selectedDate={currentDate}
        eventSettings={{
          dataSource: scheduleData,
          fields: {
            id: 'Id',
            subject: { name: 'Subject', title: 'Event Name' },
            location: { name: 'Location' },
            description: { name: 'Description' },
            startTime: { name: 'StartTime' },
            endTime: { name: 'EndTime' },
          },
        }}
        dragStart={onDragStart}
        showQuickInfo={true}
        timeScale={{ enable: true, interval: 60, slotCount: 2 }}
        workHours={{ highlight: true, start: '09:00', end: '18:00' }}
      >
        <ViewsDirective>
          {['Day', 'Week', 'WorkWeek', 'Month', 'Agenda'].map((item) => (
            <ViewDirective key={item} option={item as View} />
          ))}
        </ViewsDirective>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda, Resize, DragAndDrop]} />
      </ScheduleComponent>
      <PropertyPane>
        <div className="mt-5">
          <DatePickerComponent
            value={currentDate}
            showClearButton={false}
            placeholder="Current Date"
            floatLabelType="Always"
            change={change}
            format="dd/MM/yyyy"
            width="100%"
          />
        </div>
      </PropertyPane>
    </div>
  );
};

export default Calendar;
