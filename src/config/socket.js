export const socketConfig={
    cors: {
      origin: '*',
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: false,
      transports: ['websocket', 'polling'],
      allowEIO3: true,
    },
  }