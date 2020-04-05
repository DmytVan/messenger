import {useEffect} from 'react';
import ReactDOM from 'react-dom';

const modalContainer = document.getElementById('modal-root');

const ModalWindow = (props) => {
    const el = document.createElement('div');

    useEffect(() => {
        modalContainer.appendChild(el);
        return () => {
            modalContainer.removeChild(el)
        };
    }, [el]);

    return ReactDOM.createPortal(props.children, el)
};

export default ModalWindow;
