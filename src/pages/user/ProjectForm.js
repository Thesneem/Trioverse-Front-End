import React, { useState } from 'react';

const ProjectForm = () => {
    const [projects, setProjects] = useState([{ name: '', link: '' }]);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedProjects = [...projects];
        updatedProjects[index][name] = value;
        setProjects(updatedProjects);
    };

    const handleAddMore = () => {
        setProjects([...projects, { name: '', link: '' }]);
    };

    const handleRemove = (index) => {
        const updatedProjects = [...projects];
        updatedProjects.splice(index, 1);
        setProjects(updatedProjects);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform any necessary actions with the project data
        console.log(projects);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {projects.map((project, index) => (
                    <div key={index}>
                        <label htmlFor={`projectName${index}`}>Add your project details:</label>
                        <input
                            type="text"
                            name="name"
                            id={`projectName${index}`}
                            value={project.name}
                            onChange={(event) => handleInputChange(index, event)}
                        />
                        <label htmlFor={`projectLink${index}`}>Link:</label>
                        <input
                            type="text"
                            name="link"
                            id={`projectLink${index}`}
                            value={project.link}
                            onChange={(event) => handleInputChange(index, event)}
                        />
                        {index > 0 && (
                            <button type="button" onClick={() => handleRemove(index)}>Remove</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddMore}>Add more</button>
                <button type="submit">Submit</button>
            </form>

        </div >
    );
};

export default ProjectForm;
