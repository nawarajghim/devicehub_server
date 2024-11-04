type Ruuvi = {
  data: {
    humidity: number;
    temperature: number;
    pressure: number;
    mac: string;
  };
  timestamp: Date;
};

export {Ruuvi};
