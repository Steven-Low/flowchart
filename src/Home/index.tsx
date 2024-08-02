import React from 'react';
import "./home.css";

const HomeWrapper = () => {
    return (
    <article className="video-sec-wrap">
    <div className="video-sec">
        <p className="video-sec-title">Super Responsive Video Grid</p>
        <ul className="video-sec-middle" id="vid-grid">
        <li className="thumb-wrap">
            <a href="/">
            <img className="thumb" src="https://images.unsplash.com/photo-1555661225-ade1bbf3fbb3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1957&q=80" alt="" />
            <p className="thumb-title">Video Title 1</p>
            </a>
        </li>
        <li className="thumb-wrap">
            <a href="/">
            <img className="thumb" src="https://images.unsplash.com/photo-1566075247408-2fc9e74810d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" />
            <p className="thumb-title">Video Title 2</p>
            </a>
        </li>
        </ul>
    </div>
    </article>
    );
};
  
  export default HomeWrapper;
  
  