
import loginModel from './login';
import appModel from './app';
import whitelistModel from './White/whitelist';
import white from './White/white';
import whiteapproveModel from './White/whitelistapprove';


export function registerModels(app) {
  app.model(loginModel);
  app.model(appModel);
  app.model(whitelistModel);
  app.model(white);
  app.model(whiteapproveModel);
}
