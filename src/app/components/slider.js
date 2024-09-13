"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faArrowCircleLeft, faArrowCircleRight,} from "@fortawesome/free-solid-svg-icons";
  


// Default props
const Slider = ({slides=[]}) => {
    const [current, setCurrent]=useState();

    const previousSlide = ()=>{
        if (current === 0) setCurrent(slides.length-1);
    else setCurrent(current-1);
 };

 const nextSlide =()=>{
    if (current===slides.length-1) setCurrent(0);
    else setCurrent(current + 1);
 };
    return (
        <div className='overflow-hidden relative'>
            <div className={`flex transition-ease-out duration-400`} 
                style={{
                    transform: `translateX(-${current * 100} %)`
                }}
                >
                {slides.map((s) => {
                    return(
                        <img src={s}/>
                    )
                    
                })}
            </div>
            <div className='absolute top-0 h-full w-full justify-between items-center flex'>
                <button onClick={previousSlide}>
                <FontAwesomeIcon icon={faArrowCircleLeft} />
                </button>
                <button onClick={nextSlide}>
                <FontAwesomeIcon icon={faArrowCircleRight} />
                </button>
            </div>
            <div className='flex absolute bottom-0  py-4 justify-center w-full items-center gap-2'>
                {slides.map((s,i) =>{
                   return(
                   <div 
                    key={"circle" + i}
                    className={`rounded-full w-3 h-3 ${i==current ? "bg-red-500": "bg-black"}`}>

                    </div>)
                }
                )}
            </div>
        </div>
    );
};

export default Slider;