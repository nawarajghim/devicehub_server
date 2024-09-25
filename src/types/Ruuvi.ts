type Ruuvi = {
  data: {
    data_format: number;
    humidity: number;
    temperature: number;
    pressure: number;
    acceleration: number;
    acceleration_x: number;
    acceleration_y: number;
    acceleration_z: number;
    tx_power: number;
    battery: number;
    movement_counter: number;
    measurement_sequence_number: number;
    mac: string;
    rssi: number | null;
  };
};

export {Ruuvi};
