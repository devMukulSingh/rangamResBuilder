import Image from "next/image"
import { motion } from "framer-motion"

interface TemplateProps {
    image: {
        url: string,
        id: string
    },
    setTemplateId: (templateId: string) => void,
    templateId: string,

}
const Template: React.FC<TemplateProps> = ({
    image,
    setTemplateId,
    templateId,

}) => {

    const handleTemplateSelect = () => {
        setTemplateId(image.id);
    }

    return (
        <motion.div
            initial={{ opacity:0 }}
            animate={{ opacity: [0,1], scale:[0.9,1]}}
            transition={{ duration:0.3}}
        >
            <figure
                className={
                    `relative
                w-[20rem]
                h-[25rem]
                
                `}>
                <Image
                    onClick={handleTemplateSelect}
                    alt="template"
                    fill
                    src={image.url}
                    placeholder="blur"
                    blurDataURL="URL"
                    className={`
                hover:scale-110
                transition
                object-
                cursor-pointer
                ${templateId === image.id ? ' border-4 border-red-400 scale-110' : ''}
                
                `}
                />
            </figure>
        </motion.div>
    )
}

export default Template