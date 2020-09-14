import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserBio } from '~/redux/boarding/action';
import Modal from 'react-bootstrap/Modal';
import { updateAvailability } from '~/redux/boarding/action';
import { checkAvailability } from '~/redux/boarding/action';
import { updateProfilePicture } from '~/redux/meetings/action';
import Dropzone from 'react-dropzone';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

function UserInfo() {
  const dispatch = useDispatch();
  const [openImagePopUp, setOpenImagePopUp] = useState(false);
  const [openBioPopUp, setOpenBioPopUp] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);
  const [switchAvailability, setSwitchAvailability] = useState(true);
  const [availabilityDuration, setAvailabilityDuration] = useState({
    value: '30 minutes',
  });
  const [userProfileImage, setUserProfileImage] = useState();
  const [userProfileImageName, setUserProfileImageName] = useState();
  const [editBio, setEditBio] = useState({ value: '' });
  const [previewImage, setPreviewImage] = useState(null);
  const userInfo = useSelector((state) => state.auth.user);
  const {
    availibility: { meeter_availibility, available_for },
  } = userInfo;

  useEffect(() => {
    dispatch(checkAvailability(userInfo.id));
    setEditBio({ value: userInfo.meeter_bio });
  }, []);

  if (userInfo !== null) {
  }
  const openAvailabilityPopup = (value) => {
    if (value == false) {
      setOpenAvailability(true);
    } else {
      setOpenAvailability(false);
      const data = {
        meeter_availibility: 'no',
      };
      dispatch(updateAvailability(data));
    }
  };
  const changeAvailability = () => {
    if (openAvailability == true) {
      const data = {
        meeter_availibility: 'yes',
        time_duration: availabilityDuration.value,
      };
      dispatch(updateAvailability(data));
    } else {
      const data = {
        meeter_availibility: 'no',
      };
      dispatch(updateAvailability(data));
    }
    setOpenAvailability(false);
  };
  const updateBio = () => {
    const data = {
      meeter_bio: editBio.value,
    };
    dispatch(updateUserBio(data));
    setOpenBioPopUp(false);
  };
  const handleBioChange = (event) => {
    setEditBio({ value: event.target.value });
  };
  const switchAvailabitly = (e) => {
    if (e == false) {
      setSwitchAvailability(true);
    } else {
      setSwitchAvailability(false);
    }
  };
  const changeAvailabilityDuration = (value) => {
    setAvailabilityDuration({ value: value });
  };
  const onProfileImageChange = (image) => {
    console.log(image);
    // e.preventDefault();
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
  };
  const uploadProfileImage = () => {
    var formData = new FormData();
    formData.append('meeter_image', userProfileImage, userProfileImageName);
    dispatch(updateProfilePicture(formData));
    setOpenImagePopUp(false);
    setCropData('#');
    setCropper();
  };
  const [image, setImage] = useState();
  const [cropData, setCropData] = useState('#');
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
      const finalImage = cropper.getCroppedCanvas().toBlob((blob) => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        } else {
          setUserProfileImage(blob);
        }
      }, 'image/jpeg');
    }
  };

  return (
    <>
      <section className='personal-details bg-white pb-4'>
        <div className='container'>
          <div className='row'>
            <div className='media text-left'>
              <div className='align-self-center text-center mr-3 default-opacity avatar-container'>
                <img
                  id='openDrag'
                  className='mb-1'
                  src={
                    userInfo.meeter_image_slug === ''
                      ? '/assets/images/photo.png'
                      : userInfo.meeter_image_slug
                  }
                  alt='photo'
                  onClick={() => setOpenImagePopUp(true)}
                />
                <Modal
                  show={openImagePopUp}
                  onHide={() => setOpenImagePopUp(false)}
                  dialogClassName='modal-dialog-centered profile-photo-dialog'
                >
                  <div className='modal-header'>
                    <h5 className='modal-title small-size align-self-center'>
                      Upload your photo
                    </h5>
                    <button
                      type='button'
                      className='close'
                      onClick={() => setOpenImagePopUp(false)}
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='MeeterLine mx-0'></div>
                  <div image className='modal-body pb-0'>
                    <div
                      className={previewImage != null ? 'd-block' : 'd-none'}
                    >
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
                          onInitialized={(instance) => {
                            setCropper(instance);
                          }}
                        />
                      </div>

                      {/* <br style={{ clear: 'both' }} /> */}
                    </div>
                    {/* <img
                                                style={{ width: '80px', height: '80px' }}
                                                className={previewImage != null ? 'block' : 'none'}
                                                src={previewImage}
                                            />
                                            <Cropper
                                                src={previewImage}
                                                style={{height: 400, width: '100%'}}
                                                // Cropper.js options
                                                initialAspectRatio={16 / 9}
                                                guides={false}
                                                crop={bindImage(this)}
                                                onInitialized={onCropperInit(this)}
                                            /> */}
                    <div
                      className={
                        previewImage != null ? 'd-flex change-cropbtn' : ''
                      }
                    >
                      <div
                        className={
                          previewImage != null ? 'd-block text-right' : 'd-none'
                        }
                      >
                        <button
                          className='btn primary-btn ml-auto mb-3 medium-size updatePhoto'
                          onClick={getCropData}
                        >
                          Crop Image
                        </button>
                        {/* 
                        <img
                          style={{ width: '100%' }}
                          className={cropData != '#' ? 'd-block' : 'd-none'}
                          src={cropData}
                          alt='cropped'
                        /> */}
                      </div>
                      <div className='profile'>
                        <Dropzone
                          multiple={false}
                          onDrop={(acceptedFiles) =>
                            onProfileImageChange(acceptedFiles)
                          }
                        >
                          {({ getRootProps, getInputProps }) => {
                            return (
                              <>
                                <section
                                  className={
                                    previewImage != null
                                      ? 'change-image'
                                      : 'photo is-desktop  photo--empty'
                                  }
                                >
                                  <div
                                    {...getRootProps()}
                                    className={
                                      previewImage != null ? '' : 'photo__frame'
                                    }
                                  >
                                    <input {...getInputProps()} />
                                    <div
                                      className={
                                        previewImage != null
                                          ? 'd-block'
                                          : 'd-none'
                                      }
                                    >
                                      <button className='btn primary-btn ml-3 mb-3 medium-size updatePhoto'>
                                        Change Image
                                      </button>
                                    </div>
                                    <div
                                      className={
                                        previewImage != null
                                          ? 'd-none'
                                          : 'd-block message is-empty'
                                      }
                                    >
                                      <i
                                        className='fa fa-picture-o d-block opacity-4 mb-1'
                                        aria-hidden='true'
                                      ></i>
                                      <p className='message--desktop medium-size mb-1'>
                                        Drop your photo here,
                                        <span className='blue'> or browse</span>
                                      </p>
                                      <p className='message--mobile mb-1'>
                                        Tap here to select your picture.
                                      </p>
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
                    <div
                      className={
                        previewImage != null
                          ? 'd-block crop-imagebox'
                          : 'd-none'
                      }
                    >
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
                      <button
                        className='btn discard ml-0 medium-size opacity-6'
                        onClick={() => setOpenImagePopUp(false)}
                      >
                        Discard
                      </button>
                      <button
                        content='Update'
                        className='btn primary-btn ml-auto medium-size updatePhoto'
                        onClick={() => uploadProfileImage()}
                        positive
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </Modal>
              </div>
              <div className='media-body align-self-center'>
                <h2 className='mt-0'> {userInfo.meeter_fullname}</h2>
                <a
                  className='edit-bio small-size opacity-6'
                  onClick={() => setOpenBioPopUp(true)}
                >
                  Click to edit your bio{' '}
                  <i className='fa fa-pencil' aria-hidden='true'></i>
                </a>
                <p
                  style={{ pointer: 'cursor' }}
                  className='edit-bio small-size'
                  href='#'
                >
                  {userInfo.meeter_bio}
                </p>
                <Modal
                  show={openBioPopUp}
                  onHide={() => setOpenBioPopUp(false)}
                  dialogClassName='modal-dialog-centered'
                >
                  <div className='modal-header'>
                    <h5 className='modal-title small-size align-self-center'>
                      Update your bio
                    </h5>
                    <button
                      type='button'
                      className='close'
                      onClick={() => setOpenBioPopUp(false)}
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div className='MeeterLine mx-0'></div>

                  <div className='modal-body pb-0'>
                    <div>
                      <input
                        className='form-control small-size'
                        type='text'
                        value={editBio.value}
                        onChange={(e) => handleBioChange(e)}
                      />
                    </div>
                  </div>
                  <div className='modal-footer'>
                    <button
                      className='btn discard p-0 m-0 mr-auto medium-size opacity-6'
                      onClick={() => setOpenBioPopUp(false)}
                    >
                      Discard
                    </button>
                    <button
                      className='btn btn-primary small-size m-0 update'
                      onClick={updateBio}
                    >
                      Update Bio
                    </button>
                  </div>
                </Modal>
                <span className='url-room small-size'>
                  easymeet.io/{userInfo.meeter_meet_slug}{' '}
                  <i
                    onClick={() => {
                      navigator.clipboard.writeText(
                        'easymeet.io/' + userInfo.meeter_meet_slug
                      );
                    }}
                    className='fa fa-clone'
                    aria-hidden='true'
                  />
                </span>
              </div>
            </div>
            <div className='avilability ml-auto text-right'>
              <span className='small-size'>My Availability:</span>
              <div className='align-self-center row d-flex mx-0 my-2'>
                <div className='meeting-room align-self-center mr-3'>
                  <button className='btn btn-default meeting-btn bg-white small-size'>
                    <i className='fa fa-camera' aria-hidden='true' /> Meeting
                    Room
                  </button>
                </div>
                <Modal
                  show={openAvailability}
                  onHide={() => setOpenAvailability(false)}
                  dialogClassName='modal-dialog-centered'
                >
                  <div className='modal-header'>
                    <h5 className='modal-title small-size align-self-center'>
                      Changing your Availability
                    </h5>
                    <button
                      type='button'
                      className='close'
                      onClick={() => setOpenAvailability(false)}
                    >
                      <span aria-hidden='true'>×</span>
                    </button>
                  </div>
                  <div className='MeeterLine mx-0'></div>
                  <div className='modal-body pb-0'>
                    <div className='avilability ml-auto text-left'>
                      <span className='small-size'>
                        Your Availability Status
                      </span>
                      <div className='align-self-center row d-flex mx-0 my-2'>
                        <div className='button b2' id='button-10'>
                          <input
                            id='modalAvilabilityChk'
                            onChange={(e) =>
                              switchAvailabitly(e.target.checked)
                            }
                            type='checkbox'
                            className='checkbox w-100 h-100 p-0 m-0'
                          />
                          <div className='knobs small-size'>
                            <span className='small-size'>Available</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {switchAvailability == true && (
                      <div>
                        <div className='small-size text-left opacity-8 py-2'>
                          When your status is set to ‘Available’, your
                          Requestors and You will receive browser and email
                          notifications in order to start your meetings.
                        </div>
                        <div className='form-group mb-0 px-0 py-3'>
                          <h5 className='small-size align-self-center text-left mb-2 pb-1'>
                            I am Available for the next:
                          </h5>
                          <div className='radio'>
                            <input
                              id='radio-1'
                              name='radio'
                              type='radio'
                              value='10 minutes'
                              onChange={(e) =>
                                changeAvailabilityDuration(e.target.value)
                              }
                            />
                            <label
                              for='radio-1'
                              className='radio-label small-size opacity-8'
                            >
                              10 minutes
                            </label>
                          </div>
                          <div className='radio'>
                            <input
                              id='radio-2'
                              name='radio'
                              type='radio'
                              value='30 minutes'
                              onChange={(e) =>
                                changeAvailabilityDuration(e.target.value)
                              }
                            />
                            <label
                              for='radio-2'
                              className='radio-label small-size opacity-8'
                            >
                              30 minutes
                            </label>
                          </div>
                          <div className='radio'>
                            <input
                              id='radio-3'
                              name='radio'
                              type='radio'
                              value='1 hour'
                              onChange={(e) =>
                                changeAvailabilityDuration(e.target.value)
                              }
                            />
                            <label
                              for='radio-3'
                              className='radio-label small-size opacity-8'
                            >
                              1 hour
                            </label>
                          </div>
                          <div className='radio'>
                            <input
                              id='radio-4'
                              name='radio'
                              type='radio'
                              value='2 hours'
                              onChange={(e) =>
                                changeAvailabilityDuration(e.target.value)
                              }
                            />
                            <label
                              for='radio-4'
                              className='radio-label small-size opacity-8'
                            >
                              2 hours
                            </label>
                          </div>
                          <div className='radio'>
                            <input
                              id='radio-5'
                              name='radio'
                              type='radio'
                              value='4 hours'
                              onChange={(e) =>
                                changeAvailabilityDuration(e.target.value)
                              }
                            />
                            <label
                              for='radio-5'
                              className='radio-label small-size opacity-8'
                            >
                              4 hours
                            </label>
                          </div>
                          <div className='radio'>
                            <input
                              id='radio-6'
                              name='radio'
                              type='radio'
                              value='8 hours'
                              onChange={(e) =>
                                changeAvailabilityDuration(e.target.value)
                              }
                            />
                            <label
                              for='radio-6'
                              className='radio-label small-size opacity-8'
                            >
                              8 hours
                            </label>
                          </div>
                        </div>
                        <div className='MeeterLine'></div>
                        <div className='form-group px-0 py-3 mb-0'>
                          <div className='chkbox'>
                            <label>
                              <input
                                type='checkbox'
                                name='checkbox'
                                value='css'
                              />
                              <span className='small-size opacity-8'>
                                Open Meeting Room Window
                              </span>
                            </label>
                          </div>
                          <div className='chkbox'>
                            <label>
                              <input
                                type='checkbox'
                                name='checkbox'
                                value='css'
                                checked
                              />
                              <span className='small-size opacity-8'>
                                Send Notifications to all Requestors
                              </span>
                            </label>
                          </div>
                        </div>
                        <div className='MeeterLine'></div>
                      </div>
                    )}
                  </div>

                  <div className='modal-footer'>
                    <button
                      className='btn discard p-0 m-0 mr-auto medium-size opacity-6'
                      onClick={() => setOpenAvailability(false)}
                    >
                      Discard changes
                    </button>
                    <button
                      content='Update'
                      className='btn btn-primary small-size m-0 update'
                      onClick={changeAvailability}
                      positive
                    >
                      Update
                    </button>
                  </div>
                </Modal>
                <div className='button b2' id='button-10'>
                  <input
                    type='checkbox'
                    value='No'
                    onChange={(e) => openAvailabilityPopup(e.target.checked)}
                    className='checkbox w-100 h-100 p-0 m-0'
                  />
                  <div className='knobs small-size'>
                    <span className='small-size'>Available</span>
                  </div>
                </div>
              </div>
              <span className='small-size extend'>
                {meeter_availibility === 'yes' ? (
                  <>
                    Available for{' '}
                    <span>{available_for && available_for.hours}</span> hours{' '}
                    <span>{available_for && available_for.minutes}</span>{' '}
                    minutes. <a href='#'>Extend ⯆</a>
                  </>
                ) : (
                  'Not Available'
                )}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default UserInfo;
