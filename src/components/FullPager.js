export default function FullPager({ children, flexCol, noScroll, className}) {
    return <div className={["text-black flex min-h-screen justify-between",flexCol?"flex-col":"", noScroll?"max-h-screen h-screen overflow-hidden":"",className?className:""].join(" ")}>
        {children}
    </div>
}