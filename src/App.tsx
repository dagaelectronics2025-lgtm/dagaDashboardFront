import {HashRouter} from "react-router-dom";
import {Toaster} from "@/shared/components/sonner.tsx";
import {AppRouter} from "@/router.tsx";

const App = () => (
    <HashRouter>
        <Toaster/>
        <AppRouter/>
    </HashRouter>
)


export default App
