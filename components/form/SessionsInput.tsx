/* eslint-disable new-cap */

import Session from './Session';
import {useState} from 'react';
import FieldLabel from '../atomic/StrongText';

const SessionsInput = ({
  handleChange,
  resetSessions,
  deleteSession,
  danger,
}: {
  handleChange: any
  resetSessions: any
  deleteSession: any
  danger?: boolean
}) => {
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const handleCheckBox = () => {
    setIsRecurring(!isRecurring);
  };
  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-row gap-10 items-center'>
        <FieldLabel>
        Is this a recurring conversation?
        </FieldLabel>
        <input
          type="checkbox"
          name="multisession"
          id="proposemultisession"
          className="
          p-2
          rounded-sm
          text-primary border-gray-300
          cursor-pointer
          focus:border-2 focus:border-primary focus:ring-2 focus:ring-primary
        "
          onChange={handleCheckBox}
        />
      </div>

      <Session
        isRecurring={isRecurring}
        handleChange={handleChange}
        resetSessions={resetSessions}
        deleteSession={deleteSession}
        danger={danger}
      />
    </div>
  );
};
export default SessionsInput;
