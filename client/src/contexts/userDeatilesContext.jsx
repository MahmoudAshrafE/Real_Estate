import { createContext, useContext, useState } from "react";

export const UserDetails = createContext()

export const useDetailsContext = () => useContext(UserDetails)

export const UserDetailsProvider = ({ children }) => {
    const [userDetails, setUserDetails] = useState({
        favorites:[],
        bookings:[],
        token:null,
    });
    return (
        <UserDetails.Provider value={{userDetails, setUserDetails}}>
            {children}
        </UserDetails.Provider>
    )
} 