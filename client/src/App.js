import React from 'react';
import { BrowserRouter ,Route, Switch, Link } from 'react-router-dom'
import SaveInServer from './SaveInServer';
import Single from './Single'
import Multiple from './Multiple'
import SaveInDb from './SaveInDb'

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex justify-content-around mt-1">
        <Link className="btn btn-outline-primary" to="/single">Single</Link>
        <Link className="btn btn-outline-primary" to="/multiple">Multiple</Link>
        <Link className="btn btn-outline-primary" to="/saveindb">In DB</Link>
      </div>

      <Switch>
        <Route exact path="/single" component={Single} />
        <Route exact path="/multiple" component={Multiple} />
        <Route exact path="/saveindb" component={SaveInDb} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;