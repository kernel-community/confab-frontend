import FieldLabel from '../atomic/StrongText';

const EventType = ({
  handleChange,
}: {handleChange: any}) => {
  return (
    <>
      <FieldLabel>
      Select event type
      </FieldLabel>
      <select
        name="eventType"
        id="proposeeventtype"
        className="
          rounded-lg
          ring-gray-300 border-gray-300
          focus:border-primary focus:ring-primary
        "
        onChange={handleChange}
      >
        <option value="1">Junto</option>
        <option value="2">Build Guild</option>
      </select>
    </>
  );
};

export default EventType;
