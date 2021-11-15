import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { containerCSS } from './css'
import Request from '../Request'
import Config from '../Config'

export default function App() {
  return (
    <div className={containerCSS}>
      <BrowserRouter>
        <Switch>
          <Route path="/config">
            <Config />
          </Route>
          <Route path="/">
            <Request />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}
