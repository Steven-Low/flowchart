import React from 'react';
import "./color.css";

const ColorSwatch = ({setCurrentNodeBg}:any) => {
    return (
        <div className='colorcontainer'>
            <div className="colorpicker">
                <div id="picker"></div>
            </div>
            <div id="swatches" className="colorswatches">
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#ffffff")} />
                    <div className="swatch" data-color="#ffffff" style={{ background: '#ffffff' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#c7ecee")}/>
                    <div className="swatch" data-color="#c7ecee" style={{ background: '#c7ecee' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#f9ca24")}/>
                    <div className="swatch" data-color="#f9ca24" style={{ background: '#f9ca24' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#f0932b")}/>
                    <div className="swatch" data-color="#f0932b" style={{ background: '#f0932b' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#eb4d4b")}/>
                    <div className="swatch" data-color="#eb4d4b" style={{ background: '#eb4d4b' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#6ab04c")}/>
                    <div className="swatch" data-color="#6ab04c" style={{ background: '#6ab04c' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#e056fd")}/>
                    <div className="swatch" data-color="#e056fd" style={{ background: '#e056fd' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#686de0")}/>
                    <div className="swatch" data-color="#686de0" style={{ background: '#686de0' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#30336b")}/>
                    <div className="swatch" data-color="#30336b" style={{ background: '#30336b' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#22a6b3")}/>
                    <div className="swatch" data-color="#22a6b3" style={{ background: '#22a6b3' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#e67e22")}/>
                    <div className="swatch" data-color="#e67e22" style={{ background: '#e67e22' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#8e44ad")}/>
                    <div className="swatch" data-color="#8e44ad" style={{ background: '#8e44ad' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#c0392b")}/>
                    <div className="swatch" data-color="#c0392b" style={{ background: '#c0392b' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#fd79a8")}/>
                    <div className="swatch" data-color="#fd79a8" style={{ background: '#fd79a8' }}></div>
                </label>
                <label className="radio-button-label">
                    <input type="button" name="radio-control" onClick={() => setCurrentNodeBg("#a29bfe")}/>
                    <div className="swatch" data-color="#a29bfe" style={{ background: '#a29bfe' }}></div>
                </label>
                <label className="radio-button-label custom-color">
                    <div className="swatch" data-color="#8d69fb" style={{ background: '#fff' }}><i className='bx bx-plus'></i></div>
                </label>
            </div>
        </div>
    );
}

export default ColorSwatch;
