import React, { useState } from "react";

import "../css/Slideshow.css";

const Slideshow = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className="slideshow">
            <div
                className="slideshow-inner"
                style={{ transform: `translateX(-${currentSlide}00%)` }}
            >
                {props.slides.map((slide, i) => {
                    return (
                        <div className="slideshow-item" key={i}>
                            {slide}
                        </div>
                    );
                })}
            </div>
            <div className="slideshow-controls">
                {props.slides.map((slide, i) => {
                    return (
                        <div
                            className={`slideshow-control${
                                currentSlide === i ? " current" : ""
                            }`}
                            key={i}
                            onClick={(e) => {
                                setCurrentSlide(i);
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
};

export default Slideshow;
