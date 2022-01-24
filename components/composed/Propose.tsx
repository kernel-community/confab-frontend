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
import {noSpecialChars, onlyURL} from '../../utils/regex';
import {sessionDatesValidity} from '../../utils';
import {DateTime as DT} from 'luxon';
import type {ClientInputSession as Session, ClientInputEvent as Event} from '../../types';

const Propose = ({
  className,
}: {
  className: string,
}) => {
  const [eventDetails, setEventDetails] = useState<Event>({
    title: '',
    descriptionHtml: '',
    descriptionText: '',
    eventType: 1, // default to junto
    location: '',
    proposerEmail: '',
    proposerName: 'Anonymous',
    limit: 0,
    timezone: DateTime.local().zoneName,
  });
  const [sessionDetails, setSessionDetails] = useState<Session[]>([{
    startDateTime: new Date().toISOString(),
    endDateTime: new Date().toISOString(),
    count: 0,
  }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [isOffer, setIsOffer] = useState<boolean>(false);
  const [titleValidation, setTitleValidation] = useState<{state: boolean, reason?: string}>({state: false, reason: ``});
  const [locationValidation, setLocationValidation] = useState<{state: boolean, reason?: string}>({state: false, reason: ``});
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
      titleValidation.state || locationValidation.state || limitValidation.state
    ) {
      disable = true;
    }
    setDisableSubmit(disable);
  }, [
    eventDetails.title,
    eventDetails.location,
    titleValidation,
    locationValidation,
    limitValidation,
  ]);
  const handleSessionsInput = (countOrEvent: any, e: DT) => {
    setDateTimesValidation(false);
    setSessionDetails((currentSessions) => {
      const currentSession = currentSessions.find((s) => s.count == countOrEvent);
      if (currentSession) {
        let session: Session = currentSession;
        if (e) {
          session = Object.assign(session, {startDateTime: e.toISO()});
        } else {
          const duration = countOrEvent.target.value;
          console.log("caught duration", duration);
        }
        return currentSessions.map((c) => [session].find((s) => s!.count == c.count) || c);
      } else {
        let session: Session = {
          startDateTime: e ? e.toISO() : undefined,
          count: countOrEvent,
        };
        if (e) {
          session = Object.assign(session, {startDateTime: e.toISO()});
        } else {
          const duration = countOrEvent.target.value;
          console.log("caught duration", duration);
        }
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
    const target: 'title' | 'location' | 'description' | 'limit' | 'proposerEmail' | 'proposerName' | 'eventType' = e.target.name;
    switch (target) {
      case 'title':
      case 'location':
      case 'proposerEmail':
      case 'proposerName':
      case 'limit':
      case 'eventType':
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
    console.log({event: eventDetails, sessions: sessionDetails});

    if (!sessionDatesValidity(sessionDetails) && eventDetails.eventType != 3) {
      setDateTimesValidation(true);
      return;
    }
    setLoading(true);
    setDisableSubmit(true);
    let r : {
      ok?: string
      data?: {
        id: number
        type: {
          id: number
          emoji: string
          type: string
        }
        emoji: string
        hash:string
      }
    } = {};
    // try {
    //   r = (await(await fetch('/api/submitEvent', {
    //     body: JSON.stringify({event: eventDetails, sessions: sessionDetails}),
    //     method: 'POST',
    //     headers: {'Content-type': 'application/json'},
    //   })).json()).r;
    // } catch (err) {
    //   router.push({
    //     pathname: '/submission',
    //     query: {ok: false},
    //   });
    // }
    // router.push({
    //   pathname: '/submission',
    //   query: {
    //     ok: r.ok,
    //     eventHash: r.data?.hash,
    //     type: r.data?.type.type,
    //     typeId: r.data?.type.id,
    //   },
    // });
    setLoading(false);
    setDisableSubmit(false);
  };
  return (
    <div className={className}>
      <div className="grid xl:grid-cols-2 gap-4 grid-cols-1">
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
          infoText={
            `Enter a valid URL
            ${eventDetails.eventType != 3 ?
              `or prefix with 'IRL: ' for IRL events` : ``}
            `
          }
        />
        <Text
          name="proposerEmail"
          fieldName="Email"
          handleChange={handleInput}
          infoText={
            `
              We need your email to send you google calendar invites & a reminder email before the start of an event
            `
          }
        />
        <Text
          name="proposerName"
          fieldName="Name"
          handleChange={handleInput}
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

export default Propose;
