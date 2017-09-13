import React, { Component } from 'react';
import styleable from 'react-styleable';
import { connect } from 'react-redux';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Isvg from 'react-inlinesvg';
import css from './delete-me.scss';
import { getAlbum } from './delete-me-actions';

import pngSrc from './images/rotating_flags.png';
import jpegSrc from './images/cross.jpeg';
import jpgSrc from './images/ausHeader.jpg';
import svgSrc from './images/math-logo.svg';
import gifSrc from './images/404-guy.gif';

@styleable(css)
class DeleteMe extends Component {
    static propTypes = {
        options: PropTypes.object,
        getAlbum: PropTypes.func,
        albumTitle: PropTypes.string
    };

    componentWillUpdate() {
    }

    constructor(props) {
        super(props);

        this.getFirstAlbum = this.getFirstAlbum.bind(this);
    }

    render() {
        let albumDiv;

        if (this.props.albumTitle) {
            albumDiv = <div><b>Album title is:</b> {this.props.albumTitle}</div>;
        } else {
            albumDiv = <div><button onClick={this.getFirstAlbum}>Get Album</button></div>;
        }

        const pngBG = `${css.img_container} ${css['png-css']}`;
        const jpegBG = `${css.img_container} ${css['jpeg-css']}`;
        const jpgBG = `${css.img_container} ${css['jpg-css']}`;
        const svgBG = `${css.img_container} ${css['svg-css']}`;
        const gifBG = `${css.img_container} ${css['gif-css']}`;

        return (
            <div className={css.component}>
                <h1>Please Delete Me, Let Me Go.</h1>
                <p>{this.props.options.hint}</p>
                <h2>Test: {'<img src={import...from...}>'}</h2>
                <div className={css['flex-row']}>
                    <img alt="" src={pngSrc} />
                    <img alt="" src={jpegSrc} />
                    <img alt="" src={jpgSrc} />
                    <Isvg alt="" src={svgSrc} />
                    <img alt="" src={gifSrc} />
                </div>
                <h2>Test: {'<div className="css-backgroundImage-url">'}</h2>
                <div className={css['flex-row']}>
                    <div className={pngBG} />
                    <div className={jpegBG} />
                    <div className={jpgBG} />
                    <div className={svgBG} />
                    <div className={gifBG} />
                </div>
                {albumDiv}
                <div>
                    <Link to="/">Home</Link><br />
                    <Link to="/delete-me">Delete me route</Link><br />
                    <Link to="/delete-me/read-params">Read params child route</Link>
                    <Switch>
                        <Route path="/delete-me/read-params" render={() => (<div>Params: {location.search}</div>)} />
                        <Route render={() => (<div>No route found for: {location.pathname}</div>)} />
                    </Switch>
                </div>
            </div>
        );
    }

    getFirstAlbum() {
        this.props.getAlbum({ id: 1 });
    }
}

function mapStateToProps(state) {
    return {
        albumTitle: state.deleteMe.albumTitle
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getAlbum
    }, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteMe));
