import React from 'react'

const Skills = () => {
    const skills = [
        { name: "Web Design", skillset:[
            {
                skillName:'Canva',
                level:75
            },
            {
                skillName:'Figma',
                level:20
            },
            {
                skillName:'Adobe XD',
                level:3
            }
        ]},
        { name: "IoT & Data Analytics", skillset: [
            {
                skillName:'Think speak',
                level:60
            },
            {
                skillName:'Adafruit',
                level:60
            },
            {
                skillName:'AWS IoT Analytics',
                level:70
            }
        ]},
        { name: "Cloud Technology", skillset: [
            {
                skillName:'AWS',
                level:70
            },
            {
                skillName:'GCP',
                level:20
            },
            {
                skillName:'Azure',
                level:10
            }
        ]},
        { name: "Web Development", skillset: [
            {
                skillName:'Visual Studio Code',
                level:85
            },
            {
                skillName:'Mozilla firefox',
                level:80
            },
            {
                skillName:'React JS',
                level:60
            }
        ]},
        { name: "Robotics", skillset: [
            {
                skillName:'Arduino',
                level:85
            },
            {
                skillName:'ESP8266',
                level:80
            },
            {
                skillName:'ESP32',
                level:76
            }
        ]},
        { name: "STEM Kit", skillset: [
            {
                skillName:'Witblox',
                level:90
            },
            {
                skillName:'Microbit',
                level:87
            },
            {
                skillName:'Pictoblox',
                level:82
            }
        ]},
    ]
  return (
    <>   
        <div className="container rounded-3 p-5 mt-5" id="skills">
            <div className="title text-center"><h2>Skill <span>Set</span></h2></div>
            <div className="skills row g-2 px-1 mt-2">
                {skills.map((skill) => (
                    <div className="col-xl-4 col-md-6 col-12" key={skill.name}>
                        <div className="skillSet rounded-3 px-3 mt-2">
                            <div className="title text-center"> 
                                <h4>{skill.name}</h4>
                            </div>
                            <div className="body pb-3">
                                {skill.skillset.map((skillset) => (
                                    <div className="skillName" key={skillset.skillName}>
                                        <h5>{skillset.skillName}</h5>
                                        <div className="skillProgress py-1 d-flex align-items-center">
                                            <div className="progress" role="progressbar" style={{width:"80%"} }>
                                                <div 
                                                    className="progress-bar" 
                                                    role="progressbar"
                                                    aria-valuenow={skillset.level} 
                                                    aria-valuemin="0" 
                                                    aria-valuemax="100"
                                                    style={{width: `${skillset.level}%`}}
                                                ></div>
                                            </div><span className='ps-2'>{skillset.level}%</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default Skills