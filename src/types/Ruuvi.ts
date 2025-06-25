type Ruuvi = {
  data: {
    humidity: number;
    temperature: number;
    pressure: number;
    mac: string;
    name: string;
  };
  timestamp: Date;
};

export {Ruuvi};
