import { Component, createElement } from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, func, number, objectOf, shape, string } from 'prop-types';

import classify from 'src/classify';

const defaultClasses = {};
const urlSuffix = '.html';

class Leaf extends Component {
    static propTypes = {
        classes: shape({
            root: string
        }),
        nodeId: number.isRequired,
        nodes: objectOf(
            shape({
                childrenData: arrayOf(number).isRequired,
                id: number.isRequired,
                name: string.isRequired,
                urlPath: string
            })
        ),
        onSelect: func.isRequired
    };

    handleClick = () => {
        const { nodeId, onSelect } = this.props;

        onSelect(nodeId);
    };

    render() {
        const { nodeId, nodes } = this.props;
        const { childrenData: childNodeIds, name, urlPath } = nodes[nodeId];

        return childNodeIds.length ? (
            <button onClick={this.handleClick}>{name}</button>
        ) : (
            <Link to={`/${urlPath}${urlSuffix}`}>{name}</Link>
        );
    }
}

export default classify(defaultClasses)(Leaf);
