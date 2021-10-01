/* eslint-disable no-invalid-this */
import Text from '../atomic/Text';
import SessionsInput from '../form/SessionsInput';
import Description from '../atomic/RichText';
import EventType from '../form/EventType';
import Button from '../atomic/Button';
import {useState} from 'react';

type Session = {
  date?: number,
  month?: number,
  year?: number,
  hour?: number,
  minute?: number
}
type Event = {
  title?: string,
  descriptionText?: string,
  descriptionHtml?: string,
  eventType?: number,
  location?: string,
  proposerName?: string,
  proposerEmail?: string
}
const ProposeForm = ({
  className,
}: {
  className: string
}) => {
  const [eventDetails, setEventDetails] = useState<Event>({
    title: '',
    descriptionHtml: '',
    descriptionText: '',
    eventType: 1,
    location: '',
    proposerName: '',
    proposerEmail: '',
  });
  const [sessionDetails, setSessionDetails] = useState<Session[]>([{
    date: 0,
    month: 0,
    hour: 0,
    year: 0,
    minute: 0,
  }]);
  const handleDescriptionInput = (content: string, text: string) => {
    setEventDetails(Object.assign(eventDetails, {
      descriptionHtml: content,
      descriptionText: text,
    }));
  };
  const handleSessionsInput = (sessionNumber: number, e: any) => {
    // @todo
    console.log({
      [e.target.name]: JSON.parse(e.target.value),
    });
    console.log('session number', sessionNumber);
    console.log('e', e);
    setSessionDetails([{}]);
  };
  const resetSessions = (isRecurring: boolean) => {
    if (!isRecurring) {
      // @todo
      console.log('reset and keep only first session data');
    }
  };
  const handleInput = (e: any) => {
    const target: 'title' | 'eventType' | 'location' | 'proposerName' | 'proposerEmail' = e.target.name;
    switch (target) {
      case 'title':
      case 'eventType':
      case 'location':
      case 'proposerName':
      case 'proposerEmail':
        setEventDetails(Object.assign(eventDetails, {
          [target]: e.target.value,
        }));
        break;
      default: return;
    }
  };
  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    console.log(eventDetails);
    console.log(sessionDetails);
  };
  return (
    <div className={className}>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        <Text
          name="title"
          fieldName= "Title"
          handleChange={handleInput.bind(this)}
        />
        <Description
          handleChange={handleDescriptionInput.bind(this)}
        />
        <EventType
          handleChange={handleInput.bind(this)}
        />
        <SessionsInput
          handleChange={handleSessionsInput.bind(this)}
          resetSessions={resetSessions.bind(this)}
        />
        <Text
          name="location"
          fieldName= "Location"
          handleChange={handleInput.bind(this)}
        />
        <Text
          name="proposerName"
          fieldName= "Your Name"
          handleChange={handleInput.bind(this)}
        />
        <Text
          name="proposerEmail"
          fieldName= "Your Email"
          handleChange={handleInput.bind(this)}
        />
        <div></div>
        <div className="w-1/2 justify-self-end">
          <Button
            buttonText={`Submit →`}
            handleClick={handleSubmit.bind(this)}
            disabled={false}
          />
        </div>
      </div>


    </div>
  );
};

export default ProposeForm;
