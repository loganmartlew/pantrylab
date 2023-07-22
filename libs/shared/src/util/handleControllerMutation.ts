import { NotFoundException } from '@nestjs/common';
import isErrorWithCode from './errorCodeTypeGuard';

interface HandleControllerMutationOptions {
  id: string;
  objectName: string;
}

export default async function handleControllerMutation<T>(
  mutateFn: () => Promise<T>,
  { id, objectName }: HandleControllerMutationOptions
) {
  try {
    const result = await mutateFn();
    return result;
  } catch (error) {
    if (!isErrorWithCode(error)) {
      throw error;
    }

    switch (error.code) {
      case 'P2025':
        throw new NotFoundException(`${objectName} with id: ${id} not found`);
      default:
        throw error;
    }
  }
}
