const Footer = () => {
  return (
    <div className={`
    w-full
    bg-kernel-purple py-5
    font-inter text-primary
    `}>
      <div className="flex flex-row justify-center items-center">
        <span className="text-primary-muted font-secondary lowercase">
        Built at&nbsp;
          <a
            href="https://kernel.community/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-secondary uppercase"
          >
        KERNEL
          </a>
        </span>
      </div>
      {/* <div className="text-xs flex flex-row gap-3 justify-center italic">
        <span>
          If this looks like something you&apos;d like to work on (we need tons of help)&nbsp;
          <a href="mailto:angela@kernel.community" className="underline">
          please get in touch!
          </a>
        </span>
      </div> */}
    </div>
  );
};

export default Footer;
