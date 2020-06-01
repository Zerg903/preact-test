import Router, { Route } from 'preact-router'
import { h } from 'preact'
import { Link } from 'preact-router/match'
import { CounterExample } from '~/pages/counter-example'
import { FetchExample } from '~/pages/fetch-example'
import { Home } from '~/pages/home'
import { FormExample } from '~/pages/form-example'
import { MasterSlaveExample } from '~/pages/master-slave-example '

const Routes = {
  Home: '/',
  CounterExample: '/counter',
  FetchExample: '/fetch',
  FormExample: '/form',
  MasterSlaveExample: '/master-slave',
}

export const App = () => (
  <div class="container mb-5">
    <h1 class="bg-success p-3 text-center text-white bg-dark">preact test</h1>
    <ul class="nav">
      <RouteLink href={Routes.Home} name="Home" />
      <RouteLink href={Routes.CounterExample} name="Counter" />
      <RouteLink href={Routes.FetchExample} name="Fetch example" />
      <RouteLink href={Routes.FormExample} name="Form example" />
      <RouteLink href={Routes.MasterSlaveExample} name="Master/Slave example" />
    </ul >
    <div>
      <Router>
        <Route path={Routes.CounterExample} component={CounterExample} />
        <Route path={Routes.FetchExample} component={FetchExample} />
        <Route path={Routes.FormExample} component={FormExample} />
        <Route path={Routes.MasterSlaveExample} component={MasterSlaveExample} />
        <Route default component={Home} />
      </Router>
    </div>
  </div>
)

const RouteLink = (props: { href: string, name: string }) => (
  <li class="nav-item"><Link class="nav-link" activeClassName="active" href={props.href}>{props.name}</Link></li>
)
