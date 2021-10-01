const RsvpSubmission = ({
  flag,
}: {
  flag: string | string[]
}) => {
  return (
    <>
      <div>
        {flag == 'true'? (
          <div>
          RSVP Recorded!
          </div>
        ): (
          <div>
            There was an error
          </div>
        )}
      </div>
    </>
  );
};

export default RsvpSubmission;
