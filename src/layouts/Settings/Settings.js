import React from 'react';
import FullPager from '../../components/FullPager';

import tabillLogo from '../../assets/images/tabill-logo.svg';
import playIcon from '../../assets/images/play.svg';
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
        <FullPager noScroll flexCol className="bg-doodle-pattern items-center" justify="justify-center">
            <div className="text-6xl sm:text-8xl mx-auto">Settings</div>
            <PrimaryButton focusOnLoad onClick={()=>history.push('/game')} className="m-4">
                <div className="flex items-center">
                    <img src={playIcon} alt="logo" className="h-6 sm:h-8" draggable={false} />
                Play
                </div>
            </PrimaryButton>
        </FullPager>
    </>
}