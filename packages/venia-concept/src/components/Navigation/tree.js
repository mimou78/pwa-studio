import { Component, createElement } from 'react';
import { array, func, shape, string } from 'prop-types';

import classify from 'src/classify';

const defaultClasses = {};

const CategoryButton = ({ node }) => <div>{node.name}</div>;

class Tree extends Component {
    static propTypes = {
        classes: shape({
            root: string
        }),
        node: shape({
            childrenData: array.isRequired,
            id: string.isRequired,
            name: string.isRequired
        }),
        setCategory: func.isRequired
    };

    get childCategories() {
        const { node } = this.props;

        return node.childrenData.reduce((elements, child) => {
            elements[child.position - 1] = (
                <li key={child.id}>
                    <CategoryButton node={child} />
                </li>
            );

            return elements;
        }, []);
    }

    render() {
        const { childCategories, props } = this;
        const { node } = props;

        return (
            <div>
                <div>{node.name}</div>
                <ul>{childCategories}</ul>
            </div>
        );
    }
}

export default classify(defaultClasses)(Tree);
