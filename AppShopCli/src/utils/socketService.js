import io from 'socket.io-client';


import { API_BASE_URL } from '../config/urls';

class WSService {
  initializeSocket = async () => {
    try {
      this.socket = io(API_BASE_URL, {
        transports: ['websocket'],
        upgrade: true,
      });

      // console.log('initializing socket', this.socket);

      this.socket.on('connect', data => {
        console.log('=== socket connected ====');
      });

      this.socket.on('disconnect', data => {
        console.log('=== socket disconnected ====');
      });

      this.socket.on('error', data => {
        console.log('socket error', data);
      });
    } catch (error) {
      console.log('socket is not initialized', error);
    }
  };

  emit(event, data = {}) {
    this.socket.emit(event, data);
  }

  on(event, cb) {
    this.socket.on(event, cb);
  }

  removeListener(listenerName) {
    this.socket.removeListener(listenerName);
  }
}

const socketServices = new WSService();

export default socketServices;
