import Image from 'next/image';
import deleteIcon from '../../public/vectors/delete.png';
import DefaultDatePicker from 'react-datepicker';
import { useState } from 'react';
import {DateTime as DT} from 'luxon';

import "react-datepicker/dist/react-datepicker.css";

const DateTime = ({
  count,
  displayDelete,
  handleChange,
  handleDelete,
  displaySessionLabel,
  sessionNumber,
  deleteSessionData,
}: {
  count: number,
  sessionNumber: number,
  displayDelete: boolean,
  handleChange:any,
  handleDelete?:any,
  displaySessionLabel: boolean
  deleteSessionData: any
}) => {
  const [startDate, setStartDate] = useState();
  return (
    <div className={`
      flex flex-row gap-2 sm:flex-nowrap items-center py-4
    `}>
      {displaySessionLabel ? (<div className="text-xs text-inter font-medium text-gray-400 flex-none">
        Session {sessionNumber}
      </div>) : <></>}
      <DefaultDatePicker
        selected={startDate}
        onChange={(date: any) => {
            setStartDate(date);
            handleChange(count, DT.fromJSDate(date));
          }
        }
        shouldCloseOnSelect
        showTimeSelect={true}
        placeholderText="Select date & time"
        dateFormat="MM/d, h:mm aa"
        className={`
          rounded-lg red-border
        `}
        minDate={new Date()}
      />
      {(displayDelete ?
      <div className="cursor-pointer justify-self-center flex-none">
        <Image
          src={deleteIcon}
          data-key={count}
          onClick={() => {
            handleDelete(count);
            deleteSessionData(count);
          }}
          height={'20px'}
          width={'15px'}
        />
      </div>: <div></div>)}
    </div>
  );
};

export default DateTime;
