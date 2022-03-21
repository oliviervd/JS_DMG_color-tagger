import Modal from "./modal/modal"

const ProjectDescription = () => {

    function refreshPage() {
        window.location.reload(false);
    }

    return(
        <div className="infoBoxLeft">
            <h2>*** project description</h2>
            <p style={{fontSize: "15px"}}> MODELS FROM THE PAST FOR THE FUTURE takes on the role of speculative knowledge
                production that is both reflective and performative investigating and embracing the (as yet) unknown. <ul>As an evolving platform it
                investigates alternative approaches and readings of the collection of Design Museum Gent.</ul> <ul>As a living archive it will
                grow and serve as a sensing layer for past, current and future research.</ul>If anything, it moves and shies
                away from classical approaches of indexing and opening up museum collections online. Although it takes the collection database
                as a starting point, it aims at remedying the wretch and clutch of its methodologies.
                <br/>

                <h1><italic>_pull. transmit. fall in love, and break up again.</italic></h1>

                <br/> The <Modal text="XENO-MORPHIC" description="Meillisoux arrgues that one can only approach the contingent
                nature of the world, which he calls 'hyperchaos', by creating a toolbox in which constant change could manifest itself.
                Through this platform, Design Museum Gent makes visible, and encourages change to manifest and in doing so resonates
                the layered, and altering nature of its collection, whether trough different readings in exhibitions or the lack thereof."></Modal>, the SENSORIAL & SENSIBLE, the TRANSHISTORICAL, the CURRENT and PAST-FUTURE are all ideologies
                and strategies that push us in devicing new kinds of interfaces that are perhaps more sensible to its users,
                more aware of its surroundings and above all - kindle inspiration.

                <br/>

                <h1>“break, mutate and build upon what is real and what isn't real.”
                </h1>


            </p>
        </div>
    )
}

export default ProjectDescription;