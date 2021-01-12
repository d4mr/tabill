import { useEffect, useRef } from "react"

export default function PrimaryButton({ focusOnLoad, children, className, ...props }) {
    const button = useRef(null);
    useEffect(() => {
        if (focusOnLoad && button.current) {
            button.current.focus();
        }
    }, [focusOnLoad, button]);
    return <button ref={focusOnLoad ? button : undefined} {...props} className={[className, "text-2xl sm:text-3xl p-2 bg-white border-black border-4 hand-drawn-border shadow-2xl cursor-pointer focus:outline-none focus:bg-yellow-100 hover:shadow-lg hover:bg-yellow-100 outline-none transition duration-200"].join(" ")}>
        {children}
    </button>
}