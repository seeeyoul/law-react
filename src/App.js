import React from 'react';
import Nav from './common/Nav';
import {HashRouter,Route} from 'react-router-dom';
import store from "./redux/store";
import {Provider} from "react-redux";
import BlackboxClassify from "./pages/Blackbox/Classify"
import BlackboxKnowledge from "./pages/Blackbox/Knowledge";
import BlackboxAbstractExtraction from "./pages/Blackbox/AbstractExtraction";
import WhiteboxAbstractExtraction from "./pages/Whitebox/AbstractExtraction";
import WhiteboxKnowledge from "./pages/Whitebox/Knowledge";
import WhiteboxClassify from "./pages/Whitebox/Classify";
import Header from "./common/Header";

function App() {
  return (
      <Provider store={store}>
        <div className="App">
            <Header/>
            <HashRouter>
                <div className="row-center-center">
                    <Nav/>
                    <div className='main column-center-start'>
                        <Route path="/" exact component={BlackboxClassify} />
                        <Route path="/whitebox_classify" exact component={WhiteboxClassify} />
                        <Route path="/blackbox_knowledge" exact component={BlackboxKnowledge} />
                        <Route path="/whitebox_knowledge" exact component={WhiteboxKnowledge} />
                        <Route path="/blackbox_abstract_extraction" exact component={BlackboxAbstractExtraction} />
                        <Route path="/whitebox_abstract_extraction" exact component={WhiteboxAbstractExtraction} />
                    </div>
                </div>
            </HashRouter>
        </div>
      </Provider>
  );
}

export default App;
