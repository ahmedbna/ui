'use client';

import { Button } from '@/components/ui/button';

const EmailButton = () => {
  const openEmailClient = () => {
    const emailAddress = 'ahmdabdelsamea@gmail.com';
    const subject = 'Hello';

    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
      subject
    )}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className='flex flex-col items-center'>
      <Button
        variant='ghost'
        size='icon'
        onClick={openEmailClient}
        className='text-xl'
      >
        {'💌'}
      </Button>
    </div>
  );
};

export default EmailButton;
