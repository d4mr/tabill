import React from 'react';
import FullPager from '../../components/FullPager';

import tabillLogo from '../../assets/images/tabill-logo.svg';
import PrimaryButton from '../../components/PrimaryButton';
import { useHistory } from 'react-router-dom';


// import { Redirect } from 'react-router-dom';
// import PrimaryButton from '../../components/PrimaryButton';
// import { useAuth } from '../../providers/auth-context';

// import { useUser } from '../../providers/user-context';
// import Sidebar from './Sidebar/Sidebar';

export default function Home() {
    const history = useHistory();

    return <>
        <FullPager noScroll flexCol className="bg-doodle-pattern items-stretch" justify="justify-center">
            <img src={tabillLogo} alt="logo" className="h-40 sm:h-60" draggable={false} />
            <div className="text-6xl sm:text-8xl mx-auto">TABILL</div>
            <div className="text-3xl sm:text-5xl mx-auto">The Tables Drill</div>
            <div className="flex justify-center m-5">
                <div className="flex flex-col items-stretch max-w-xs w-full">
                    <PrimaryButton focusOnLoad onClick={() => history.push('/game')} className="my-1">
                        <div className="flex items-center">
                            <i className="flaticon-arrow-point-hand-drawn-outline-pointing-to-right-direction px-3"></i>
                            <span className="pl-2">Play</span>
                        </div>
                    </PrimaryButton>
                    <PrimaryButton onClick={() => history.push('/settings')} className="my-1">
                        <div className="flex items-center">
                            <i className="flaticon-configuration-hand-drawn-interface-symbol-of-tools-a-pencil-and-a-wrench-cross px-3 font-semibold"></i>
                            <span className="pl-2">Settings</span>
                        </div>
                    </PrimaryButton>

                </div>
            </div>
        </FullPager>
    </>
}