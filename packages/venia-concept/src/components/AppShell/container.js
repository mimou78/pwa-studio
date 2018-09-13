import { connect } from 'react-redux';

import { closeDrawer } from 'src/actions/app';
import App from './app';

const mapDispatchToProps = { closeDrawer };

const mapStateToProps = ({ app }) => ({ app });

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
