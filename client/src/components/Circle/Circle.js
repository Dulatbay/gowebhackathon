import {forwardRef, useImperativeHandle, useRef} from "react";
import { gsap } from "gsap";
const Circle = forwardRef(({ size, delay }, ref) => {
    const el = useRef();

    useImperativeHandle(ref, () => {

        return {
            moveTo(x, y) {
                gsap.to(el.current, { x, y, delay });
            }
        };
    }, [delay]);

    return <div className={`circle ${size}`} ref={el}></div>;
});
export default Circle