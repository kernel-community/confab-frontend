import Image from 'next/image';
import deleteIcon from '../../public/vectors/delete.png';
import DefaultDatePicker from 'react-datepicker';
import { useState } from 'react';
import {DateTime as DT} from 'luxon';
import Number from './Number';
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
      <div>
        <div className="text-xs text-inter font-medium text-gray-400 flex-none">
          Session {sessionNumber}
        </div>
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
            rounded-lg
          `}
          minDate={new Date()}
        />
      </div>
      <div>
      <div className="text-xs text-inter font-medium text-gray-400 flex-none">
          Duration (in hours)
        </div>
        <input
          type="number"
          name="duration"
          onChange={handleChange}
          placeholder={"placeholder"}
          required
          className='rounded-lg'
        />
      </div>



      {/* <select className="rounded-lg ring-gray-300 border-gray-300
            focus:border-primary focus:ring-primary">
        <option value="1">1</option>
        <option value="1.5">1.5</option>
        <option value="2">2</option>
        <option value="2">2.5</option>
      </select> */}

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
