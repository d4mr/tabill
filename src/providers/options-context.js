import React, { useState } from 'react';

const OptionsContext = React.createContext();

function OptionsProvider(props) {
    const [maxMultiple, setMaxMultiple] = useState(10);
    const [tablesBeingAsked,setTablesBeingAsked] = useState([12,13,14,15,16,17,18,19]);

    return <OptionsContext.Provider value={{maxMultiple, setMaxMultiple, tablesBeingAsked, setTablesBeingAsked}} {...props} />
}


const useOptions = () => React.useContext(OptionsContext);
export { OptionsProvider, useOptions }