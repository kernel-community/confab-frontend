/* eslint-disable no-invalid-this */
import Text from '../atomic/Text';
import SessionsInput from '../form/SessionsInput';
import TextArea from '../atomic/TextArea';
import NumberComponent from '../atomic/Number';
import EventType from '../form/EventType';
import Button from '../atomic/Button';
import {useEffect, useState} from 'react';
import {DateTime} from 'luxon';
import {useRouter} from 'next/router';
import {noSpecialChars, onlyURL, onlyEmail} from '../../utils/regex';
import {sessionDatesValidity} from '../../utils';
import type {ClientInputSession as Session, ClientInputEvent as Event} from '../../types';

const ProposeForm = ({
  className,
}: {
  className: string
}) => {
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState<Event>({
    title: '',
    descriptionHtml: '',
    descriptionText: '',
    eventType: 1,
    location: '',
    proposerName: '',
    proposerEmail: '',
    limit: 0,
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
  const [limitValidation, setLimitValidation] = useState<{state: boolean, reason?: string}>({state: false, reason: ``});
  const [dateTimesValidation, setDateTimesValidation]=useState<boolean>(false);
  useEffect(() => {
    let disable: boolean = false;
    if (
      eventDetails.title?.length == 0 ||
      eventDetails.location?.length == 0 ||
      eventDetails.proposerEmail?.length == 0 ||
      eventDetails.proposerName?.length == 0
    ) {
      disable = true;
    }
    if (
      titleValidation.state || locationValidation.state ||
      emailValidation.state || limitValidation.state
    ) {
      disable = true;
    }
    setDisableSubmit(disable);
  }, [
    eventDetails.title,
    eventDetails.location,
    eventDetails.proposerEmail,
    eventDetails.proposerName,
    titleValidation,
    locationValidation,
    emailValidation,
    limitValidation,
  ]);
  const handleSessionsInput = (count: number, e: any) => {
    setDateTimesValidation(false);
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
      case 'limit':
        if (Number(value) > 90 || Number(value) < 0) {
          setLimitValidation({state: true, reason: 'Positive integers less than 90 only :)'});
        } else {
          setLimitValidation({state: false, reason: ``});
        }
        break;
    }
  };
  const handleInput = (e: any) => {
    const target: 'title' | 'eventType' | 'location' | 'proposerName' | 'proposerEmail' | 'description' | 'limit' = e.target.name;
    switch (target) {
      case 'title':
      case 'eventType':
        if (e.target.value == 3) setIsOffer(true);
        else setIsOffer(false);
      case 'location':
      case 'limit':
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
    if (!sessionDatesValidity(sessionDetails)) {
      setDateTimesValidation(true);
      return;
    }
    setLoading(true);
    setDisableSubmit(true);
    let r : {
      ok?: string
      data?: {
        id: number
        type: string
        emoji: string
        hash:string
      }
    } = {};
    try {
      r = (await(await fetch('/api/submitEvent', {
        body: JSON.stringify({event: eventDetails, sessions: sessionDetails}),
        method: 'POST',
        headers: {'Content-type': 'application/json'},
      })).json()).r;
    } catch (err) {
      router.push({
        pathname: '/submission',
        query: {ok: false},
      });
    }
    router.push({
      pathname: '/submission',
      query: {
        ok: r.ok,
        eventHash: r.data?.hash,
        type: r.data?.type,
      },
    });
    setLoading(false);
    setDisableSubmit(false);
  };
  return (
    <div className={className}>
      <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
        <EventType
          handleChange={handleInput}
        />
        {
          !isOffer ? (
            <Text
              name="title"
              fieldName= "Title *"
              handleChange={handleInput}
              danger={titleValidation.state}
              dangerReason={titleValidation.reason}
            />):
          <></>
        }
        <TextArea
          name="description"
          fieldName={isOffer ? `What is it that you'd like to offer?`: `Description`}
          handleChange={handleInput.bind(this)}
          infoText={isOffer ? `eg., "Learned smart contracts in 6 months, secured a job in DeFi. Part time gymnast on the side. Loving the intersection of crypto and community. Happy to talk governance, smart contract security, and exploring different types of movement!"` : ``}
        />
        {
          !isOffer ? (
          <>
            <SessionsInput
              handleChange={handleSessionsInput}
              resetSessions={resetSessions}
              deleteSession={handleSessionDelete}
              danger={dateTimesValidation}
            />
            <NumberComponent
              name="limit"
              fieldName="Set Limit"
              infoText={`Enter maximum number of seats for your session(s). Enter 0 for no limit`}
              handleChange={handleInput}
              danger={limitValidation.state}
              dangerReason={limitValidation.reason}
              placeholder="0"
            />
          </>
          ):
          <></>
        }
        <Text
          name="location"
          fieldName={isOffer ? `Link to Scheduler *`: `Location *`}
          handleChange={handleInput}
          danger={locationValidation.state}
          dangerReason={locationValidation.reason}
          infoText={`Enter a valid URL or prefix with 'IRL: ' for IRL events`}
        />
        <Text
          name="proposerName"
          fieldName= "Your Name *"
          handleChange={handleInput}
        />
        <Text
          name="proposerEmail"
          fieldName= "Your Email *"
          handleChange={handleInput}
          danger={emailValidation.state}
          dangerReason={emailValidation.reason}
          infoText={`You will receive a google calendar event invite on this email`}
        />
        <div></div>
        <div className="w-1/2 justify-self-end">
          <Button
            buttonText={`Submit →`}
            handleClick={handleSubmit}
            disabled={disableSubmit}
            displayLoading={loading}
          />
        </div>
      </div>


    </div>
  );
};

export default ProposeForm;
