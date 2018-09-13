import { compose, createStore } from 'redux';
import { exposeSlices } from '@magento/peregrine';

import applyMiddleware from 'src/middleware';

const reducer = (state = {}) => state;
const enhancer = compose(
    applyMiddleware,
    exposeSlices
);

export default () => createStore(reducer, enhancer);
