// Toast configuration
import { ToastContainer as _ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const ToastContainer = () => <_ToastContainer
    position='top-center'
    transition={Slide}
    closeButton={false}
    hideProgressBar={true}
    autoClose={3000} />
