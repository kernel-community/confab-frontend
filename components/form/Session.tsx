/* eslint-disable no-invalid-this */
/* eslint-disable new-cap */
import FieldLabel from '../atomic/StrongText';
import {ReactElement, useState, useEffect} from 'react';
import DateTime from '../atomic/DateTime';

const DateTimeWrapper = ({
  isRecurring,
  handleChange,
  resetSessions,
  deleteSessionData,
}: {
  isRecurring: boolean
  handleChange: any
  resetSessions: any
  deleteSessionData: any
},
) => {
  const [count, setCount] = useState<number>(0);
  const [sessions, setSessions] = useState<ReactElement[]>([
    <DateTime
      count={count}
      key={count}
      sessionNumber={1}
      handleChange={handleChange}
      displayDelete={false}
      displaySessionLabel={isRecurring}
      deleteSessionData={deleteSessionData}
    />,
  ]);
  useEffect(() => {
    setSessions([
      <DateTime
        count={count}
        key={count}
        sessionNumber={1}
        handleChange={handleChange}
        displayDelete={false}
        displaySessionLabel={isRecurring}
        deleteSessionData={deleteSessionData}
      />,
    ]);
    resetSessions(isRecurring);
  }, [isRecurring]);
  const deleteSession = (count: number) => {
    setSessions((sessions) => sessions.filter((s) => s.key != count));
  };
  const addSession = () => {
    setSessions(
        sessions.concat(
            <DateTime
              count={count+1}
              key={count+1}
              sessionNumber={sessions.length + 1}
              handleChange={handleChange}
              displayDelete={true}
              handleDelete={
                deleteSession.bind(this)
              }
              displaySessionLabel={true}
              deleteSessionData={deleteSessionData}
            />,
        ),
    );
    setCount(count+1);
  };

  return (
    <div className="flex flex-col items-start gap-4">
      <div className="divide-y-2 divide-gray-200">
        {sessions}
      </div>
      {isRecurring ? (
      <div
        className="
              my-auto bg-primary-lighter py-1.5 px-2.5
              rounded-lg
              text-sm text-primary
              font-inter font-light
              justify-self-start
              cursor-pointer
            "
        onClick={addSession}
      >
            + Add Session
      </div>):<></>}
    </div>
  );
};

const Session = ({
  isRecurring,
  handleChange,
  resetSessions,
  deleteSession,
} : {
  isRecurring: boolean
  handleChange: any
  resetSessions: any
  deleteSession: any
}) => {
  return (
    <>
      <FieldLabel>
        Date & Time
        <div className="font-light text-xs">
        Time is in your current timezone
          (
          <span className="font-semibold">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </span>)
        </div>
        <div className="font-light text-xs">
        All sessions default to duration of&nbsp;
          <span className="font-semibold">
          1 hour 30 minutes
          </span>
        </div>
      </FieldLabel>
      <DateTimeWrapper isRecurring={isRecurring} handleChange={handleChange} resetSessions={resetSessions} deleteSessionData={deleteSession} />
    </>
  );
};

export default Session;
