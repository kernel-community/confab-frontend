import FieldLabel from '../atomic/StrongText';

const EventType = ({
  handleChange,
}: {handleChange: any}) => {
  return (
    <div>
      <FieldLabel>
      Select event type
      </FieldLabel>
      <select
        name="eventType"
        id="proposeeventtype"
        className="
          rounded-lg
          border-primary-muted
          focus:border-primary focus:ring-primary
          w-full
        "
        onChange={handleChange}
      >
        <option value="1">Junto</option>
        <option value="2">Build Guild</option>
      </select>
    </div>
  );
};

export default EventType;
