import dva from 'dva';
import {message} from 'antd';
// import createLoading from 'dva-loading'

import './index.css';
import {registerModels} from "./models/index"



message.config({
  top: 10,
  duration: 2,
});
// 1. Initialize
const app = dva({
  onError(error) {
    // const type = error.type;
    // if (type == "Error") {
    //   message.error(error.message);
    // }
    // else if (type == "Success") {
    //   message.success(error.message);
    // }
    message.error(error.message);
  },
});

registerModels(app);

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
