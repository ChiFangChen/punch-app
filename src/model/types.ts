export interface State<T> {
  isReady: boolean;
  data: T;
}

export type RootState = {
  config: State<Config>;
  history: State<Record[]>;
};

export interface App {
  range: number;
  latitude: number;
  longitude: number;
}

interface User {
  gps?: boolean;
  coordinates?: [number, number];
  distance?: number;
  inDistance: boolean;
}
export interface Config {
  app: App;
  user: User;
}

export interface Record {
  timestamp: number;
  action: 'in' | 'out';
  address: string;
}
