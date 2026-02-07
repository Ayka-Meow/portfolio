import ProjectSection from "../design/ProjectSection"
import ScrambleText from "../components/ScrambleText"

const MainPage = () => {

    return (
        <div>
            <ScrambleText 
                texts={["Jeric Gonzales", "Frontend Developer", "Ayka Yao"]}
                interval={5000}
                scrambleDuration={2}
            />
            {/* <ProjectSection/> */}
        </div>
    )
}

export default MainPage