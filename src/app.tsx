import Router, { Route } from 'preact-router'
import { h } from 'preact'
import { Link } from 'preact-router/match'
import { Page1 } from '~/pages/page1'
import { Page2 } from '~/pages/page2'
import { Home } from '~/pages/home'
import { FormPage } from '~/pages/form-page'
import { MasterSlavePage } from '~/pages/master-slave'

const Routes = {
  Home: '/',
  Page1: '/page1',
  Page2: '/page2',
  FormExample: '/form-example',
  MasterSlave: '/master-slave',
}

export const App = () => (
  <div class="container mb-5">
    <h1 class="bg-success p-3 text-center text-white bg-dark">preact test</h1>
    <ul class="nav">
      <RouteLink href={Routes.Home} name="Home" />
      <RouteLink href={Routes.Page1} name="Page 1" />
      <RouteLink href={Routes.Page2} name="Page 2" />
      <RouteLink href={Routes.FormExample} name="Page with form" />
      <RouteLink href={Routes.MasterSlave} name="Master/Slave" />
    </ul >
    <div>
      <Router>
        <Route path={Routes.Page1} component={Page1} />
        <Route path={Routes.Page2} component={Page2} />
        <Route path={Routes.FormExample} component={FormPage} />
        <Route path={Routes.MasterSlave} component={MasterSlavePage} />
        <Route default component={Home} />
      </Router>
    </div>
  </div>
)

const RouteLink = (props: { href: string, name: string }) => (
  <li class="nav-item"><Link class="nav-link" activeClassName="active" href={props.href}>{props.name}</Link></li>
)
