import React, {useState, Suspense} from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet, Link} from "react-router-dom";

// components
//import XenoHeader from "./components/header+footer/xenoHeader"
//import SpectreMain from "./components/spectre"
//import ProjectDescription from "./components/projectDescription";
//import Glossary from "./components/Glossary";

const XenoHeader = React.lazy(() => import("./components/header+footer/xenoHeader"));
const SpectreMain = React.lazy(()=> import("./components/spectre"));
const Glossary = React.lazy(() => import("./components/Glossary"));
const ProjectDescription = React.lazy(() => import("./components/projectDescription"))

function App() {


    //todo: select language

    //set responsive dimensions
    const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'})
    const isTabletOrMobile = useMediaQuery({query: '(max-width: 1224px)'})


    //switch for hiding or showing the sidebar (description + glossary)
    const [_objectNum, setObjectNum] = useState(3)
    const [sideActiveDescription, setSideActiveDescription] = useState(false);
    const [sideActiveGloss, setSideActiveGloss] = useState(false);


    function openSideDesc() {
        setSideActiveDescription(!sideActiveDescription);
    }

    function openSideGloss() {
        setSideActiveGloss(!sideActiveGloss);
    }

    function myFunction() {
        document.getElementById("myDIV").style.gridTemplateColumns = "50px 50px 50px";
    }


    return (
        <div>
            <div className="headerContainer">
                <Suspense>
                    <XenoHeader/>
                </Suspense>
                <div className="languages_button_box">
                    <div className="button-lang">NL</div>
                    <div className="button-lang">EN</div>
                </div>
            </div>
            <div className="superContainer">
                <div className="sideBarLeft-Nav">

                    <div className="sideBarLeft-Nav__button" onClick={openSideDesc}>
                        <p className="rotateText"> aBOUT.</p>
                    </div>s

                    {/*<div className="sideBarLeft-Nav__button" onClick={openSideGloss}>
                        <Link to="glossary">
                            <p className="rotateText"> gLOSSARY.</p>
                        </Link>
                    </div>*/}

                    <div className="sideBarLeft-Nav__button" onClick={openSideGloss}>
                        <Link to="essay/the-algorithmic-museum">
                            <p className="rotateText"> the algorithmic museum.</p>
                        </Link>
                    </div>

                </div>

                {sideActiveDescription &&
                    <Suspense>
                        <ProjectDescription/>
                    </Suspense>
                }

                {sideActiveGloss &&
                    <Suspense>
                        <Glossary/>
                    </Suspense>
                }

                <div className="mainContainerAlt">
                    <div className="dotLine"/>
                    <Suspense>
                        <SpectreMain num={_objectNum}/>
                    </Suspense>
                    <div className="dotLine"/>
                </div>
            </div>
            <Outlet />
        </div>
    );
}


export default App;