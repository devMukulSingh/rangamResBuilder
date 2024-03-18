import { HTMLRenderer } from '@/lib/HTMLRenderer';
import { useAppSelector } from '@/redux/hooks/hooks';

interface ProjectSectionProps {

}

const ProjectSection: React.FC<ProjectSectionProps> = ({

}) => {
    const projects = useAppSelector(state => state.persistedReducer.projects);

    return (
        <section className='space-y-5  bg-white p-5'>

            <h1 className=' text-xl font-semibold'>
                Projects
            </h1>
            {
                projects?.map((project, index) => (

                    <div className='space-y-5' key={index}>
                        <div className='flex gap-5 items-center'>
                            <h1 className='text-lg'>
                                {project?.projectName}
                            </h1>
                            <h1 className="underline text-black text-sm">
                                {project?.projectUrl}
                            </h1>
                        </div>
                        <HTMLRenderer htmlString={project.description} />
                    </div>
                ))
            }
        </section>
    )
}

export default ProjectSection