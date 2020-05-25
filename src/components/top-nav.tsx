import { h } from 'preact'
import { Link } from 'preact-router/match'

export const TopNav = () => (
  <ul class="nav">
    <li class="nav-item"><Link class="nav-link" activeClassName="active" href="/">Home</Link></li>
    <li class="nav-item"><Link class="nav-link" activeClassName="active" href="/page1">Page 1</Link></li>
    <li class="nav-item"><Link class="nav-link" activeClassName="active" href="/page2">Page 2</Link></li>
  </ul >
)