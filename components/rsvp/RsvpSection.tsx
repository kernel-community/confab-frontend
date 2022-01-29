/* eslint-disable new-cap */
import Image from 'next/image';
import cross from 'public/vectors/cross.png';
import FieldLabel from 'components/atomic/StrongText';
import Button from 'components/atomic/Button';
import Text from 'components/atomic/Text';
import {useEffect, useState} from 'react';
import {Session as ClientSession} from 'types';
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
  isChecked,
}: {
  active: boolean
  handleClick: any
  data: number
  date: string
  time: string
  availableSeats?: number
  totalSeats?: number
  noLimit?:boolean
  isChecked: boolean
}) => {
  return (
    <label
      className={`
        ${active?
          `
            cursor-pointer
          ` :
          'cursor-not-allowed'}
        flex flex-row items-center justify-left
        gap-1
      `}
    >
      {active && <input
        onChange={(e) => handleClick(data, e.target.checked)}
        disabled={!active}
        type="checkbox"
        className={`
          mr-4 rounded-md
          text-primary border-gray-300
          cursor-pointer
          focus:border-0 focus:ring-0
        `}
        defaultChecked={isChecked}
      />}
      {!active &&
      <div className='mr-4'>
        <Image src={cross} width={18} height={17}/>
      </div>
      }
      <div
        className={`
        flex-1
        flex
        flex-row
        gap-4
        font-secondary
        ${active? `text-primary` : `text-gray-400`}
        `}
      >
        <div className="flex-1 text-sm uppercase text-left my-auto">
          {date}, {time}
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
            <div>
              {availableSeats}/{totalSeats}
            </div>
            <span className="text-xs">Seats</span>
          </div>
        )}
      </div>
    </label>
  );
};

const SessionsWrapper = ({
  sessions,
}: {
  sessions: ClientSession[]
}) => {
  const [toRsvp, setToRsvp] = useState<(number | undefined)[]>(sessions.map((s) => s.id));
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [done, setDone] = useState(false);
  const [rsvpEmail, setRsvpEmail] = useState<string|undefined>(undefined);
  const [sortedSessions, setSortedSessions]=useState<ClientSession[]>(sessions);
  const [atleastOne, setAtleastOne] = useState<boolean>(true);
  useEffect(() => {
    const activeSessions:ClientSession[] = [];
    const inactiveSessions:ClientSession[] = [];
    sessions.forEach((s) => {
      const active = ((s.noLimit) &&
      !isPast(s.startDateTime!)) ||
      ((s.availableSeats! > 0) &&
        !isPast(s.startDateTime!));

      if (active) activeSessions.push(s);
      if (!active) inactiveSessions.push(s);
    });
    if (activeSessions.length > 0) setAtleastOne(true);
    if (activeSessions.length === 0) setAtleastOne(false);
    setSortedSessions([...activeSessions, ...inactiveSessions]);
  }, [sessions]);

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
        setToRsvp(toRsvp.filter((r) => r !== id));
        break;
      default: '';
    }
  };

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
        {
          sortedSessions.map((session, key) => {
            const active = ((session.noLimit) &&
            !isPast(session.startDateTime!)) ||
            ((session.availableSeats! > 0) &&
              !isPast(session.startDateTime!));
            return <Session
              active={active}
              handleClick={handleSessionSelect}
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
              isChecked={active}
            />;
          })}
        <div className="text-sm font-secondary lowercase font-light">
        in your local timezone&nbsp;
          <span className="font-semibold">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </span>
        </div>
      </div>
      {atleastOne && <div className="mt-6">
        {done ?
        (
          <FieldLabel>
            RSVP Recorded.
          </FieldLabel>
        ):
         (
           <div>
             <Text
               name="email"
               placeholder='email'
               handleChange={handleRsvpEmail}
             ></Text>
             <Button
               handleClick={handleSubmit}
               disabled={loading || disableSubmit}
               displayLoading={loading}
               buttonText={`RSVP →`}
               className='w-full mt-3'
             />
           </div>
           )
        }
      </div>
      }

    </>
  );
};

const RsvpSection = ({
  sessions,
}: {
  sessions: ClientSession[],
}) => {
  return (
    <div
      className="flex flex-col gap-2"
    >
      <SessionsWrapper
        sessions={sessions}
      />
    </div>
  );
};

export default RsvpSection;
