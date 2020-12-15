import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cropper from 'react-cropper';
import Dropzone from 'react-dropzone';
import { closeModal } from '../../../../redux/global_modal/actions';
import { updateProfilePicture } from '~/redux/meetings/action';
import 'cropperjs/dist/cropper.css';

const Avatar = () => {
    const [loader, setLoader] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [image, setImage] = useState();
    const [disabled, setDisabled] = useState(true);
    const [cropData, setCropData] = useState('#');
    const [cropper, setCropper] = useState();
    const [userProfileImage, setUserProfileImage] = useState('');
    const [userProfileImageName, setUserProfileImageName] = useState();
    const dispatch = useDispatch();

    /**
     *
     * @param image
     */
    const onProfileImageChange = image => {
        let files;
        files = image;
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
        setPreviewImage(URL.createObjectURL(image[0]));
        setUserProfileImage(image[0]);
        setUserProfileImageName(image[0].name);
        userProfileImage == 'undefined' || '' ? setDisabled(true) : setDisabled(false);
    };

    const uploadProfileImage = () => {
        setLoader(true);
        var formData = new FormData();

        formData.append('meeter_image', userProfileImage, userProfileImageName);
        dispatch(updateProfilePicture(formData)).then(resp => {
            setLoader(false);
            dispatch(closeModal());
            setPreviewImage(null);
            setCropData('#');
            setCropper();
        });
    };

    const getCropData = () => {
        if (typeof cropper !== 'undefined') {
            setCropData(cropper.getCroppedCanvas().toDataURL());
            const finalImage = cropper.getCroppedCanvas().toBlob(blob => {
                if (!blob) {
                    console.error('Canvas is empty');
                    return;
                } else {
                    setUserProfileImage(blob);
                }
            }, 'image/jpg');
        }
    };

    return (
        <div>
            <div className='modal-header'>
                <h5 className='modal-title small-size align-self-center'>Upload your photo</h5>
                <button type='button' className='close' onClick={() => dispatch(closeModal())}>
                    <span aria-hidden='true'>&times;</span>
                </button>
            </div>
            <div className='MeeterLine mx-0'></div>
            <div image className='modal-body pb-0'>
                <div className={previewImage != null ? 'd-block' : 'd-none'}>
                    <div style={{ width: '100%' }}>
                        <Cropper
                            style={{ height: 350, width: '100%' }}
                            initialAspectRatio={1}
                            src={image}
                            viewMode={1}
                            guides={true}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                            onInitialized={instance => {
                                setCropper(instance);
                            }}
                        />
                    </div>
                </div>

                <div className={previewImage != null ? 'd-flex change-cropbtn' : ''}>
                    <div className={previewImage != null ? 'd-block text-right' : 'd-none'}>
                        <button className='btn primary-btn ml-auto mb-3 medium-size updatePhoto' onClick={getCropData}>
                            Crop Image
                        </button>
                    </div>
                    <div className='profile'>
                        <Dropzone multiple={false} onDrop={acceptedFiles => onProfileImageChange(acceptedFiles)}>
                            {({ getRootProps, getInputProps }) => {
                                return (
                                    <>
                                        <section className='change-image'>
                                            <div
                                                {...getRootProps()}
                                                className={previewImage != null ? '' : 'photo__frame'}>
                                                <input {...getInputProps()} />
                                                <div className={previewImage != null ? 'd-block' : 'd-none'}>
                                                    <button className='btn primary-btn ml-3 mb-3 medium-size updatePhoto'>
                                                        Change Image
                                                    </button>
                                                </div>
                                                <div
                                                    className={
                                                        previewImage != null ? 'd-none' : 'd-block message is-empty'
                                                    }>
                                                    <i
                                                        className='fa fa-picture-o d-block opacity-4 mb-1'
                                                        aria-hidden='true'></i>
                                                    <p
                                                        className='message--desktop medium-size mb-1'
                                                        style={{ display: 'inline-block' }}>
                                                        Drop your photo here,
                                                        <span className='blue'> or browse</span>
                                                    </p>
                                                    {/* <p className='message--mobile mb-1'>
                                                        Tap here to select your picture.
                                                    </p> */}
                                                    <p className='small-size opacity-6 mb-1'>
                                                        Supported formats: JPG, PNG, BMP
                                                    </p>
                                                </div>
                                            </div>
                                        </section>
                                    </>
                                );
                            }}
                        </Dropzone>
                    </div>
                </div>
                <div className={previewImage != null ? 'd-block crop-imagebox' : 'd-none'}>
                    <img
                        style={{ width: '100%' }}
                        className={cropData != '#' ? 'd-block' : 'd-none'}
                        src={cropData}
                        alt='cropped'
                    />
                </div>
            </div>
            <div className='photo__options'>
                <div className='updateBtn d-flex pb-3'>
                    <button className='btn discard ml-0 medium-size opacity-6' onClick={() => dispatch(closeModal())}>
                        Discard
                    </button>
                    <button
                        content='Update'
                        disabled={disabled}
                        className='btn primary-btn ml-auto medium-size updatePhoto'
                        onClick={() => uploadProfileImage()}
                        positive>
                        {loader ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Avatar;
