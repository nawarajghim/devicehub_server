type Device = {
    name: string;
    deviceClass: string;
    deviceType: string;
    location?: string;
    settings?: string;
    status: string;
    data: {
        [key: string]: string;
    };
    last_updated: Date;
}

export {Device};