/* eslint-disable no-invalid-this */
import Text from 'components/atomic/Text';
import SessionsInput from 'components/form/SessionsInput';
import NumberComponent from 'components/atomic/Number';
import EventType from 'components/form/EventType';
import Button from 'components/atomic/Button';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {specialChars, onlyURL, onlyEmail} from 'utils/regex';
import {sessionDatesValidity} from 'utils';
import {DateTime as DT} from 'luxon';
import type {ClientInputSession as Session, ClientInputEvent as Event} from 'types';
import {RichTextArea} from 'components/atomic/RichTextArea';
import FieldLabel from 'components/atomic/StrongText';
type validation = {
  state: boolean,
  reason: string
}
const Propose = ({
  className,
}: {
  className?: string,
}) => {
  const router = useRouter();
  const [eventDetails, setEventDetails] = useState<Event>({
    title: '',
    descriptionHtml: '',
    descriptionText: '',
    eventType: 1, // default to junto
    location: '',
    proposerEmail: '',
    proposerName: 'Anonymous',
    limit: 0,
    postOnSlack: true,
  });
  const [sessionDetails, setSessionDetails] = useState<Session[]>([{
    startDateTime: DT.now().toISO(),
    endDateTime: DT.now().toISO(),
    count: 0,
  }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [disableSubmit, setDisableSubmit] = useState<boolean>(false);
  const [titleValidation, setTitleValidation] = useState<validation>({state: false, reason: ``});
  const [locationValidation, setLocationValidation] = useState<validation>({state: false, reason: ``});
  const [emailValidation, setEmailValidation] = useState<validation>({state: false, reason: ''});
  const [limitValidation, setLimitValidation] = useState<validation>({state: false, reason: ``});
  const [dateTimesValidation, setDateTimesValidation]=useState<boolean>(false);

  /**
   * Handle all inputs
   */
  // handle input from all form objects
  const handleInput = (e: any) => {
    e.persist();
    const target: 'title' | 'location' | 'limit' | 'proposerEmail' | 'proposerName' | 'eventType' | 'postOnSlack' = e.target.name;
    const value = e.target.value;
    switch (target) {
      case 'title':
        const containsSpecialChars = specialChars.test(value);
        // const lengthGreaterThanAllowed = value.length > 150;
        if (containsSpecialChars) {
          setTitleValidation({
            state: true,
            reason: 'some special characters are restricted',
          });
        } else {
          setTitleValidation({
            state: false,
            reason: '',
          });
        }
        setEventDetails(Object.assign(eventDetails, {
          [target]: value,
        }));
        break;
      case 'location':
        const isURL = onlyURL.test(value);
        if (!isURL && !value.toLowerCase().startsWith('irl')) {
          setLocationValidation({
            state: true,
            reason: 'Not a valid URL. For IRL events, prefix with `IRL`',
          });
        } else {
          setLocationValidation({
            state: false,
            reason: '',
          });
        }
        setEventDetails(Object.assign(eventDetails, {
          [target]: value,
        }));
        break;
      case 'proposerEmail':
        const isEmail = onlyEmail.test(value);
        if (!isEmail) {
          setEmailValidation({
            state: true,
            reason: 'Please enter a valid email',
          });
        } else {
          setEmailValidation({
            state: false,
            reason: '',
          });
        }
        setEventDetails(Object.assign(eventDetails, {
          [target]: value,
        }));
        break;
      case 'proposerName':
        setEventDetails(Object.assign(eventDetails, {
          [target]: value,
        }));
        break;
      case 'limit':
        const isInvalidLimit = Number(value) > 90 || Number(value) < 0;
        if (isInvalidLimit) {
          setLimitValidation({
            state: true,
            reason: 'invalid limit',
          });
        } else {
          setLimitValidation({
            state: false,
            reason: '',
          });
        }
        setEventDetails(Object.assign(eventDetails, {
          [target]: value,
        }));
        break;
      case 'eventType':
        setEventDetails(Object.assign(eventDetails, {
          [target]: value,
        }));
        break;
      case 'postOnSlack':
        setEventDetails((e) => Object.assign(e, {postOnSlack: !e.postOnSlack}));
        break;
      default: return;
    }
  };
  // handle description's richtext input from the form
  const handleDescriptionInput = (e: any) => {
    setEventDetails(Object.assign(eventDetails, {
      'descriptionText': e.editor.getText(),
      'descriptionHtml': e.editor.getHTML(),
    }));
  };
  // handle single / multiple sessions (date time + duration) input
  const handleSessionsInput = (type: 'dateTime' | 'duration', count: number, e: any) => {
    setDateTimesValidation(false);
    switch (type) {
      case 'dateTime':
        setSessionDetails((currentSessions) => {
          const currentSession = currentSessions.find((s) => s.count === count);
          if (currentSession) {
            let session: Session = currentSession;
            session = Object.assign(session, {startDateTime: e.toISO()});
            return currentSessions.map((c) => [session].find((s) => s!.count == c.count) || c);
          } else {
            let session: Session = {
              startDateTime: e ? e.toISO() : undefined,
              count,
            };
            session = Object.assign(session, {startDateTime: e.toISO()});
            return currentSessions.concat([session]);
          }
        });
        break;
      case 'duration':
        setSessionDetails((currentSessions) => {
          const currentSession = currentSessions.find((s) => s.count === count);
          const hours = Number(e.target.value);
          if (currentSession) {
            let session: Session = currentSession;
            const startDateTime = session.startDateTime ? DT.fromISO(session.startDateTime).toISO() : DT.now().toISO();
            const endDateTime = DT.fromISO(startDateTime).plus({hours}).toISO();
            session = Object.assign(session, {endDateTime});
            return currentSessions.map((c) => [session].find((s) => s!.count == c.count) || c);
          } else {
            const session: Session = {
              startDateTime: DT.now().toISO(),
              endDateTime: DT.now().plus({hours}).toISO(),
              count,
            };
            return currentSessions.concat([session]);
          }
        });
        break;
    }
  };
  // handle deletion of a session while input
  const handleSessionDelete = (count: number) => {
    setSessionDetails((sessions) => sessions.filter((s) => s.count != count));
  };
  // handle checking / unchecking the `is recurring` field on the form
  // if unchecked, reset the component back to just the first session
  const resetSessions = (isRecurring: boolean) => {
    if (isRecurring) return;
    setSessionDetails((currentSessions) => [currentSessions[0]]);
  };


  /**
   * Handle form submission
   */
  //
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
        type: {
          id: number
          emoji: string
          type: string
        }
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
        type: r.data?.type.type,
        typeId: r.data?.type.id,
      },
    });
    setLoading(false);
    setDisableSubmit(false);
  };


  /**
   * Handle disbaling the Submit button
   */
  //
  useEffect(() => {
    if (
      (
        eventDetails.title?.length === 0 ||
        eventDetails.location?.length === 0 ||
        eventDetails.proposerEmail?.length === 0
      ) ||
      (
        limitValidation.state ||
        titleValidation.state ||
        locationValidation.state ||
        emailValidation.state
      )
    ) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
  }, [limitValidation.state, titleValidation.state, locationValidation.state, eventDetails.title, eventDetails.location, eventDetails.proposerEmail, emailValidation.state]);

  return (
    <div className={className}>
      <div className="flex flex-col gap-14">
        <EventType
          handleChange={handleInput}
        />
        <Text
          name="title"
          fieldName="Title *"
          handleChange={handleInput}
          danger={titleValidation.state}
          dangerReason={titleValidation.reason}
        />
        <div>
          <FieldLabel>
          Description
          </FieldLabel>

          <RichTextArea handleChange={handleDescriptionInput}/>
        </div>
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
        <Text
          name="location"
          fieldName="Location *"
          handleChange={handleInput}
          danger={locationValidation.state}
          dangerReason={locationValidation.reason}
          infoText={
            `Enter a valid URL or prefix with 'IRL: ' for IRL events`
          }
        />
        <Text
          name="proposerEmail"
          fieldName="Email *"
          handleChange={handleInput}
          infoText={
            `
              We need your email to send you google calendar invites & a reminder email before the start of an event
            `
          }
          danger={emailValidation.state}
          dangerReason={emailValidation.reason}
        />
        <Text
          name="proposerName"
          fieldName="Your Name"
          handleChange={handleInput}
        />
        <div className='flex flex-row gap-10 items-center'>
          <FieldLabel>
              Would you like to post this Convo on Slack?
            <div className="text-sm font-primary normal-case font-light">
            If checked, a new message will be posted on KERNEL slack.
            </div>
          </FieldLabel>
          <input
            type="checkbox"
            name="postOnSlack"
            id="postOnSlack"
            className="
              p-2
              rounded-sm
              text-primary border-gray-300
              cursor-pointer
              focus:border-0 focus:ring-0
            "
            onChange={handleInput}
            defaultChecked={eventDetails.postOnSlack}
          />
        </div>
        {dateTimesValidation && <div className='font-primary lowercase text-sm text-red-400'>There was an error in submission. Please check all the fields.</div>}
        {!dateTimesValidation && <div></div>}
        <Button
          buttonText={`Submit →`}
          handleClick={handleSubmit}
          disabled={disableSubmit}
          displayLoading={loading}
        />
      </div>
    </div>
  );
};

export default Propose;
