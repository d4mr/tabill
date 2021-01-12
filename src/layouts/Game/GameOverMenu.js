import { useHistory } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";
import Fire from '../../assets/images/fire.svg'


export default function GameOverMenu({ visible, playAgainHandler, currentStreak, className, ...props }) {
    const history = useHistory();
    if (!visible) return (null);
    return <div className={["fixed top-0 left-0 z-30 h-full w-full flex"].join(" ")} onKeyDown={e => { e.key === "Escape" && playAgainHandler() }}>
        <div className="p-5 bg-white hand-drawn-border border-black border-4 mx-auto my-auto z-40 flex flex-col items-stretch max-w-md">
            <h3 className="text-5xl font-medium px-5 pb-5 text-center">
                Well Played!
            </h3>
            <p className="text-xl text-center pb-5">
                Current Score: <img src={Fire} alt="Streak" className="inline h-6 pb-1" /> {currentStreak}
                <br />
                High Score on these settings:
            </p>
            <PrimaryButton focusOnLoad onClick={playAgainHandler} className="my-2 mx-5">
                <div className="flex">
                    <i className="flaticon-refresh-circular-arrow-hand-drawn-symbol mx-1"></i>
                    <span className="pl-2">Play Again</span>
                </div>
            </PrimaryButton>
            <PrimaryButton onClick={() => history.push("/settings")} className="my-2 mx-5">
                <div className="flex">
                    <i className="flaticon-configuration-hand-drawn-interface-symbol-of-tools-a-pencil-and-a-wrench-cross font-semibold mx-1"></i>
                    <span className="pl-2">Settings</span>

                </div>
            </PrimaryButton>
            <PrimaryButton onClick={() => history.push("/")} className="my-2 mx-5">
                <div className="flex">
                    <i className="flaticon-exit-hand-drawn-interface-symbol-variant mx-1"></i>
                    <span className="pl-2">Exit</span>
                </div>
            </PrimaryButton>
            <p className="text-xl text-center pb-5">
                [Enter] or [Esc] to Play Again quickly
            </p>
        </div>
        <div className="bg-gray-800 absolute top-0 left-0 h-full w-full opacity-60" onClick={() => playAgainHandler()}></div>
    </div>
}