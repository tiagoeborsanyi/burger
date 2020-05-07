import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrapperComponent, axios) => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                show: false
            }
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                // this.setState({error: error});
                if (error) {
                    this.setState({show: true, error: error})
                }
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.request.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({show: false})
        }

        render() {
            return (
                <Aux>
                    <Modal 
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.show}>
                        {this.state.show ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </Aux>
            )
        }
    }
}

export default withErrorHandler;