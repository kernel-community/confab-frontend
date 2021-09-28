/* eslint-disable new-cap */
/* eslint-disable no-invalid-this */
import Image from 'next/image';
import personVector from '../../public/vectors/person.png';
import handVector from '../../public/vectors/hand.png';
import circlesVector from '../../public/vectors/circles.png';
import FieldLabel from '../form/FieldLabel';
import RsvpButton from './RsvpButton';
import {useState} from 'react';
import {Session as ClientSession} from '../../types';
import {DateTime} from 'luxon';

const isPast = (date: string): boolean => {
  const zone = DateTime.local().zoneName;
  const time = DateTime.fromISO(date, {zone});
  const now = DateTime.local();
  return now > time;
};
const getDateTimeString = (
    date: string, // iso string with offset
    option: 'date' | 'time',
): string => {
  const zone = DateTime.local().zoneName;
  const time = DateTime.fromISO(date, {zone});
  switch (option) {
    case 'date':
      return time.toFormat('d LLL, yyyy');
      break;
    case 'time':
      return time.toFormat('hh:mm a');
    default: return '';
  }
};

const Session = ({
  active,
  handleClick,
  data,
  date,
  time,
  availableSeats,
  totalSeats,
  noLimit,
}: {
  active: boolean
  handleClick: any
  data: number
  date: string
  time: string
  availableSeats?: number
  totalSeats?: number
  noLimit?:boolean
}) => {
  return (
    <label
      className={`
        ${active?
          `
            bg-primary-lighter text-primary
            hover:bg-primary-light cursor-pointer
          ` :
          'bg-gray-200 text-gray-500 cursor-not-allowed'}
        border-0
        rounded-xl
        text-center
        py-2
        font-inter 
        flex flex-row items-center justify-center
        gap-5
      `}
    >
      <input
        onChange={(e) => handleClick(data, e.target.checked)}
        disabled={!active}
        type="checkbox"
        className={`
          ${!active? `text-gray-500` : ``}
          p-2 rounded-md
          text-primary border-gray-300
          cursor-pointer
          focus:border-primary focus:ring-primary
        `}
      />
      <div
        className="flex flex-col gap-1"
      >
        <div className="text-sm">
          {`${date} at ${time}`}
        </div>
        {noLimit ? <></> : (<div
          className="
          flex flex-row items-center text-xs
          gap-1
        "
        >
          <Image
            src={handVector}
            width={'15px'}
            height={'15px'}
          />
          <FieldLabel
            styles={`${!active? 'text-primary-muted': ''}`}
          >
            {availableSeats}/{totalSeats} Seats
          </FieldLabel>
        </div>)}
      </div>
    </label>
  );
};

const RsvpForAllButton = ({
  handleClick,
}: {
  handleClick: any
}) => {
  return (
    <label
      className="
          bg-primary-light border-2
          border-primary
          rounded-xl
          text-center
          py-2
          font-inter text-primary
          hover:bg-primary-lighter cursor-pointer
          flex flex-row w-full justify-center items-center gap-3
        "
    >
      <input
        type="checkbox"
        onChange={(e) => handleClick(e.target.checked)}
        className="
          p-2 rounded-sm
          text-primary border-gray-300
          cursor-pointer
          focus:border-primary focus:ring-primary
        "
      />
      <div>
        RSVP for all Sessions
      </div>
    </label>
  );
};

const SessionsWrapper = ({sessions}: {sessions: ClientSession[]}) => {
  const [showSessions, setShowSessions] = useState<boolean>(true);
  const [toRsvp, setToRsvp] = useState<(number | undefined)[]>([]);
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState(false);
  const handleSessionSelect = (id:number, checked: boolean) => {
    switch (checked) {
      case true:
        setToRsvp([...toRsvp, id]);
        break;
      case false:
        setToRsvp(toRsvp.filter((r) => r!=id));
        break;
      default: '';
    }
  };
  const handleAllSessionsSelect = (checked: boolean) => {
    setShowSessions(!showSessions);
    switch (checked) {
      case true:
        setToRsvp(sessions.map((s) => s.id));
        break;
      case false:
        setToRsvp([]);
        break;
      default: '';
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    (await (await fetch('/api/rsvp', {
      body: JSON.stringify({rsvp: {email, events: toRsvp}}),
      method: 'POST',
      headers: {'Content-type': 'application/json'},
    })).json()).data;
    setLoading(false);
    setDone(true);
  };
  return (
    <>
      <div
        className="flex flex-col gap-3 mt-3"
      >
        {sessions.length > 1 ? (<RsvpForAllButton
          handleClick={handleAllSessionsSelect.bind(this)}
        />): <></>}
        {showSessions ? (
            sessions.map((session, key) => {
              return <Session
                active={(
                  session.noLimit ||
                  ((session.availableSeats! > 0) &&
                    !isPast(session.startDateTime!))
                )}
                handleClick={handleSessionSelect.bind(this)}
                key={key}
                data={session.id!}
                date={
                  getDateTimeString(session.startDateTime!, 'date')
                }
                time={
                  getDateTimeString(session.startDateTime!, 'time')
                }
                availableSeats={session.availableSeats!}
                totalSeats={session.totalSeats!}
                noLimit={session.noLimit}
              />;
            })
      ) : <></>}
      </div>
      <div className="
        mt-6
        flex flex-col gap-3
      ">
        {done ?
        (
          <FieldLabel>
            RSVP Recorded.
          </FieldLabel>
        ):
         (
           <>
             <input
               type="text"
               name="email"
               id="email"
               className={`
            rounded-lg
            ring-gray-300 border-gray-300
            focus:border-primary focus:ring-primary
            ${loading? `bg-gray-300` : ``}
          `}
               placeholder="email"
               onChange={(e)=>{
                 setEmail(e.target.value);
               }}
               disabled={loading}
             />
             <RsvpButton
               handleClick={handleSubmit.bind(this)}
               disabled={loading}
             />
           </>)}
      </div>

    </>
  );
};

const RsvpSection = ({
  proposerName,
  sessionsCount,
  sessions,
}: {
  proposerName: string,
  sessionsCount: number,
  sessions: ClientSession[]
}) => {
  return (
    <div
      className="
            p-12
            flex flex-col gap-2
          "
    >
      <div
        className="flex flex-row items-center gap-3"
      >
        <Image
          src={personVector}
        />
        <FieldLabel>
          {proposerName}
        </FieldLabel>
      </div>
      <div
        className="flex flex-row items-center gap-3"
      >
      </div>
      <div
        className="flex flex-row items-center gap-3"
      >
        <Image
          src={circlesVector}
        />
        <FieldLabel>
          {sessionsCount} Session{sessionsCount > 1 ? `s`:``}
        </FieldLabel>
      </div>
      <SessionsWrapper
        sessions={sessions}
      />

    </div>
  );
};

export default RsvpSection;
