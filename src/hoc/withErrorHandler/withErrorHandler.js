import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrapperComponent, axios) => {
    return props => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <Modal 
                    modalClosed={clearError}
                    show={error}>
                    {error ? error.message : null}
                </Modal>
                <WrapperComponent {...props} />
            </Aux>
        )
    }
}

export default withErrorHandler;