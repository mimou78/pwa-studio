import { Component, createElement } from 'react'
import { bool, func, shape, string } from 'prop-types'

import { Page } from '@magento/peregrine'

export default () => (
    <div>
        <header>hello world</header>
        <Page />
    </div>
)

// import classify from 'src/classify'
// import defaultClasses from './appShell.css'

// class AppShell extends Component {
//     static propTypes = {
//         app: shape({
//             drawer: string,
//             overlay: bool.isRequired,
//         }).isRequired,
//         classes: shape({
//             root: string,
//             root_masked: string,
//         }),
//         closeDrawer: func.isRequired,
//     };

//     render() {
//         const { app, children, classes, closeDrawer } = this.props;
//         const { drawer, overlay } = app;
//         const navIsOpen = drawer === 'nav';
//         const cartIsOpen = drawer === 'cart';
//         const className = overlay ? classes.root_masked : classes.root;

//         return (
//             <div className={className}>
//                 <Main isMasked={overlay}>{children}</Main>
//                 <Mask isActive={overlay} dismiss={closeDrawer} />
//                 <Navigation isOpen={navIsOpen} />
//                 <MiniCart isOpen={cartIsOpen} />
//             </div>
//         )
//     }
// }

// export default classify(defaultClasses)(AppShell)
