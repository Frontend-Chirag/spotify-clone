"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

interface UserProvidersProps {
    children: React.ReactNode;
}


const UserProvider: React.FC<UserProvidersProps> = ({ children }) => {
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
}

export default UserProvider;