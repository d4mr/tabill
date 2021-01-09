export default function PrimaryButton({ children, className, ...props }) {
    return <button {...props} className={[className, "text-2xl sm:text-3xl p-2 bg-white border-black border-4 hand-drawn-border shadow-2xl hover:shadow-none outline-none focus:outline-none focus:bg-blue-100 transition duration-200"].join(" ")}>
        {children}
    </button>
}