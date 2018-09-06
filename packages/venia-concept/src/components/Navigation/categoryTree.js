import { Component, createElement } from 'react';
import { func, number, objectOf, shape, string } from 'prop-types';

import classify from 'src/classify';
import Leaf from './categoryLeaf';

const defaultClasses = {};

class Tree extends Component {
    static propTypes = {
        classes: shape({
            root: string
        }),
        nodes: objectOf(
            shape({
                id: number.isRequired,
                position: number.isRequired
            })
        ),
        rootNodeId: number.isRequired,
        updateRootNodeId: func.isRequired
    };

    get leaves() {
        const { nodes, rootNodeId, updateRootNodeId } = this.props;
        const { childrenData: childNodeIds } = nodes[rootNodeId];

        return childNodeIds.reduce((elements, childNodeId) => {
            const childNode = nodes[childNodeId];
            const { id, position } = childNode;

            elements[position - 1] = (
                <li key={id}>
                    <Leaf
                        nodeId={id}
                        nodes={nodes}
                        onSelect={updateRootNodeId}
                    />
                </li>
            );

            return elements;
        }, []);
    }

    render() {
        const { leaves, props } = this;
        const { nodes, rootNodeId } = props;
        const rootNode = nodes[rootNodeId];

        return (
            <div>
                <div>{rootNode.name}</div>
                <ul>{leaves}</ul>
            </div>
        );
    }
}

export default classify(defaultClasses)(Tree);
