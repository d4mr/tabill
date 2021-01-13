import React from 'react';
import FullPager from '../../components/FullPager';

import PrimaryButton from '../../components/PrimaryButton';
import { useHistory } from 'react-router-dom';


// import { Redirect } from 'react-router-dom';
// import PrimaryButton from '../../components/PrimaryButton';
// import { useAuth } from '../../providers/auth-context';

// import { useUser } from '../../providers/user-context';
// import Sidebar from './Sidebar/Sidebar';

export default function Settings() {
    const history = useHistory();

    return <>
        <FullPager className="bg-doodle-pattern items-center" justify="justify-center">
            <div className="flex-col items-stretch justify-center max-w-md w-full bg-white hand-drawn-border border-black border-4 mx-2">
                <div className="text-4xl sm:text-6xl text-center p-5">Settings</div>
                <div className="flex justify-center p-5">
                    <div className="text-2xl sm:text-3xl flex flex-col items-stretch max-w-xs w-full">
                        <div className="mb-5">
                            <div className="text flex flex-col bg-white hand-drawn-border border-black border p-3 my-1">
                                <p>Tables to ask:</p>
                                <div className="flex flex-col sm:flex-row text-xl sm:text-2xl">
                                    <div className="flex-grow flex p-2">
                                        <label htmlFor="tables-from" className="sm:p-2 flex-1 sm:flex-grow-0">From:</label>
                                        <input id="tables-from" type="number" className="hand-drawn-border border-black border-2 flex-1" />
                                    </div>
                                    <div className="flex-grow flex p-2">
                                        <label htmlFor="tables-to" className="sm:p-2 flex-1 sm:flex-grow-0">To:</label>
                                        <input id="tables-to" type="number" className="hand-drawn-border border-black border-2 flex-1" />
                                    </div>
                                </div>
                            </div>
                            <div className="flex text-xl sm:text-2xl my-1 bg-white hand-drawn-border border-black border p-3">
                                <label htmlFor="tables-to" className="sm:p-2 flex-1">Max Multiple:</label>
                                <input id="tables-to" type="number" className="hand-drawn-border border-black border-2 flex-1" />
                            </div>
                        </div>
                        <PrimaryButton focusOnLoad onClick={() => history.push('/game')} className="my-1">
                            <div className="flex items-center">
                                <i className="flaticon-arrow-point-hand-drawn-outline-pointing-to-right-direction px-3"></i>
                                <span className="pl-2">Save and Play</span>
                            </div>
                        </PrimaryButton>
                        <PrimaryButton onClick={() => history.push("/")} className="my-1">
                            <div className="flex">
                                <i className="flaticon-exit-hand-drawn-interface-symbol-variant px-3"></i>
                                <span className="pl-2">Save and Exit</span>
                            </div>
                        </PrimaryButton>
                    </div>
                </div>
            </div>

        </FullPager>
    </>
}