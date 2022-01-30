import {DateTime as DT} from 'luxon';
import {useEffect, useState} from 'react';
export const Card = ({
  title,
  descriptionText,
  RSVP,
  limit,
  hash,
  startDateTime,
  type,
  by,
}: {
    title: string
    descriptionText?: string
    RSVP?: number
    limit?: number
    hash?: string
    startDateTime?: string
    type:string
    by: string
  },
) => {
  const [prettyDate, setPrettyDate] = useState<{
    date: string,
    month: string,
    time: string
  }>({
    date: DT.now().toFormat('dd'),
    month: DT.now().toFormat('LLL'),
    time: DT.now().toFormat('hh: mm a'),
  });
  const [seats, setSeats] = useState<{
    available: number,
    total: number,
    noLimit: boolean
  }>({
    available: 0,
    total: 0,
    noLimit: true,
  });
  useEffect(() => {
    if (!startDateTime) return;
    const d = DT.fromISO(startDateTime);
    setPrettyDate({
      date: d.toFormat('dd'),
      month: d.toFormat('LLL'),
      time: d.toFormat('hh: mm a'),
    });
  }, [startDateTime]);
  useEffect(() => {
    if (limit === 0) {
      setSeats({
        available: 0, total: 0, noLimit: true,
      });
    };
    setSeats({
      available: Number(limit) - Number(RSVP),
      total: Number(limit),
      noLimit: false,
    });
  }, [RSVP, limit]);
  return (
    <div className={`
        lg:w-80
        lg:h-80
        sm:w-64
        sm:h-64
        m-4 sm:m-0
        rounded-lg
        ${type === 'guild' && `bg-kernel-bright`}
        ${type === 'junto' && `bg-kernel`}
        hover:shadow-kernel
        transition-shadow
        duration-300
        ease-in-out
        cursor-pointer
        text-primary-muted
        p-4 flex flex-col
      `}>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col justify-start">
          <div className='font-secondary uppercase lg:text-base sm:text-sm text-xxs'>
            {type}
          </div>
          <div className='font-heading lg:text-3xl sm:text-2xl text-base'>
            {title}
          </div>
          <div className='font-primary lg:text-sm sm:text-xs text-xxs'>
            {by}
          </div>
        </div>
        <div className="flex flex-col items-center font-secondary place-self-center">
          <div className='lg:text-xl sm:text-base text-xxs'>
            {prettyDate.date}, {prettyDate.month}
          </div>
          <div className='lg:text-sm sm:text-xs text-xxs'>
            {prettyDate.time}
          </div>
        </div>
      </div>
      <div className='
        grow
        flex
        flex-row
        items-center
        font-primary
        text-xxs
        sm:text-sm
        lg:text-base
        py-3'>
        <div>
          {
            descriptionText &&
          (
          descriptionText?.length > 150 ?
          descriptionText?.substring(0, 150)+'...' :
          descriptionText)
          }
        </div>
      </div>
      {
        !seats.noLimit &&
        <div className='font-primary font-thin lg:text-base text-sm'>
          <span>
            {seats.available} / {seats.total}
          </span>
          <span className='lg:text-sm text-xs'>
            &nbsp;seats available
          </span>
        </div>
      }
    </div>
  );
};
