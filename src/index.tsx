import { h, render } from 'preact'
import './styles.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import { App } from '~/app'

render(<App />, document.getElementById('app')!);