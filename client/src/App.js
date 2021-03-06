import React from 'react';
import { BrowserRouter ,Route, Switch, Link } from 'react-router-dom'
import Single from './Single'
import Multiple from './Multiple'
import SaveInDb from './SaveInDb'
import UsingGFS from './UsingGFS';
import GFBucket from './GFBucket';

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex justify-content-around mt-1">
        <Link className="btn btn-outline-primary" to="/single">Single</Link>
        <Link className="btn btn-outline-primary" to="/multiple">Multiple</Link>
        <Link className="btn btn-outline-primary" to="/saveindb">In DB</Link>
        <Link className="btn btn-outline-primary" to="/gfs">Using GFS</Link>
        <Link className="btn btn-outline-primary" to="/gfbuckect">GFS Bucket</Link>
      </div>

      <Switch>
        <Route exact path="/single" component={Single} />
        <Route exact path="/multiple" component={Multiple} />
        <Route exact path="/saveindb" component={SaveInDb} />
        <Route exact path="/gfs" component={UsingGFS} />
        <Route exact path="/gfbuckect" component={GFBucket} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;