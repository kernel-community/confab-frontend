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
  const [isPast, setIsPast] = useState<boolean>(false);
  const [seats, setSeats] = useState<{
    available: number,
    total: number,
  }>({
    available: 0,
    total: 0,
  });
  useEffect(() => {
    if (!startDateTime) return;
    const d = DT.fromISO(startDateTime);
    setPrettyDate({
      date: d.toFormat('dd'),
      month: d.toFormat('LLL'),
      time: d.toFormat('hh: mm a'),
    });
    if (d.diffNow().milliseconds < 0) setIsPast(true);
  }, [startDateTime]);
  useEffect(() => {
    if (limit === 0) {
      setSeats({
        available: 0, total: 0,
      });
    };
    setSeats({
      available: Number(limit) - Number(RSVP),
      total: Number(limit),
    });
  }, [RSVP, limit]);
  return (
    <div className={`
        lg:w-72
        lg:h-62
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
      <div className="flex flex-row justify-between w-full gap-3">
        <div className="flex flex-col justify-start">
          <div className='font-secondary uppercase lg:text-sm sm:text-xs text-xxs'>
            {type}
          </div>
          <div className='
            font-heading
            lg:text-2xl
            sm:text-xl
            text-base
          '>
            {
              title.replace(/\s/g, '').length < 45 ? title : title.substring(0, 45) + '...'
            }
          </div>
          <div className='font-primary lg:text-sm sm:text-xs text-xxs'>
            {by}
          </div>
        </div>
        <div className="flex flex-col items-center font-secondary place-self-center shrink-0">
          <div className='lg:text-lg sm:text-base text-xxs'>
            {prettyDate.date}, {prettyDate.month}
          </div>
          <div className='2xl:text-sm sm:text-xs text-xxs'>
            {prettyDate.time}
          </div>
        </div>
      </div>
      <div className='
        flex
        flex-row
        grow
        items-center
        font-primary
        text-xxs
        sm:text-sm
        lg:text-base
        my-4
      '>
        <div>
          {
            descriptionText &&
            (
              descriptionText?.length > 100 ?
              descriptionText?.substring(0, 80)+'...' :
              descriptionText
            )
          }
        </div>
      </div>
      {
        seats.available > 0 &&
        !isPast &&
        <div className='font-primary font-thin lg:text-base text-sm'>
          <span>
            {seats.available} / {seats.total}
          </span>
          <span className='lg:text-sm text-xs'>
            &nbsp;seats available
          </span>
        </div>
      }
      {seats.available <= 0 && <div></div>}
    </div>
  );
};
