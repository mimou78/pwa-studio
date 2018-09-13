import { Component, createElement } from 'react';
import CategoryList from 'src/components/CategoryList';

export default class CMS extends Component {
    render() {
        return (
            <article>
                <CategoryList title="Shop by category" id={2} />
            </article>
        );
    }
}
