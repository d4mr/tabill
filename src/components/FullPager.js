export default function FullPager({ children, flexCol, noScroll, className, justify, ...props}) {
    return <div {...props} className={["text-black flex min-h-screen select-none", justify?justify:"justify-between", flexCol?"flex-col":"", noScroll?"max-h-screen h-screen overflow-hidden":"",className?className:""].join(" ")}>
        {children}
    </div>
}