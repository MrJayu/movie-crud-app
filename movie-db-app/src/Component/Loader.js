import React from 'react';
import Modal from './Modal';
function Loader({ show }) {
    return (
        <Modal show={show}>
            <div style={{
                fontSize: 50,
                color: 'red',
            }} >
                <i className="fa fa-cog fa-spin" />
            </div>
        </Modal>

    );
}

export default Loader;
