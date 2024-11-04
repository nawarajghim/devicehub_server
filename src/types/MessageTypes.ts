type MessageResponse = {
  message: string;
};

type ErrorResponse = MessageResponse & {
  stack?: string;
};

type RoleResponse = MessageResponse & {
  data: {role: string};
};

export {MessageResponse, ErrorResponse, RoleResponse};
