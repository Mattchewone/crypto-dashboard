import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'

export const host = process.env.API_HOST || 'http://localhost:3030'

const socket = io(host, { transports: ['websocket'] })

const feathersClient = feathers()
  .configure(socketio(socket))

export default feathersClient
