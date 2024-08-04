import React from 'react';
import "./home.css";
import useStorage from '../Storage/storage';
import { useNavigate } from 'react-router-dom';

const HomeWrapper = () => {
    const {getFlowKey, getThumbnail, removeFlowKey} = useStorage();
    const flowKey = getFlowKey();
    const thumbnails = getThumbnail();
    const navigate = useNavigate();

    const addFlow = () => {
        const id = prompt("Please enter an unique flowchart name: ");
        if(["flowKey", "thumbnails", "", null, ...flowKey].includes(id)){
            alert(`The key ${id} is reserved or empty. Please enter a valid key.`)
        }else{
            navigate(`/flowchart/${id}`);
        }
    }

    return (
    <div className="video-sec-wrap">
    <header className="header">
        <div className="container">
            <div className="flex justify-between">
            <h2 className="font-bold">
                <a className="block hover:underline" aria-label="Flowchart" href="/">Flowchart</a>
            </h2>

            </div>
        </div>
    </header>
    <div className="video-sec">
        <p className="video-sec-title">Super Responsive Video Grid</p>
        <ul className="video-sec-middle" id="vid-grid">
        {flowKey.map((id) => (
            <li className="thumb-wrap">
                <i className='bx bx-dots-vertical-rounded dropdown-h' >
                    <div className="dropdown-content-h">
                        <button onClick={() => {removeFlowKey(id); navigate('/');}}><i className='bx bx-x' > Delete</i></button>
                    </div>
                </i>
                <a href={`/flowchart/${id}`}>
                <img className="thumb" src={thumbnails[id]} alt="flowchart thumbnail image" />
                <p className="thumb-title">{id}</p>
                </a>
            </li>
        ))}
        <li className="thumb-wrap">
            <div className='addflow' onClick={()=>{
                    addFlow();
                }}>
                <i className='bx bx-plus-circle' ></i>
            </div>
        </li>


        </ul>
    </div>
    </div>
    );
};
  
  export default HomeWrapper;
  
  