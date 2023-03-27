import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useMealDetails } from '~/features/meal/useMealDetails';

const MealDetailsPage: FC = () => {
  const { id } = useParams();
  const { meal } = useMealDetails(id || '');

  return <div>{meal?.name || 'no meal'}</div>;
};

export default MealDetailsPage;
