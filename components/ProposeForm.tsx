import Title from './form/section/Title';
import SessionsInput from './form/section/SessionsInput';
import Description from './form/section/Description';
import Limit from './form/section/Limit';
import EventType from './form/section/EventType';
import Location from './form/section/Location';

const ProposeForm = ({
  className,
}: {
  className: string
}) => {
  return (
    <div className={className}>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        <Title />
        <Description />
        <EventType />
        <Limit />
        <SessionsInput />
        <Location />
      </div>
    </div>
  );
};

export default ProposeForm;
