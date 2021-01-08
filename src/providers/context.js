import React from 'react';
import { OptionsProvider } from './options-context';
import { QuestionProvider } from './question-context';
// import { UserProvider } from './user-context';

export default function AppProviders({ children }) {
    // return <AuthProvider>
    return <OptionsProvider>
        <QuestionProvider>
            {children}
        </QuestionProvider>
    </OptionsProvider>
    // </AuthProvider>
}