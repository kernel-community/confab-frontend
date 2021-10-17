/* eslint-disable new-cap */
/* eslint-disable no-invalid-this */
import Image from 'next/image';
import personVector from '../../public/vectors/person.png';
import circlesVector from '../../public/vectors/circles.png';
import FieldLabel from '../atomic/StrongText';
import Button from '../atomic/Button';
import Text from '../atomic/Text';
import {useEffect, useState} from 'react';
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
      return time.toFormat('d LLL');
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
            bg-primary-muted 
            hover:bg-primary-dark cursor-pointer
          ` :
          'bg-gray-200 text-gray-500 cursor-not-allowed'}
        border-0
        rounded-xl
        text-center
        font-inter 
        flex flex-row items-center justify-left
        gap-1
      `}
    >
      <input
        onChange={(e) => handleClick(data, e.target.checked)}
        disabled={!active}
        type="checkbox"
        className={`
          ${!active? `text-gray-500` : ``}
          p-2 m-4 rounded-md
          text-primary border-gray-300
          cursor-pointer
          focus:border-primary focus:ring-primary
        `}
      />
      <div
        className="flex-1 flex flex-row gap-4 my-2 mx-1 font-inter text-skin-muted"
      >
        <div className="flex-1 text-sm uppercase text-left my-auto">
          {date}
          <div className='text-xs'>
            {time}
          </div>
        </div>

        {noLimit ?
        (
          <div className="text-xs my-auto mr-2">
            No seat limit
          </div>
        ) : (
          <div
            className="
            flex flex-col items-center text-sm justify-self-end
            gap-0 my-auto mr-4
          "
          >
            <div
              className={`${!active? 'text-primary-muted': ''}`}
            >
              {availableSeats}/{totalSeats}
            </div>
            <span className="text-xs">Seats</span>
          </div>
        )}
      </div>
    </label>
  );
};

// const RsvpForAllButton = ({
//   handleClick,
// }: {
//   handleClick: any
// }) => {
//   return (
//     <label
//       className="
//           bg-primary-light border-2
//           border-primary
//           rounded-xl
//           py-1
//           font-inter text-primary
//           hover:bg-primary-lighter cursor-pointer
//           flex flex-row w-full items-center gap-1 justify-items-start
//           uppercase
//           text-sm
//         "
//     >
//       <input
//         type="checkbox"
//         onChange={(e) => handleClick(e.target.checked)}
//         className="
//           p-2 m-4 rounded-sm
//           text-primary border-gray-300
//           cursor-pointer
//           focus:border-primary focus:ring-primary
//         "
//       />
//       <div className="flex-1">
//         RSVP for Entire Series
//       </div>
//     </label>
//   );
// };

const SessionsWrapper = ({
  sessions,
  email,
}: {
  sessions: ClientSession[]
  email?: string
}) => {
  const showSessions: boolean = true;
  // const [showSessions, setShowSessions] = useState<boolean>(true);
  const [toRsvp, setToRsvp] = useState<(number | undefined)[]>([]);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState(false);
  const [rsvpEmail, setRsvpEmail] = useState(email);
  useEffect(() => {
    if (toRsvp.length > 0) setDisableSubmit(false);
    else setDisableSubmit(true);
  }, [toRsvp]);
  const handleRsvpEmail = (e: any) => {
    setRsvpEmail(e.target.value);
  };
  const handleSessionSelect = (id: number, checked: boolean) => {
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
  // const handleAllSessionsSelect = (checked: boolean) => {
  //   setShowSessions(!showSessions);
  //   switch (checked) {
  //     case true:
  //       setToRsvp(sessions.map((s) => s.id));
  //       break;
  //     case false:
  //       setToRsvp([]);
  //       break;
  //     default: '';
  //   }
  // };
  const handleSubmit = async () => {
    setLoading(true);
    (await (await fetch('/api/rsvp', {
      body: JSON.stringify({rsvp: {email: rsvpEmail, events: toRsvp}}),
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
        {/* {sessions.length > 1 ? (<RsvpForAllButton
          handleClick={handleAllSessionsSelect.bind(this)}
        />): <></>} */}
        {showSessions ? (
            sessions.map((session, key) => {
              return <Session
                active={(
                  ((session.noLimit) &&
                  !isPast(session.startDateTime!)) ||
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
        <div className="font-inter uppercase text-xxs text-primary">
        All Dates and Times are in your local timezone&nbsp;
          <span className="font-semibold">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </span>
        </div>
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
             {email?.length! == 0 ? <Text
               name="email"
               placeholder='email'
               handleChange={handleRsvpEmail}
             ></Text>: <></>}
             <Button
               handleClick={handleSubmit.bind(this)}
               disabled={loading || disableSubmit}
               displayLoading={loading}
               buttonText={`RSVP →`}
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
  email,
}: {
  proposerName: string,
  sessionsCount: number,
  sessions: ClientSession[],
  email?: string
}) => {
  return (
    <div
      className="
            sm:pl-2 sm:pr-6 pr-4 pl-4 py-12
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
        email={email}
      />

    </div>
  );
};

export default RsvpSection;
