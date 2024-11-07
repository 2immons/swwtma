// eventBus.ts
import mitt from 'mitt';

type Events = {
  toggleFooterVisibility: boolean;
  toggleWorldStatictics: boolean;
  toggleHeaderBackBtnVisibility: boolean;
};

export const eventBus = mitt<Events>();
