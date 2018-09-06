import { PureComponent, createElement } from 'react';
import { bool, func, shape, string } from 'prop-types';

import classify from 'src/classify';
import Icon from 'src/components/Icon';
import Trigger from 'src/components/Trigger';
import Tree from './categoryTree';
import defaultClasses from './navigation.css';

class Navigation extends PureComponent {
    static propTypes = {
        classes: shape({
            body: string,
            header: string,
            root: string,
            root_open: string,
            title: string,
            trigger: string
        }),
        closeDrawer: func.isRequired,
        getAllCategories: func.isRequired,
        isOpen: bool
    };

    static getDerivedStateFromProps(props, state) {
        if (!state.rootNodeId && props.rootCategoryId) {
            return {
                ...state,
                rootNodeId: props.rootCategoryId
            };
        }

        return state;
    }

    async componentDidMount() {
        this.props.getAllCategories();
    }

    state = {
        rootNodeId: null
    };

    get categoryTree() {
        const { rootNodeId } = this.state;
        const { categories } = this.props;

        if (!rootNodeId) {
            return null;
        }

        return (
            <Tree
                nodes={categories}
                rootNodeId={rootNodeId}
                updateRootNodeId={this.setRootNodeId}
            />
        );
    }

    get backButton() {
        const { rootNodeId } = this.state;
        const { rootCategoryId } = this.props;

        if (!rootNodeId || rootNodeId === rootCategoryId) {
            return null;
        }

        return (
            <Trigger action={this.goUpOneLevel}>
                <Icon name="arrow-left" />
            </Trigger>
        );
    }

    goUpOneLevel = () => {
        const { categories } = this.props;

        this.setState(({ rootNodeId }) => ({
            rootNodeId: categories[rootNodeId].parentId
        }));
    };

    setRootNodeId = rootNodeId => {
        this.setState(() => ({ rootNodeId }));
    };

    render() {
        const { backButton, categoryTree, props } = this;
        const { classes, closeDrawer, isOpen } = props;
        const className = isOpen ? classes.root_open : classes.root;

        return (
            <aside className={className}>
                <div className={classes.header}>
                    {backButton}
                    <h2 className={classes.title}>
                        <span>Main Menu</span>
                    </h2>
                    <Trigger className={classes.trigger} action={closeDrawer}>
                        <Icon name="x" />
                    </Trigger>
                </div>
                <div className={classes.body}>{categoryTree}</div>
            </aside>
        );
    }
}

export default classify(defaultClasses)(Navigation);
