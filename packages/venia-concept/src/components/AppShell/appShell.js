import { Component, createElement } from 'react';
import { func, shape } from 'prop-types';

let App;
const reducers = ['app', 'cart', 'catalog', 'checkout', 'directory'];

class AppShell extends Component {
    static propTypes = {
        store: shape({
            addReducers: func.isRequired
        }).isRequired
    };

    state = {
        ready: false
    };

    async componentDidMount() {
        const { store } = this.props;

        // import dependencies asynchronously
        // all reducers will be bundled into a single chunk
        const [AppModule, ...reducerModules] = await Promise.all([
            import('./container'),
            ...reducers.map((reducer /* webpackMode: "lazy-once" */) =>
                import(`src/reducers/${reducer}`)
            )
        ]);

        // assign imported components
        App = AppModule.default;

        // add imported reducers to the store
        store.addReducers(reducerModules.map(mod => [mod.name, mod.default]));

        // update state and re-render
        this.setState(() => ({ ready: true }));
    }

    render() {
        return this.state.ready ? <App /> : <div>hello world</div>;
    }
}

export default AppShell;
