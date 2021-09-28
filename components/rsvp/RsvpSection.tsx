/* eslint-disable no-invalid-this */
import Image from 'next/image';
import personVector from '../../public/vectors/person.png';
import handVector from '../../public/vectors/hand.png';
import circlesVector from '../../public/vectors/circles.png';
import FieldLabel from '../form/FieldLabel';
import RsvpButton from './RsvpButton';
import {useState} from 'react';
import {Session as ClientSession} from '../../types';
const Session = ({
  active,
  handleClick,
  data,
  startDateTime,
  offset,
  availableSeats,
  totalSeats,
  noLimit
}: {
  active: boolean
  handleClick: any
  data:number
  startDateTime: Date
  offset: number
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
        gap-3
      `}
    >
      <input
        onChange={() => handleClick(data)}
        disabled={!active}
        type="checkbox"
        className={`
          ${!active? `text-gray-500` : ``}
          p-2 rounded-sm
          text-primary border-gray-300
          cursor-pointer
          focus:border-primary focus:ring-primary
        `}
      />
      <div
        className="flex flex-col"
      >
        <div>
          {
            new Date(startDateTime).toDateString()
          }
        </div>
        {noLimit ? <></> : (<div
          className="
          flex flex-row items-center text-sm
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
        onChange={handleClick}
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

const SessionsWrapper = ({
  sessions,
}: {
  sessions: ClientSession[]
}) => {
  // maintain selected/not-selected objects of sessions from the data
  // given from parent
  // submit to api
  const [showSessions, setShowSessions] = useState<boolean>(true);
  const handleSessionSelect = (e:number) => {
    console.log(e);
  };
  const handleAllSessionsSelect = () => {
    setShowSessions(!showSessions);
  };
  const handleSubmit = () => {
    console.log('submitting now');
  };
  return (
    <>
      <div
        className="flex flex-col gap-3 mt-3"
      >
        <RsvpForAllButton
          handleClick={handleAllSessionsSelect.bind(this)}
        />
        {showSessions ? (
            sessions.map((session, key) => {
              return <Session
                active={(session.noLimit || session.availableSeats! > 0)}
                handleClick={handleSessionSelect.bind(this)}
                key={key}
                data={124}
                startDateTime={session.startDateTime!}
                offset={session.offset!}
                availableSeats={session.availableSeats!}
                totalSeats={session.totalSeats!}
                noLimit={session.noLimit}
              />;
            })
      ) : <></>}
      </div>
      <RsvpButton
        handleClick={handleSubmit.bind(this)}
      />
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
