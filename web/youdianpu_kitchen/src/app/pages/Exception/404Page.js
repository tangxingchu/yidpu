import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Exception from '../../components/Exception';
import { Button } from 'antd';
import PropTypes from 'prop-types';

class NotFound extends Component {

    render() {
        const { host = '' } = this.props;
        return (
            <Exception
                type="404"
                //img={`${host}/static/img/404.svg`}
                style={{ minHeight: 500, height: '80%' }}
                linkElement={Link}
                actions={
                    <Link to='/'>
                        <Button type="primary">返回首页</Button>
                    </Link>
                }
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
    };
};

export default withRouter(
    connect(mapStateToProps, {
    })(NotFound)
);
