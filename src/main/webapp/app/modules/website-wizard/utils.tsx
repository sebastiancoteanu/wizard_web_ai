import { ValidSteps } from "app/modules/website-wizard/types";
import { IWebsite } from "app/shared/model/website.model";

export const isStepValid = (step: ValidSteps, draftWebsite: IWebsite) => {
  switch (step) {
    case ValidSteps.BASIC_INFO:
      return !!draftWebsite.url;
    case ValidSteps.THEME:
      return !!draftWebsite.theme;
    case ValidSteps.PAGES:
      return !!draftWebsite.theme && !!draftWebsite.url;
    default:
      return true;
  }
};
