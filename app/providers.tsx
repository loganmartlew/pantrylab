import { FC, ReactNode } from 'react';
import RootStyleRegistry from './style-provider';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import relative from 'dayjs/plugin/relativeTime';

interface Props {
  children: ReactNode;
}

dayjs.extend(relative);
dayjs.extend(customParseFormat);

const Providers: FC<Props> = ({ children }) => {
  return <RootStyleRegistry>{children}</RootStyleRegistry>;
};

export default Providers;
