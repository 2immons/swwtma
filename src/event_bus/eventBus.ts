import mitt from "mitt";

type Events = {
  toggleFooterVisibility: boolean;
  toggleWorldStatictics: boolean;
  toggleHeaderBackBtnVisibility: boolean;

  headerBackBtnPressed: boolean;
  disableSettingButton: boolean;

  showErrorPopup: string;
  showInfoPopup: string;
};

export const eventBus = mitt<Events>();
