import { connect } from 'redux'

import { closeDrawer } from 'src/actions/app'
import AppShell from './appShell'

const mapDispatchToProps = { closeDrawer }

const mapStateToProps = ({ app }) => ({ app })

export default connect(mapStateToProps, mapDispatchToProps)(AppShell)
