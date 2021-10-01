const Footer = () => {
  return (
    <div className={`
    w-full flex flex-row gap-3 justify-center items-center
    bg-primary-light py-5
    font-inter text-sm font-semibold text-primary
    `}>
      <div>
        Built at &nbsp;
        <a
          href="https://kernel.community/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-secondary"
        >
        KERNEL
        </a>
      </div>
    </div>
  );
};

export default Footer;
