import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import { authContext } from "../../../../context/authContext";

function AuthRoute({ children }) {
    const router = useRouter(); // Call `useRouter()` to get the router instance
    const { isAuthenticated } = useContext(authContext);

    const redirectToSignIn = () => {
        router.push('/signin');
    };

    // useEffect(() => {
    //     if (!isAuthenticated) {
    //         redirectToSignIn(); // Call the function to redirect
    //     }
    // }, [isAuthenticated, router]);

    console.log("Is authenticated:", isAuthenticated());

    if (!isAuthenticated()) {
        return redirectToSignIn();
    }

    return <>{children}</>;
}

export default AuthRoute;






// import { useRouter } from "next/router";
// import { useContext, useEffect } from "react";
// import { authContext } from "../../../context/authContext";

// const AuthRoute = ({ children }) => {
//   const router = useRouter
//   const { isAuthenticated } = useContext(authContext);

//   const redirectToSignIn = () => {
//     router.push('/signin');
//   };

//   useEffect(() => {
//     if (!isAuthenticated) {
//       redirectToSignIn(); // Call the function to redirect
//     }
//   }, [isAuthenticated, router]);

//   return children;
// };

// export default AuthRoute;
