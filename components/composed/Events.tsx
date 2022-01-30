import {Title} from '../atomic/Title';
import {Card} from '../atomic/Card';
// import {HorizontalScroll} from '../../layouts/HorizontalScroll';
import {useEffect, useState} from 'react';
import {ServerEvent} from '../../types';
import Link from 'next/link';
export const Events = ({
  type,
  title,
  highlight,
}: {
  type: string,
  title?: string,
  highlight?: string
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<ServerEvent[]>([]);
  useEffect(() => {
    setLoading(true);
    (async () => {
      const r = (await (await fetch('api/getEvents', {
        body: JSON.stringify({type, now: new Date()}),
        method: 'POST',
        headers: {'Content-type': 'application/json'},
      })).json()).data;
      setEvents(r);
    })();
    setLoading(false);
  }, [type]);
  return (
    <div>
      <Title text={title} highlight={highlight} className='mb-3'/>
      <div className='sm:flex sm:flex-row sm:flex-wrap sm:gap-4'>
        {/* <HorizontalScroll> */}
        {!loading && events.length > 0 && events.map((u, k) =>
          <Link
            href={`/rsvp/${u.hash}`}
            key={k}
          >
            <div>
              <Card
                title={u.title}
                descriptionText={u.descriptionText?? ''}
                startDateTime={u.startDateTime}
                RSVP={u.RSVP}
                limit={u.limit}
                hash={u.hash}
                type={u.type?.type.toLowerCase()|| 'junto' }
                by={u.proposerName || 'anonymous'}
              />
            </div>
          </Link>,
        )}
        {
          !loading && events.length==0 &&
          <div>
            No {title} events.
          </div>
        }
        {/* </HorizontalScroll> */}
      </div>
    </div>
  );
};
