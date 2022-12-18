import Link from 'next/link';

import Card from '@/components/Card';

const CardButton = ({ href, className, children }) => (
  <Link href={href}>
    <a>
      <Card color="white" className={className}>
        {children}
      </Card>
    </a>
  </Link>
);

export default CardButton;