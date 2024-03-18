'use client'
import { motion } from "framer-motion"
import { Components } from "@/lib/Components";
import { useAppSelector } from "@/redux/hooks/hooks"

interface MainCompProps {

}

const MainComp: React.FC<MainCompProps> = ({

}) => {
  const formComp = useAppSelector(state => state.commonSlice.formComp);
  const FormComponent = Components[formComp || 'Personal Information']


  return (
    <FormComponent />
  )
}

export default MainComp