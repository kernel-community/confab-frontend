/* eslint-disable no-invalid-this */
/* eslint-disable new-cap */
import FieldLabel from 'components/atomic/StrongText';
import {ReactElement, useState, useEffect} from 'react';
import DateTime from 'components/atomic/DateTime';

const DateTimeWrapper = ({
  isRecurring,
  handleChange,
  resetSessions,
  deleteSessionData,
  danger,
}: {
  isRecurring: boolean
  handleChange: any
  resetSessions: any
  deleteSessionData: any
  danger?: boolean
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
              deleteSessionData={deleteSessionData}
            />,
        ),
    );
    setCount(count+1);
  };

  return (
    <div className="flex flex-col space-between gap-4">
      <div className="divide-y-2 divide-gray-200">
        {sessions}
      </div>
      {isRecurring ? (
      <div
        className="
              py-1.5
              rounded-lg
              border-2 border-primary
              text-sm text-primary
              font-secondary
              cursor-pointer
              w-40
              uppercase
              flex flex-col items-center
            "
        onClick={addSession}
      >
            + Add Session
      </div>):<></>}
      {danger ? (
      <div className="font-primary lowercase text-sm text-red-400">
        Date invalid or in the past
      </div>) : <></>}
    </div>
  );
};

const Session = ({
  isRecurring,
  handleChange,
  resetSessions,
  deleteSession,
  danger,
} : {
  isRecurring: boolean
  handleChange: any
  resetSessions: any
  deleteSession: any
  danger?: boolean
}) => {
  return (
    <div>
      <FieldLabel>
        Date & Time&nbsp;
        <span className="text-sm font-primary lowercase font-light">
        Time is in your current timezone
          (
          <span className="underline">
            {Intl.DateTimeFormat().resolvedOptions().timeZone}
          </span>)
        </span>
      </FieldLabel>
      <DateTimeWrapper
        isRecurring={isRecurring}
        handleChange={handleChange}
        resetSessions={resetSessions}
        deleteSessionData={deleteSession}
        danger = {danger}
      />
    </div>
  );
};

export default Session;
