type Device = {
  name: string;
  deviceClass: string;
  deviceType: string;
  location?: string;
  settings?: string;
  status: string;
  data: {
    [key: string]: string | number | boolean;
  };
  last_updated: Date;
};

export type DetectedDevice = {
  event_type: string;
  data: {device_name: string};
  last_updated: Date;
};

export {Device};
