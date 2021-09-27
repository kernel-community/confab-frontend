import FieldLabel from '../FieldLabel';
import Session from './Session';
import {useState} from 'react';

const SessionsInput = () => {
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
      />
    </>
  );
};
export default SessionsInput;
