import Event from 'common/pubSubEvent'

export const BackgroundNotification = {
  received: new Event('backgroundNotification', 'received')
};