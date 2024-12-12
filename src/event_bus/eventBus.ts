// eventBus.ts
import mitt from "mitt";

type Events = {
  toggleFooterVisibility: boolean;
  toggleWorldStatictics: boolean;
  toggleHeaderBackBtnVisibility: boolean;
  disableSettingButton: boolean;
  showErrorPopup: string;
};

export const eventBus = mitt<Events>();
