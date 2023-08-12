export type createIntergationType = {
  Params: {
    id: string;
  };
  Body: {
    provider: string;
    value: any;
  };
};

export type PauseIntergationType = {
  Params: {
    id: string;
  };
  Body: {
    provider: string;
  };
};

export type DeleteIntergationType = {
  Params: {
    id: string;
  };
  Body: {
    provider: string;
  };
};

export type GetChannelsByProviderType = {
  Params: {
    id: string;
  };
};

export type GetIntergationType = {
  name?: string;
  channel?: string;
  logo?: string;
  link?: string;
  description?: string;
  fields: {
    name: string;
    type: string;
    title: string;
    inputType: string;
    description: string;
    help: string;
    requiredMessage: string;
    value: string;
    defaultValue: string;
  }[];
  isPaused?: boolean;
  status?: string;
  color?: string;
  textColor?: string;
  connectBtn?: {
    text: string;
    link: string;
  } | null;
};
