import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, updateProfile, signOut, reload } from "firebase/auth";
import auth from '../firebase/firebase.config';
export const AuthContext = createContext(null);

export default function FirebaseProvider(props) {
  const googleProvider = new GoogleAuthProvider();

  const [usern, setUsern] = useState(null);


  const createUser = (email, password, username, image) => {
    return new Promise(async (resolve, reject) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await updateProfile(user, {
          displayName: username,
          photoURL: image
        });
        await user.reload();
        const updatedUser = auth.currentUser;
        setUsern(updatedUser);
        resolve(updatedUser);
      } catch (error) {
        console.error('Error creating user:', error);
        reject(error);
      }
    });
  };

  const signInUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUsern(user);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      setUsern(result.user);
      return result.user;
    } catch (error) {
      console.error('Error with Google login:', error);
      throw error; // Reject the Promise with error
    }
};


  const logOut = () => {
    signOut(auth)
      .then(() => {
        setUsern(null);
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsern(user);
      } else {
        setUsern(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const allValues = {
    createUser,
    signInUser,
    googleLogin,
    logOut,
    usern,
  };

  return (
    <AuthContext.Provider value={allValues}>
      {props.children}
    </AuthContext.Provider>
  );
}

