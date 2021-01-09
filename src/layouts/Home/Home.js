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

export default function Home() {
    const history = useHistory();

    return <>
        <FullPager noScroll flexCol className="bg-doodle-pattern items-center" justify="justify-center">
            <img src={tabillLogo} alt="logo" className="h-40 sm:h-60" draggable={false} />
            <div className="text-6xl sm:text-8xl mx-auto">TABILL</div>
            <div className="text-3xl sm:text-5xl mx-auto">The Tables Drill</div>
            <PrimaryButton onClick={()=>history.push('/game')} className="m-4">
                <div className="flex items-center">
                    <img src={playIcon} alt="logo" className="h-6 sm:h-8" draggable={false} />
                Play
                </div>
            </PrimaryButton>
        </FullPager>
    </>
}