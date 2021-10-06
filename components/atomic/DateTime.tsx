import Image from 'next/image';
import deleteIcon from '../../public/vectors/delete.png';
import {useState, useEffect} from 'react';
import {DateTime as DT} from 'luxon';

const leapYear = (year: number): boolean => {
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
};

const DateTime = ({
  count,
  displayDelete,
  handleChange,
  handleDelete,
  displaySessionLabel,
  sessionNumber,
  deleteSessionData,
}: {
  count: number,
  sessionNumber: number,
  displayDelete: boolean,
  handleChange:any,
  handleDelete?:any,
  displaySessionLabel: boolean
  deleteSessionData: any
}) => {
  const year = DT.local().get('year');
  const times = [
    {t: '7:00 AM', h: 7, m: 0},
    {t: '7:30 AM', h: 7, m: 30},

    {t: '8:00 AM', h: 8, m: 0},
    {t: '8:30 AM', h: 8, m: 30},

    {t: '9:00 AM', h: 9, m: 0},
    {t: '9:30 AM', h: 9, m: 30},

    {t: '10:00 AM', h: 10, m: 0},
    {t: '10:30 AM', h: 10, m: 30},

    {t: '11:00 AM', h: 11, m: 0},
    {t: '11:30 AM', h: 11, m: 30},

    {t: '12:00 PM', h: 12, m: 0},
    {t: '12:30 PM', h: 12, m: 30},

    {t: '1:00 PM', h: 13, m: 0},
    {t: '1:30 PM', h: 13, m: 30},

    {t: '2:00 PM', h: 14, m: 0},
    {t: '2:30 PM', h: 14, m: 30},

    {t: '3:00 PM', h: 15, m: 0},
    {t: '3:30 PM', h: 15, m: 30},

    {t: '4:00 PM', h: 16, m: 0},
    {t: '4:30 PM', h: 16, m: 30},

    {t: '5:00 PM', h: 17, m: 0},
    {t: '5:30 PM', h: 17, m: 30},

    {t: '6:00 PM', h: 18, m: 0},
    {t: '6:30 PM', h: 18, m: 30},

    {t: '7:00 PM', h: 19, m: 0},
    {t: '7:30 PM', h: 19, m: 30},

    {t: '8:00 PM', h: 20, m: 0},
    {t: '8:30 PM', h: 20, m: 30},

    {t: '9:00 PM', h: 21, m: 0},
    {t: '9:30 PM', h: 21, m: 30},

    {t: '10:00 PM', h: 22, m: 0},
    {t: '10:30 PM', h: 22, m: 30},

    {t: '11:00 PM', h: 23, m: 0},
    {t: '11:30 PM', h: 23, m: 30},
  ];
  const [dates, setDates] = useState<number[]>([]);
  const [months, setMonths] = useState<string[]>([
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ]);
  const returnDates = () : number[] => {
    const dates: number[] = [];
    for (let i = 1; i <= 31; i ++) {
      dates.push(i);
    }
    return dates;
  };
  const onlyValidMonthsAndDates = ({
    value, target,
  }: {
    value: string, target: 'date' | 'month'
  }) => {
    switch (target) {
      case 'date':
        if (value == '31') {
          setMonths([
            'Jan', 'Mar', 'May', 'Jul', 'Aug', 'Oct', 'Dec',
          ]);
        } else {
          setMonths([
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
          ]);
        }
        break;
      case 'month':
        if (value == '2') {
          const d: number = leapYear(year) ? 29 : 28;
          setDates(Array.from({length: d}, (v, k)=>k+1));
        } else if (value == '1' || value == '3' || value == '5' || value == '7' || value == '8' || value == '10' || value == '12') {
          setDates(Array.from({length: 31}, (v, k)=>k+1));
        } else {
          setDates(Array.from({length: 30}, (v, k)=>k+1));
        }
        break;
    }
  };
  useEffect(() => {
    setDates(() => returnDates());
  }, []);
  return (
    <div className={`
      flex flex-row gap-3 sm:flex-nowrap flex-wrap items-center py-4
    `}>
      {/* @todo */}
      {displaySessionLabel ? (<div className="text-xs text-inter font-medium text-gray-400">
        Session {sessionNumber}
      </div>) : <></>}
      <select name="date" id="" className="
        text-xs
        rounded-lg
        ring-gray-300 border-gray-300
        focus:border-primary focus:ring-primary
        font-inter font-medium text-primary
      "
      onChange={(e) => {
        onlyValidMonthsAndDates({value: e.target.value, target: 'date'});
        handleChange(count, e);
      }}
      required
      defaultValue="D"
      >
        <option value="D" disabled>D</option>
        {dates.map((d, k) => {
          return (<option key={k}>{d}</option>);
        })}
      </select>
      <select name="month" id="" className="
        text-xs
        rounded-lg
        ring-gray-300 border-gray-300
        focus:border-primary focus:ring-primary
        font-inter font-medium text-primary
      "
      onChange={(e) => {
        onlyValidMonthsAndDates({value: e.target.value, target: 'month'});
        handleChange(count, e);
      }}
      required
      defaultValue="M"
      >
        <option value="M" disabled>M</option>
        {months.map((m, k) => {
          return (<option key={k} value={k+1}>{m}</option>);
        })}
      </select>
      <select name="time" className="
        text-xs
        rounded-lg
        ring-gray-300 border-gray-300
        focus:border-primary focus:ring-primary
        font-inter font-medium text-primary
      "
      onChange={(e) => {
        handleChange(count, e);
      }}
      required
      defaultValue="T"
      >
        <option value="T" disabled>T</option>
        {times.map((t, k) => {
          return (<option key={k} value={`[${t.h}, ${t.m}]`}>{t.t}</option>);
        })}
      </select>
      {(displayDelete ?
      <div className="cursor-pointer justify-self-center">
        <Image
          src={deleteIcon}
          data-key={count}
          onClick={() => {
            handleDelete(count);
            deleteSessionData(count);
          }}
          height={'20px'}
          width={'15px'}
        />
      </div>: <div></div>)}
    </div>
  );
};

export default DateTime;
