/* eslint-disable no-invalid-this */
import Text from '../atomic/Text';
import SessionsInput from '../form/SessionsInput';
// import Description from '../atomic/RichText';
import TextArea from '../atomic/TextArea';
import EventType from '../form/EventType';
import Button from '../atomic/Button';
import {useState} from 'react';
import {DateTime} from 'luxon';

import type {ClientInputSession as Session, ClientInputEvent as Event} from '../../types';

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
    timezone: DateTime.local().zoneName,
  });
  const [sessionDetails, setSessionDetails] = useState<Session[]>([{
    date: 0,
    month: 0,
    time: [],
    year: DateTime.local().get('year'),
    count: 0,
  }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [eventType, setEventType] = useState(eventDetails.eventType);
  // const handleDescriptionInput = (content: string, text: string) => {
  //   setEventDetails(Object.assign(eventDetails, {
  //     descriptionHtml: content,
  //     descriptionText: text,
  //   }));
  // };
  const handleSessionsInput = (count: number, e: any) => {
    setSessionDetails((currentSessions) => {
      const currentSession = currentSessions.find((s) => s.count == count);
      if (currentSession) {
        let session: Session = currentSession;
        session = Object.assign(session, {[e.target.name]: JSON.parse(e.target.value)});
        return currentSessions.map((c) => [session].find((s) => s!.count == c.count) || c);
      } else {
        let session: Session = {
          date: 0,
          month: 0,
          time: [],
          year: DateTime.local().get('year'),
          count,
        };
        session = Object.assign(session, {[e.target.name]: JSON.parse(e.target.value)});
        return currentSessions.concat([session]);
      }
    });
  };
  const handleSessionDelete = (count: number) => {
    setSessionDetails((sessions) => sessions.filter((s) => s.count != count));
  };
  const resetSessions = (isRecurring: boolean) => {
    if (!isRecurring) {
      setSessionDetails((currentSessions) => [currentSessions[0]]);
    }
  };
  const handleInput = (e: any) => {
    const target: 'title' | 'eventType' | 'location' | 'proposerName' | 'proposerEmail' | 'description' = e.target.name;
    switch (target) {
      case 'title':
      case 'eventType':
        setEventType(e.target.value);
      case 'location':
      case 'proposerName':
      case 'proposerEmail':
        setEventDetails(Object.assign(eventDetails, {
          [target]: e.target.value,
        }));
        break;
      case 'description':
        setEventDetails(Object.assign(eventDetails, {
          descriptionText: e.target.value,
          descriptionHtml: '<p>' + e.target.value + '</p>',
        }));
      default: return;
    }
  };
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      (await(await fetch('/api/submitEvent', {
        body: JSON.stringify({event: eventDetails, sessions: sessionDetails}),
        method: 'POST',
        headers: {'Content-type': 'application/json'},
      })).json()).data;
    } catch (err) {
      console.log('oMG i made a boo boo');
      // @todo
      // display error component / page
    }
    // @todo
    // display success component / page
    setLoading(false);
  };
  return (
    <div className={className}>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        <Text
          name="title"
          fieldName= "Title"
          handleChange={handleInput.bind(this)}
        />
        {/* <Description
          handleChange={handleDescriptionInput.bind(this)}
        /> */}
        <EventType
          handleChange={handleInput.bind(this)}
        />
        <TextArea
          name="description"
          fieldName="Description"
          handleChange={handleInput.bind(this)}
        />

        {
          eventType < 3 ? (
          <SessionsInput
            handleChange={handleSessionsInput.bind(this)}
            resetSessions={resetSessions.bind(this)}
            deleteSession={handleSessionDelete.bind(this)}
          />):
          <></>
        }
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
            disabled={loading}
          />
        </div>
      </div>


    </div>
  );
};

export default ProposeForm;
