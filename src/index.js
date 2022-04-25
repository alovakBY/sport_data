import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import { Router } from "./routes/Router";
import { MainLayout } from "./components/MainLayout";

import { configureStore } from "./redux/configureStore";

import "./index.css";

// import { parseGroupMarkets } from "./utils/parseGroupMarkets";

// parseGroupMarkets({
//    "first-half|0": [
//       "1825951234|ah|-2.5|1||2|4|5066642602~home~1.850~~~0~1~154731456536~0!5066642603~away~1.890~~~0~1~154731456537~0|0|0|53451411592",
//       "1823506043|ou|78|1||3|4|5060358704~under~1.880~~~0~1~154666663131~0!5060358705~over~1.860~~~0~1~154666663132~0|0|0|53428969830",
//    ],
//    "full_event|0": [
//       "1823420299|ah|-6|1||2|4|5060118718~home~1.950~~~0~1~154660964369~0!5060118719~away~1.850~~~0~1~154660964370~0|0|0|53427005503",
//       "1823420304|ou|156|1||3|4|5060118728~under~1.940~~~0~1~154660964379~0!5060118729~over~1.860~~~0~1~154660964380~0|0|0|53427005508",
//       "1823506041|ou_home|81|1||22|4|5060358700~under~1.870~~~0~1~154666663127~0!5060358701~over~1.870~~~0~1~154666663128~0|0|0|53428969828",
//       "1826240636|ou_away|75.5|1||23|4|5067411709~under~1.870~~~0~1~154735779220~0!5067411710~over~1.870~~~0~1~154735779221~0|0|0|53452786584",
//       "1823420294|12||1||213|4|5060118708~home~1.420~~~0~1~154660964359~0!5060118709~away~2.880~~~0~1~154660964360~0|0|0|53427005498",
//    ],
//    "ordinary_time|0": [
//       "1823420307|1x2||1||1|4|5060118734~home~1.440~~~0~1~154660964385~0!5060118735~draw~20.500~~~0~1~154660964386~0!5060118736~away~3.000~~~0~1~154660964387~0|0|0|53427005511",
//    ],
// });

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <MainLayout>
               <div className="center">
                  <Router />
               </div>
            </MainLayout>
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
);
