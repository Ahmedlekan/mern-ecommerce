import React, {createContext, useContext, useState, useEffect} from 'react'
import Toast from '../component/Toast';
import * as authApiClient from "../apiClient/auth";
import * as userApiClient from "../apiClient/user";
import { useQuery } from '@tanstack/react-query';
import {UserType } from '../../../backend/src/shared/types';

type ToastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR";
}

type AppContextProps = {
    showToast: (toastMessage: ToastMessage)=> void
    isLoggedIn: boolean
    user: UserType | null;
    isLoading: boolean
    isError: boolean
    setUser: (user: UserType | null) => void;
    title: string
    setTitle: (title: string)=> void
    productId?: string
    selectedCategory: string[]
    setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;

    saveSearchValues: (
      title: string,
      productId?: string
    ) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined)

export const AppContextProvider = ({children}:{children: React.ReactNode}) => {

    const [toast, setToast] = useState<ToastMessage | undefined>(undefined)
    const [user, setUser] = useState<UserType | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string[]>([]);

    const [title, setTitle] = useState<string>("")
    const [productId, setProductId] = useState<string>("")

    const saveSearchValues = (title: string) => {
        setTitle(title)
        if(productId){
            setProductId(productId)
        }
    }


    const {isError} = useQuery({
        queryKey: ["validateToken"],
        queryFn: authApiClient.validateToken
    })

    const {data: currentUser, isLoading, isSuccess} = useQuery({
      queryKey:["currentUser"],
      queryFn: userApiClient.fetchCurrentUser,
    })

    useEffect(() => {
        if (isSuccess && currentUser) {
          setUser(currentUser);
        } else if (isError) {
          console.log("Error fetching currentUser");
        }
    }, [currentUser, isSuccess, isError]);

  return (
    <AppContext.Provider value={{
        showToast: (toastMessage) => setToast(toastMessage),
        isLoggedIn: !isError,
        user,
        setUser,
        isLoading,
        isError,
        title,
        setTitle,
        saveSearchValues,
        selectedCategory,
        setSelectedCategory,
    
    }}>
        {toast && (
            <Toast message={toast.message} type={toast.type} onClose={ () => setToast(undefined)} />
        )}
        {children}
    </AppContext.Provider>
  )
}

export const useAppContext = ()=>{
    const context = useContext(AppContext)
    
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}