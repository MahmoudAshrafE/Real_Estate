import { Suspense, useState } from "react";
import "./App.css";
import Routers from "./pages/Router";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoadingPage from "./pages/LoadingPage/LoadingPage";



function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Suspense fallback= {<div>Loading...</div>}>  
        <LoadingPage />
      </Suspense>
    </BrowserRouter>
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
}

export default App;
