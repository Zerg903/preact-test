import Router, { Route } from 'preact-router'
import { h } from 'preact'
import { Page1 } from '~/pages/page1'
import { Page2 } from '~/pages/page2'
import { Home } from '~/pages/home'
import { TopNav } from '~/components/top-nav'

export const App = () => (
  <div class="container">
    <h1 class="bg-success p-3 text-center text-white bg-dark">preact test</h1>
    <TopNav />
    <div>
      <Router>
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
        <Route default component={Home} />
      </Router>
    </div>
  </div>
)
