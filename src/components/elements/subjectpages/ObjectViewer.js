import React, {Suspense, useState} from "react";
import {
    fetchTitle,
    fetchProductionInfo,
    fetchMaterials,
    fetchCreatorInfo,
    fetchExhibitions,
    fetchObjectNumber,
    fetchCurrentLocation,
    fetchObjectType, fetchDimensions,
    fetchAcquisitionHistory
} from "../../utils/data_parsers";
import {useNavigate} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import Loading from "../utils/Loading";

const ImageViewer = React.lazy(() => import("./ImageViewer"));
const ObjectViewer = (props) => {
    // declare object and its metadata (json) to be used in the viewer

    let navigate = useNavigate();

    let title = ""
    let description = ""
    let productions = ""
    let creations = ""
    let objectNumber = ""
    let dimensions = ""
    let material = []
    let exhibitions = ""
    let location = ""
    let type = ""
    let acquisition

    let _LDES = props.details
    let _THES = props.thesaurus
    let _PERS = props.personen

    const [openDescription, setOpenDescription] = useState(false)
    const [openColors, setOpenColors] = useState(false)
    const [selectColor, setSelectColor] = useState("")

    //todo: add async function to display data -- https://www.geeksforgeeks.org/how-to-escape-try-catch-hell-in-javascript/

    //MEDIA QUERIES
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 700px)'
    })
    const isMobile = useMediaQuery({
        query: '(max-width: 700px)'
    })

    if (_LDES && _THES){

        let _baseLDES = _LDES["LDES_raw"] // raw data for LDES (object description)
        let _baseTHES = _THES // raw data for concept list (thesaurus)
        let _basePERS = _PERS // raw data for agent list (individuals and organisations)

        fetchMaterials(_baseLDES, _baseTHES, material)
        try {
            productions = fetchProductionInfo(_baseLDES, _basePERS, _baseTHES)
        } catch(e) {}

        objectNumber = fetchObjectNumber(_baseLDES)
        title = fetchTitle(_baseLDES)
        location = fetchCurrentLocation(_baseLDES)

        try{
            type = fetchObjectType(_baseLDES, _baseTHES)
        } catch (e) {}

        try{ // description
            description = _LDES["LDES_raw"]["object"]["http://www.cidoc-crm.org/cidoc-crm/P3_has_note"]["@value"]
        } catch(e) {description = ""}

        try {
            if (fetchDimensions(_baseLDES) !== undefined){
                dimensions = fetchDimensions(_baseLDES)
            }
        } catch {dimensions=""}

        try {
            creations = fetchCreatorInfo(_baseLDES, _basePERS, _baseTHES)
        } catch (e) {}

        try {
            exhibitions = fetchExhibitions(_baseLDES)
            console.log(exhibitions)
        } catch {console.log(exhibitions)}

        try {
            acquisition = fetchAcquisitionHistory(_baseLDES)
        } catch {}

        console.log(_LDES);
    }

    let href_objectpage = "/index/object/" + objectNumber

    const routeToObjectPage = () => {
        // todo: pass props.
        navigate(href_objectpage);
    }

    function routeToAgentPage(id){
        // todo: pass props.
        navigate("/index/agent/"+id)
    }

    return (
        <div>
            {isDesktopOrLaptop &&
                <div className="ObjectViewer grid--5_95" style={{height: "100%"}}>
                    {props.colorStrip &&
                        <div className="LineObjectViewer" style={{borderColor: props.color}}/>
                    }
                    {!props.colorStrip &&
                        <div></div>
                    }

                    <div>
                        <div className="grid--9_1">
                            <a className={"HeaderLinkBig home italic"} style={{fontSize: "2vw"}} href={href_objectpage}>{title}</a>
                            {props.indexUI &&
                                <h3 className={"underlined"} style={{fontSize: "4vw"}} onClick={()=>props.setShowDetailUI(!props.showDetailUI)}>X</h3>
                            }

                        </div>
                        <p>objectnummer: {objectNumber}</p>
                        <div className={"grid--4_6-ObjectViewer"}>
                            <div>
                                <Suspense fallback={<Loading />}>
                                    <Suspense fallback={<Loading />}>
                                        <ImageViewer media={props.image} details={props.details}/>
                                    </Suspense>
                                    {!props.description &&
                                        <div style={{marginLeft: "28px"}}>
                                            <div >
                                                {!openColors&&
                                                    <div>
                                                        <div className={"lineH"}></div>
                                                        <br></br>
                                                        <h2 onClick={()=>setOpenColors(true)}>↨ colors</h2>
                                                        <br></br>
                                                        <div className={"lineH"}></div>
                                                        <br></br>
                                                    </div>
                                                }
                                                {openColors&&
                                                    <div>
                                                        <div className={"lineH"}></div>
                                                        <div className={"grid--even_5"}>
                                                            {_LDES["HEX_values"][0].map(color=>{return(
                                                                <div style={{
                                                                    background:color,
                                                                    margin: '10px',
                                                                    height: "2vh",
                                                                    width: "2vh"
                                                                }}></div>
                                                            )})}
                                                        </div>
                                                        <br></br>
                                                        <h2 onClick={()=>setOpenColors(false)}>↥ close</h2>
                                                        <br></br>
                                                        <div className={"lineH"}></div>
                                                        <br></br>
                                                    </div>
                                                }
                                            </div>
                                            {!openDescription &&
                                                <div>
                                                    <div className={"lineH"}></div>
                                                    <br></br>
                                                    <h2 onClick={()=>setOpenDescription(true)}>↨ description</h2>
                                                    <br></br>
                                                    <div className={"lineH"}></div>
                                                    <br></br>
                                                </div>
                                            }
                                            {openDescription &&
                                                <div>
                                                    <p>{description}</p>
                                                    <br/>
                                                    <h2 onClick={()=>setOpenDescription(false)}>↥ close</h2>
                                                    <br/>
                                                    <div className={"lineH"}></div>
                                                    <br/>
                                                </div>
                                            }
                                        </div>
                                    }
                                </Suspense>
                            </div>

                            <div></div>
                            <div style={{paddingLeft: "40px", paddingRight: "10vw", paddingTop:"10px"}}>

                                {props.description &&
                                    <div>
                                        {!openDescription &&
                                            <div>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                                <h2 onClick={()=>setOpenDescription(true)}>↨ description</h2>
                                                <br></br>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                            </div>
                                        }
                                        {openDescription &&
                                            <div>
                                                <p>{description}</p>
                                                <br/>
                                                <h2 onClick={()=>setOpenDescription(false)}>↥ close</h2>
                                                <br/>
                                                <div className={"lineH"}></div>
                                                <br/>
                                            </div>
                                        }
                                    </div>
                                }

                                {props.colorCubes &&
                                    <div >
                                        {!openColors&&
                                            <div>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                                <h2 onClick={()=>setOpenColors(true)}>↨ colors</h2>
                                                <br></br>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                            </div>
                                        }
                                        {openColors&&
                                            <div>
                                                <div className={"lineH"}></div>
                                                <div className={"grid--even_5"}>
                                                    {_LDES["HEX_values"][0].map(color=>{return(
                                                        <div style={{
                                                            background:color,
                                                            margin: '10px',
                                                            height: "5vw",
                                                            width: "5vw"
                                                        }} onClick={()=>setSelectColor(color)} ></div>
                                                    )})}
                                                </div>
                                                <br></br>
                                                <h2 onClick={()=>setOpenColors(false)}>↥ close</h2>
                                                <br></br>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                            </div>
                                        }
                                    </div>
                                }

                                {type !== "" &&
                                    <div>
                                        <p className={"underlined"}>type:</p>
                                        {type.map(t => {
                                            return(
                                                <div>
                                                    <p>{t}</p>
                                                </div>)
                                        })}
                                        <br/>
                                    </div>
                                }

                                {creations !== "" &&
                                    <div>
                                        <p className={"underlined"}>designed by:</p>
                                        {creations.map(crea => {
                                            //console.log(prod)
                                            return(
                                                <div>
                                                    {crea.creator &&
                                                        <h2 className={"italic"} onClick={()=> routeToAgentPage(crea.id)}>{crea.creator}</h2>
                                                    }
                                                    {crea.creation_place &&
                                                        <p>location: {crea.creation_place}</p>
                                                    }
                                                    {crea.date &&
                                                        <p>date: {crea.date}</p>
                                                    }
                                                    <br/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                }

                                {productions !== "" &&
                                    <div>
                                        <p className={"underlined"}>produced by:</p>
                                        {productions.map(prod => {
                                            //console.log(prod)
                                            return(
                                                <div>
                                                    {prod.producer &&
                                                        <h2 className={"italic"} onClick={()=> routeToAgentPage(prod.id)}>{prod.producer}</h2>
                                                    }
                                                    {prod.place &&
                                                        <p>location: {prod.place}</p>
                                                    }
                                                    {prod.date &&
                                                        <p>date: {prod.date}</p>
                                                    }
                                                    {prod.technique &&
                                                        <p>technique: {prod.technique}</p>
                                                    }
                                                    <br/>
                                                </div>
                                            )
                                        })}
                                    </div>
                                }

                                {dimensions !== "" &&
                                    <div>
                                        <p className={"underlined"}>dimensions:</p>
                                        <p>{dimensions}</p>
                                        <br/>

                                    </div>
                                }

                                <div>
                                    {material !== undefined &&
                                        <div>
                                            <p className={"underlined"}>materials:</p>
                                            <div>
                                                {material &&
                                                    material.map(mat => {
                                                        return(
                                                            <p>
                                                                {mat}
                                                            </p>
                                                        )
                                                    })
                                                }
                                            </div>
                                            <br></br>
                                        </div>
                                    }
                                </div>

                                {acquisition !== undefined &&
                                    <div>
                                        <p className={"underlined"}>acquired:</p>
                                        <div>
                                            {acquisition.date &&
                                                <p>{acquisition.date} ({acquisition.method})</p>
                                            }
                                            {!acquisition.date &&
                                                <p>date unknown ({acquisition.method})</p>
                                            }
                                        </div>
                                        <br/>
                                    </div>
                                }

                                {exhibitions !== "" &&
                                    <div>
                                        <p className={"underlined"}>shown in exhibitions:</p>
                                        <div>
                                            {exhibitions[0] &&
                                                exhibitions.map(exh =>{
                                                    return(
                                                        <div>
                                                            <p>{exh.title}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                        <br></br>
                                    </div>
                                }

                                {location !== "" &&
                                    <div>
                                        <p className={"underlined"}>current location:</p>
                                        <p>{location}</p>
                                    </div>
                                }

                            </div>
                        </div>
                    </div>

                </div>
            }
            {isMobile &&
                <div>
                    <h1 className={"home"} style={{fontSize: "6vw", padding: "5%"}} onClick={()=>routeToObjectPage()}>{title}</h1>

                    <Suspense>
                        <ImageViewer style={{padding: "5%"}}  media={props.image} details={props.details}/>
                    </Suspense>
                    <div style={{padding: "5%"}}>
                        {props.description &&
                            <div>
                                {!openDescription &&
                                    <div>
                                        <div className={"lineH"}></div>
                                        <br></br>
                                        <h2 onClick={()=>setOpenDescription(true)}>↨ description</h2>
                                        <br></br>
                                        <div className={"lineH"}></div>
                                        <br></br>
                                    </div>
                                }
                                {openDescription &&
                                    <div>
                                        <p>{description}</p>
                                        <br/>
                                        <h2 onClick={()=>setOpenDescription(false)}>↥ close</h2>
                                        <br/>
                                        <div className={"lineH"}></div>
                                        <br/>
                                    </div>
                                }

                                {props.colorCubes &&
                                    <div >
                                        {!openColors&&
                                            <div>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                                <h2 onClick={()=>setOpenColors(true)}>↨ colors</h2>
                                                <br></br>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                            </div>
                                        }
                                        {openColors&&
                                            <div>
                                                <div className={"lineH"}></div>
                                                <div className={"grid--even_5"}>
                                                    {_LDES["HEX_values"][0].map(color=>{return(
                                                        <div style={{
                                                            background:color,
                                                            marginLeft: "25%",
                                                            marginTop: "30%",
                                                            height: "4vh",
                                                            width: "4vh"
                                                        }} onClick={()=>setSelectColor(color)}></div>
                                                    )})}
                                                </div>
                                                <br></br>
                                                <h2 onClick={()=>setOpenColors(false)}>↥ close</h2>
                                                <br></br>
                                                <div className={"lineH"}></div>
                                                <br></br>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }

                        {creations !== "" &&
                            <div>
                                <p className={"underlined"}>designed by:</p>
                                {creations.map(crea => {
                                    //console.log(prod)
                                    return(
                                        <div>
                                            {crea.creator &&
                                                <h2 onClick={()=> routeToAgentPage(crea.id)}>{crea.creator}</h2>
                                            }
                                            {crea.creation_place &&
                                                <p>location: {crea.creation_place}</p>
                                            }
                                            {crea.date &&
                                                <p>date: {crea.date}</p>
                                            }
                                            <br/>
                                        </div>
                                    )
                                })}
                            </div>
                        }


                        {productions !== "" &&
                            <div>
                                <p className={"underlined"}>produced by:</p>
                                {productions.map(prod => {
                                    //console.log(prod)
                                    return(
                                        <div>
                                            {prod.producer &&
                                                <h2 onClick={()=> routeToAgentPage(prod.id)}>{prod.producer}</h2>
                                            }
                                            {prod.place &&
                                                <p>location: {prod.place}</p>
                                            }
                                            {prod.date &&
                                                <p>date: {prod.date}</p>
                                            }
                                            {prod.technique &&
                                                <p>technique: {prod.technique}</p>
                                            }
                                            <br/>
                                        </div>
                                    )
                                })}
                            </div>
                        }

                        {dimensions !== "" &&
                            <div>
                                <p className={"underlined"}>dimensions:</p>
                                <p>{dimensions}</p>
                                <br/>
                            </div>
                        }

                        {type !== "" &&
                            <div>
                                <p className={"underlined"}>type:</p>
                                <p>{type}</p>
                                <br/>
                            </div>

                        }

                        {material !== "" &&
                            <div>
                                <p className={"underlined"}>materials:</p>
                                <div>
                                    {material &&
                                        material.map(mat => {
                                            return(
                                                <p>
                                                    {mat}
                                                </p>
                                            )
                                        })
                                    }
                                </div>
                                <br></br>
                            </div>
                        }

                        {acquisition !== undefined &&
                            <div>
                                <p className={"underlined"}>acquired:</p>
                                <div>
                                    <p>{acquisition.date} ({acquisition.method})</p>
                                </div>
                                <br/>
                            </div>
                        }

                        {exhibitions !== "" &&
                            <div className={"grid--3_7"}>
                                <p className={"underlined"}>shown in exhibitions:</p>
                                <div>
                                    {exhibitions[0] &&
                                        exhibitions.map(exh =>{
                                            return(
                                                <div>
                                                    <p>{exh.title}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <br></br>
                            </div>
                        }

                        {location !== "" &&
                            <div>
                                <br></br>
                                <p className={"underlined"}>current location:</p>
                                <p>{location}</p>
                            </div>

                        }
                    </div>
                </div>
            }
        </div>
    )



}
export default ObjectViewer;