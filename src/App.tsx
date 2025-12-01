import {HashRouter} from "react-router-dom";
import {Toaster} from "@/shared/components/sonner.tsx";
import {AppRouter} from "@/router.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const App = () => {
    const queryClient = new QueryClient()
    return (
        <HashRouter>
            <QueryClientProvider client={queryClient}>
                <Toaster/>
                <AppRouter/>
            </QueryClientProvider>
        </HashRouter>
    )
}


export default App
