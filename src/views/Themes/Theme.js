import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SketchPicker } from 'react-color';
import { setHoverColor, setMainColor, setTextColor } from '../../redux/reducers/theme/colors/actions';

const ConfgiureTheme = () => {
    const dispatch = useDispatch()

    const [mainColor, set_mainColor] = useState('#fff');
    const [textColor, set_textColor] = useState('#000');
    const [hoverColor, set_hoverColor] = useState('#000');

    /**
     *
     * @param color
     */
    const handleMainColor = color => {
        set_mainColor(color.hex);

    }

    /**
     *
     * @param color
     */
    const handleTextColor = color => {
        set_textColor(color.hex)
    }

    /**
     *
     * @param color
     */
    const handleHoverColor = color => {
        set_hoverColor(color.hex)
    }

    /**
     * @param
     */
    const setThemeColor = () => {
        dispatch(setMainColor(mainColor))
        dispatch(setTextColor(textColor))
        dispatch(setHoverColor(hoverColor))
    }

    return (
        <>
            <div className="mainrow">
                <div>
                    <div>
                        <h2 className='mb-4'>
                            Configure Theme
                            <small> colors</small>
                        </h2>
                        <div>
                            <div className="row">
                                <div className="col-md-3">
                                    <div className="mb-5">
                                        <label htmlFor="name">Header & Sidebar Color</label>
                                        <SketchPicker
                                            color={ mainColor }
                                            onChangeComplete={ handleMainColor }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="mb-5">
                                        <label htmlFor="ccnumber">Text Color</label>
                                        <SketchPicker
                                            color={ textColor }
                                            onChangeComplete={ handleTextColor }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-3">
                                    <div className="mb-5">
                                        <label htmlFor="ccnumber">Hover Color</label>
                                        <SketchPicker
                                            color={ hoverColor }
                                            onChangeComplete={ handleHoverColor }
                                        />
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="mb-5">
                                        <button type="button" className="btn btn-primary" onClick={setThemeColor}>Save Settings</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfgiureTheme;
