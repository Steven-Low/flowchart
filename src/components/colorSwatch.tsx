import React from 'react';
import {memo} from 'react';
import "./color.css";

const ColorSwatch = ({ setCurrentNodeBg }:any) => {
    return (
        <div className='colorcontainer'>
            <div className="colorpicker">
                <div id="picker"></div>
            </div>
            <div id="swatches" className="colorswatches">
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(255, 255, 255, 0.5)")} />
                    <div className="swatch" data-color="#ffffff" style={{ background: '#ffffff' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(199, 236, 238, 0.5)")} />
                    <div className="swatch" data-color="#c7ecee" style={{ background: '#c7ecee' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(249, 202, 36, 0.5)")} />
                    <div className="swatch" data-color="#f9ca24" style={{ background: '#f9ca24' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(240, 147, 43, 0.5)")} />
                    <div className="swatch" data-color="#f0932b" style={{ background: '#f0932b' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(235, 77, 75, 0.5)")} />
                    <div className="swatch" data-color="#eb4d4b" style={{ background: '#eb4d4b' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(106, 176, 76, 0.5)")} />
                    <div className="swatch" data-color="#6ab04c" style={{ background: '#6ab04c' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(224, 86, 253, 0.5)")} />
                    <div className="swatch" data-color="#e056fd" style={{ background: '#e056fd' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(104, 109, 224, 0.5)")} />
                    <div className="swatch" data-color="#686de0" style={{ background: '#686de0' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(48, 51, 107, 0.5)")} />
                    <div className="swatch" data-color="#30336b" style={{ background: '#30336b' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(34, 166, 179, 0.5)")} />
                    <div className="swatch" data-color="#22a6b3" style={{ background: '#22a6b3' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(230, 126, 34, 0.5)")} />
                    <div className="swatch" data-color="#e67e22" style={{ background: '#e67e22' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(142, 68, 173, 0.5)")} />
                    <div className="swatch" data-color="#8e44ad" style={{ background: '#8e44ad' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(192, 57, 43, 0.5)")} />
                    <div className="swatch" data-color="#c0392b" style={{ background: '#c0392b' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(253, 121, 168, 0.5)")} />
                    <div className="swatch" data-color="#fd79a8" style={{ background: '#fd79a8' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("rgba(162, 155, 254, 0.5)")} />
                    <div className="swatch" data-color="#a29bfe" style={{ background: '#a29bfe' }}></div>
                </label>
                <label className="radio-button-label custom-color">
                    <div className="swatch" data-color="#8d69fb" style={{ background: '#fff' }}><i className='bx bx-plus'></i></div>
                </label>
            </div>
        </div>
    );
}

export default memo(ColorSwatch);
