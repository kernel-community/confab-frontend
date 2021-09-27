/* eslint-disable no-invalid-this */
/* eslint-disable new-cap */
import FieldLabel from '../FieldLabel';
import Image from 'next/image';
import deleteIcon from '../../../public/vectors/delete.png';
import {ReactElement, useState, useEffect} from 'react';

const DateTime = ({
  count,
  displayDelete,
  handleChange,
  handleDelete,
  displaySessionLabel,
}: {
  count: number,
  displayDelete: boolean,
  handleChange:any,
  handleDelete?:any,
  displaySessionLabel: boolean
}) => {
  return (
    <>
      {displaySessionLabel ? (<div
        className="
              my-auto
              text-sm text-gray-400
              justify-self-center
              font-semibold
            "
      >
            Session&nbsp;{count}
      </div>) : ``}
      <input
        type="date"
        name="date"
        className="
            rounded-md text-sm text-gray-800
            border-gray-300
            focus:border-primary focus:ring-primary
            w-full h-full
          "
        id="proposedate"
        onChange={handleChange}
      />
      <div className="flex flex-row items-center gap-3">
        <input
          type="time"
          name="time"
          className="
              rounded-md text-sm text-gray-800
              border-gray-300
              focus:border-primary focus:ring-primary
              w-full h-full
            "
          id="proposetime"
          onChange={handleChange}
        />
        {(displayDelete ?
          <Image
            src={deleteIcon}
            className="cursor-pointer"
            data-key={count}
            onClick={() => handleDelete(count)}
          />: <></>)}
      </div>
    </>
  );
};

const DateTimeWrapper = ({isRecurring}: { isRecurring: boolean }) => {
  const handleChange = (e:any) => {
    // @todo
    console.log(e.target.value);
  };
  const [count, setCount] = useState<number>(0);
  const [sessions, setSessions] = useState<ReactElement[]>([
    <DateTime
      count={count}
      key={count}
      handleChange={
        handleChange.bind(this)
      }
      displayDelete={false}
      displaySessionLabel={isRecurring}
    />,
  ]);
  useEffect(() => {
    setSessions([
      <DateTime
        count={count}
        key={count}
        handleChange={
          handleChange.bind(this)
        }
        displayDelete={false}
        displaySessionLabel={isRecurring}
      />,
    ]);
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
              handleChange={
                handleChange.bind(this)
              }
              displayDelete={true}
              handleDelete={
                deleteSession.bind(this)
              }
              displaySessionLabel={true}
            />,
        ),
    );
    setCount(count+1);
  };

  return (
    <div className={`
        grid ${isRecurring ? `grid-cols-3` : `grid-cols-2`} gap-4
      `}>
      {sessions}
      {isRecurring ? (<div
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
} : {
  isRecurring: boolean
}) => {
  return (
    <>
      <FieldLabel>
        Date & Time
        <div className="font-light text-sm">
          Note: Time is in&nbsp;
          <span className="font-semibold">
          24 hours
          </span>
          &nbsp;and in your current timezone
          (current timezone:&nbsp;
          <span className="font-semibold">
            {Intl.DateTimeFormat().resolvedOptions().timeZone})
          </span>
        </div>
      </FieldLabel>
      <DateTimeWrapper isRecurring={isRecurring} />
    </>
  );
};

export default Session;
