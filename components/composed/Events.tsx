import {Title} from '../atomic/Title';
import {Card} from '../../layouts/Card';
import {HorizontalScroll} from '../../layouts/HorizontalScroll';
import {useEffect, useState} from 'react';
import {ServerEvent} from '../../types';
export const Events = ({
  type,
}: {
  type: string
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [events, setEvents] = useState<ServerEvent[]>([]);
  const [title, setTitle] = useState<string>('');
  useEffect(() => {
    setLoading(true);
    (async () => {
      const r = (await (await fetch('api/getEvents', {
        body: JSON.stringify({type}),
        method: 'POST',
        headers: {'Content-type': 'application/json'},
      })).json()).data;
      setEvents(r);
    })();
    setLoading(false);
  }, [type]);
  useEffect(() => {
    if (type) setTitle(type.charAt(0).toUpperCase() + type.slice(1));
  }, [type]);
  return (
    <div className='py-10 lg:ml-40 md:ml-20 ml-10'>
      <Title text={title} className='mb-3'/>
      <HorizontalScroll>
        {!loading && events.length > 0 && events.map((u, k) =>
          <Card key={k}>
            <div>
              {u.title}
            </div>
            <div>
              {u.descriptionText}
            </div>
            <div>
              {u.startDateTime}
            </div>
            <div>
              {u.RSVP}
            </div>
            <div>
              limit {u.limit}
            </div>
            <div>
              hash: {u.hash}
            </div>
          </Card>,
        )}
        {
          !loading && events.length==0 &&
          <div>
            No {title} events.
          </div>
        }
      </HorizontalScroll>
    </div>
  );
};
