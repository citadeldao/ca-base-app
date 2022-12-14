import { requests } from './requests';

export function getRequest(type = 'general') {
  return requests[type];
}
