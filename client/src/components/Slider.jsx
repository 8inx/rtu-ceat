import { Children, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import {Link} from "react-router-dom"
import WebglCanvas from "./WebglCanvas";
import styles from "./Slider.module.scss"
import image1 from "../images/hero_01.png"
import image2 from "../images/hero_02.png"
import image3 from "../images/hero_03.png"
import displacementImage from "../images/displacement.jpg"
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const Slider = () => {
    const webglRef = useRef(null)
    const containerRef = useRef(null)
    const intervalRef = useRef(null)
    const [current, setCurrent] = useState(1) 
    const [translateX, setTranslateX] = useState(0) 
    const count = 3;

    const animateNext = useCallback(() => {
        webglRef.current.next()
        containerRef.current.style.transitionDuration = '250ms';
        if(current >= count) {
            setTranslateX(containerRef.current.clientWidth * (count + 1));
            setCurrent(1)
        } else {
            setTranslateX(containerRef.current.clientWidth * (current + 1));
            setCurrent((prev) => prev + 1)
        }
    },[current])


    const animatePrevious = useCallback(() => {
        webglRef.current.previous()
        containerRef.current.style.transitionDuration = '250ms';
        if(current <= 1) {
            setTranslateX(0);
            setCurrent(count)
        } else {
            setTranslateX(containerRef.current.clientWidth * (current - 1));
            setCurrent((prev)=>prev - 1)
        }
    },[current])

    /* auto animate */
    useEffect(()=>{
        if(intervalRef.current){
            clearInterval(intervalRef.current)
        }
        intervalRef.current = setInterval(animateNext, 5000)
        return ()=>{
            if(intervalRef.current){
                clearInterval(intervalRef.current)
            }
        }
    },[animateNext, animatePrevious])

    /* clear transition of first and last child */
    useEffect(()=>{
        const transitionEnd = () => {
            if (current <= 1) {
                containerRef.current.style.transitionDuration = '0ms';
                setTranslateX(containerRef.current.clientWidth * current);
            }
            
            if(current >= count) {
                containerRef.current.style.transitionDuration = '0ms';
                setTranslateX(containerRef.current.clientWidth * count);
            }
        }
        document.addEventListener('transitionend', transitionEnd)

        return () =>{
            document.removeEventListener('transitionend', transitionEnd)
        }
    },[current])

    /* set 1st viewable item */
    useLayoutEffect(()=>{
        setTranslateX(containerRef.current.clientWidth * current);
    },[])

    /* 
        clones slides children
        - adding first child clone to last and last to first; 
    */
    const Slides = ({children}) =>{
        const slides = useMemo(()=>{
            if(children.length > 1) {
                let items = Children.map(children, (child, index) => (
                    <li key={index} className={styles.Slide} >
                        {child}
                    </li>
                ))

                return [
                    <li key={children.length + 1} className={styles.Slide} >
                            {children[children.length - 1]}
                    </li>,
                    ...items,
                    <li key={children.length + 2} className={styles.Slide} >
                            {children[0]}
                    </li>,
                ]
            }

            return  <li className={styles.Slide} >{children}</li>
        }, [children])

        return slides;
    }


    return (
        <section className={styles.Container}>
            <div className={styles.SliderWrapper}>
                <ul 
                    role="list" 
                    ref={containerRef}
                    className={styles.Slider} 
                    style={{transform:`translateX(${-translateX}px)`, transitionDuration:'250ms'}}
                >
                    <Slides>
                        <article className={styles.Content}>
                            <h1 className={styles.ContentTitle}>WE BELIEVE</h1>
                            <p className={`${styles.ContentBody} mt-2`}>Our city will grow stronger when every CEAT student can contribute to our well-being and innovation through the tools of math and science</p>
                            
                            <Link to="/courses" className={`btn btn-primary btn-large mt-4`}>CHECK COURSES</Link>
                        </article>
                        <article className={styles.Content}>
                            <h1 className={styles.ContentTitle}>EVERYDAY</h1>
                            <p className={`${styles.ContentBody} mt-2`}>We open the doors of opportunity in these fields, guiding our students as they imagine the possibilities for our shared future</p>
                            <Link to="/" className={`btn btn-primary btn-large mt-4`}>LEARN MORE</Link>
                        </article>
                        <article className={styles.Content}>
                            <h1 className={styles.ContentTitle}>STAY UPDATED</h1>
                            <p className={`${styles.ContentBody} mt-2`}>View our calendar, announcements and weekly messages from our Head of School.</p>
                            <Link to="/" className={`btn btn-primary btn-large mt-4`}>LEARN MORE</Link>
                        </article>
                    </Slides>
                </ul>
            </div>
            <button
                onClick={()=>animatePrevious()}
                className={`${styles.SideBtn} ${styles.Left}`}
            >
                <ChevronLeft/>
            </button>
            <button
                onClick={()=>animateNext()}
                className={`${styles.SideBtn} ${styles.Right}`}
            >
                    <ChevronRight/>
            </button>

            <div className={`${styles.MediaContainer} filtered tinted`}>
                <div className={styles.MediaWrapper}>
                    <WebglCanvas
                        ref={webglRef}
                        intensity={0.3}
                        images={[image1, image2, image3]}
                        displacementImage={displacementImage}
                    />  
                </div>
            </div>
        </section>
    )
}

export default Slider;