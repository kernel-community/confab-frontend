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
    <>
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
          focus:border-primary focus:ring-primary
        "
        onChange={handleCheckBox}
      />
      <Session
        isRecurring={isRecurring}
        handleChange={handleChange}
        resetSessions={resetSessions}
        deleteSession={deleteSession}
        danger={danger}
      />
    </>
  );
};
export default SessionsInput;
