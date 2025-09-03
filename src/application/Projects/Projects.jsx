import React from 'react'
import { useParams } from 'react-router-dom'
import Gzxp24001 from './IoTProjects/Gzxp24001/Gzxp24001'
import Gzxp24002 from './IoTProjects/Gzxp24002/Gzxp24002'
import Gzxp24003 from './IoTProjects/Gzxp24003/Gzxp24003'
import Gzxp24004 from './IoTProjects/Gzxp24004/Gzxp24004'
import Gzxp24005 from './IoTProjects/Gzxp24005/Gzxp24005'
import Missing from '../../Missing'

const Projects = () => {
    const {projectId} = useParams();
    const CompList = {
        "Gzxp24001": Gzxp24001,
        "Gzxp24002": Gzxp24002,
        "Gzxp24003": Gzxp24003,
        "Gzxp24004": Gzxp24004,
        "Gzxp24005": Gzxp24005
    };
    const SelectedComp = CompList[projectId]  || Missing
  return (
    <>
        <SelectedComp />
    </>
  )
}

export default Projects