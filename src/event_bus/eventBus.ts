// eventBus.ts
import mitt from "mitt";

type Events = {
  toggleFooterVisibility: boolean;
  toggleWorldStatictics: boolean;
  toggleHeaderBackBtnVisibility: boolean;
  disableSettingButton: boolean;
};

export const eventBus = mitt<Events>();
