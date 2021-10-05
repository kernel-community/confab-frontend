/* eslint-disable no-invalid-this */
import Text from '../atomic/Text';
import SessionsInput from '../form/SessionsInput';
// import Description from '../atomic/RichText';
import TextArea from '../atomic/TextArea';
import EventType from '../form/EventType';
import Button from '../atomic/Button';
import {useEffect, useState} from 'react';
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
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [isOffer, setIsOffer] = useState<boolean>(false);
  const [titleValidation, setTitleValidation] = useState<{state: boolean, reason?: string}>({state: false, reason: ``});
  const [locationValidation, setLocationValidation] = useState<{state: boolean, reason?: string}>({state: false, reason: ``});
  const [emailValidation, setEmailValidation] = useState<{state: boolean, reason?: string}>({state: false, reason: ``});
  // const handleDescriptionInput = (content: string, text: string) => {
  //   setEventDetails(Object.assign(eventDetails, {
  //     descriptionHtml: content,
  //     descriptionText: text,
  //   }));
  // };
  useEffect(() => {
    if (titleValidation.state || locationValidation.state || emailValidation.state) setDisableSubmit(true);
    else setDisableSubmit(false);
  }, [titleValidation, locationValidation, emailValidation]);
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
  const validateFields = (field: string, value: string) => {
    const noSpecialChars = /[&\/\\#,+()$~%.'":*?<>@^{}]/g;
    const onlyURL = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    const onlyEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    switch (field) {
      case 'title':
        if (noSpecialChars.test(value.toLowerCase())) {
          setTitleValidation({state: true, reason: 'No special characters'});
        } else {
          setTitleValidation({state: false, reason: ``});
        }
        break;
      case 'location':
        if (onlyURL.test(value.toLowerCase()) || value.toLowerCase().startsWith('irl')) {
          setLocationValidation({state: false, reason: ``});
        } else {
          setLocationValidation({state: true, reason: 'Not a valid URL'});
        }
        break;
      case 'proposerEmail':
        if (onlyEmail.test(value.toLowerCase())) {
          setEmailValidation({state: false, reason: ``});
        } else {
          setEmailValidation({state: true, reason: 'Not a valid email'});
        }
        break;
    }
  };
  const handleInput = (e: any) => {
    const target: 'title' | 'eventType' | 'location' | 'proposerName' | 'proposerEmail' | 'description' = e.target.name;
    switch (target) {
      case 'title':
      case 'eventType':
        if (e.target.value == 3) setIsOffer(true);
        else setIsOffer(false);
      case 'location':
      case 'proposerName':
      case 'proposerEmail':
        setEventDetails(Object.assign(eventDetails, {
          [target]: e.target.value,
        }));
        validateFields(target, e.target.value);
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
    setDisableSubmit(true);
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
    setDisableSubmit(false);
  };
  return (
    <div className={className}>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        <Text
          name="title"
          fieldName= "Title"
          handleChange={handleInput.bind(this)}
          danger={titleValidation.state}
          dangerReason={titleValidation.reason}
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
          !isOffer ? (
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
          danger={locationValidation.state}
          dangerReason={locationValidation.reason}
          infoText={`Enter a valid URL or prefix with 'IRL: ' for IRL events`}
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
          danger={emailValidation.state}
          dangerReason={emailValidation.reason}
          infoText={`You will receive a google calendar event invite on this email`}
        />
        <div></div>
        <div className="w-1/2 justify-self-end">
          <Button
            buttonText={`Submit →`}
            handleClick={handleSubmit.bind(this)}
            disabled={disableSubmit}
            displayLoading={loading}
          />
        </div>
      </div>


    </div>
  );
};

export default ProposeForm;
