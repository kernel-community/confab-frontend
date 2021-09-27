import FieldLabel from '../FieldLabel';

const EventType = () => {
  return (
    <>
      <FieldLabel>
      Select event type
      </FieldLabel>
      <select
        name="eventtype"
        id="proposeeventtype"
        className="
          rounded-lg
          ring-gray-300 border-gray-300
          focus:border-primary focus:ring-primary
        "
      >
        <option value="1">Junto</option>
        <option value="2">Build Guild</option>
        <option value="3">Offer</option>
      </select>
    </>
  );
};

export default EventType;
