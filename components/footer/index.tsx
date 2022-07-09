import type { IFooterType } from './types';

const Footer: IFooterType = ({ link, poweredBy}) => {
  return (
    <footer className='flex h-24 w-full items-center justify-center border-t'>
      <a
        className='flex items-center justify-center gap-2'
        href={link}
        target='_blank'
        rel='noopener noreferrer'
      >
        Powered by <label className='font-bold'>{poweredBy}</label>
      </a>
    </footer>
  );
};

export default Footer;
