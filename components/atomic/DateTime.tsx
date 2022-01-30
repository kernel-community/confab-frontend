import Image from 'next/image';
import deleteIcon from '../../public/vectors/delete.png';
import DefaultDatePicker from 'react-datepicker';
import {useState} from 'react';
import {DateTime as DT} from 'luxon';
import 'react-datepicker/dist/react-datepicker.css';

const DateTime = ({
  count,
  displayDelete,
  handleChange,
  handleDelete,
  sessionNumber,
  deleteSessionData,
}: {
  count: number,
  sessionNumber: number,
  displayDelete: boolean,
  handleChange:any,
  handleDelete?:any,
  deleteSessionData: any
}) => {
  const [startDate, setStartDate] = useState();
  return (
    <div className={`
      flex flex-row gap-2 items-center py-4 flex-wrap sm:flex-nowrap
    `}>
      <div>
        {/* <div className="text-xs text-primary font-light lowercase">
          Session {sessionNumber}
        </div> */}
        <DefaultDatePicker
          selected={startDate}
          onChange={(date: any) => {
            setStartDate(date);
            handleChange('dateTime', count, DT.fromJSDate(date));
          }}
          shouldCloseOnSelect
          showTimeSelect={true}
          placeholderText="date & time"
          dateFormat="MM/d, h:mm aa"
          className={`
            rounded-lg focus:border-primary focus:ring-primary
            font-primary
          `}
          minDate={new Date()}
        />
      </div>
      <div>
        {/* <div className="text-xs text-primary font-light lowercase">
          Duration (in hours)
        </div> */}
        <input
          type="number"
          name="duration"
          onChange={(e) => handleChange('duration', count, e)}
          placeholder={'duration (in hours)'}
          required
          className='rounded-lg focus:border-primary focus:ring-primary font-primary'
        />
      </div>

      {(displayDelete ?
      <div className="cursor-pointer">
        <Image
          src={deleteIcon}
          data-key={count}
          onClick={() => {
            handleDelete(count);
            deleteSessionData(count);
          }}
          height={'25px'}
          width={'25px'}
        />
      </div>: <div></div>)}
    </div>
  );
};

export default DateTime;
