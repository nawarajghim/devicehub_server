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

export {Device};
