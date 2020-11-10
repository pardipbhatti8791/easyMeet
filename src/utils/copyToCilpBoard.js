import copy from 'copy-to-clipboard';
import { errorAlert } from './sweetAlert';

/**
 *
 * @param message
 */
export const copyToClipBoard = (message) => {
    copy(message, {
        debug: true,
        message: 'Press #{key} to copy'
    });
    errorAlert({ message: "Copied to clip board" }, 'success');
};