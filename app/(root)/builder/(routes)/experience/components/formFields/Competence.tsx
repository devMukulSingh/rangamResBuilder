import { useAppSelector } from "@/redux/hooks/hooks";
import { IExperienceForm } from "../ExperienceForm";
import { UseFormReturn } from "react-hook-form";
import { Iexperience } from "@/lib/types";

interface competenceProps {
  competence: string;
  onChange: (competences: string[]) => void;
  index: number;
  form: UseFormReturn<
    {
      experience: Iexperience[];
    },
    any,
    undefined
  >;
}

const Competence: React.FC<competenceProps> = ({
  competence,
  onChange,
  index,
  form,
}) => {
  const competences = form.getValues().experience[index].competences;

  const handleSelect = () => {
    const alreadySelected = competences.find((item) => item === competence);

    if (alreadySelected) {
      const filtered = competences.filter((item) => item !== competence);
      onChange(filtered);
    } else {
      onChange([...competences, competence]);
    }
  };

  if (competence === "") return null;

  return (
    <>
      <div
        onClick={handleSelect}
        className={`py-5
                        transition
                        px-3
                        h-16
                        w-full
                        flex 
                        items-center
                          rounded-sm
                          shadow-md
                           cursor-pointer
                            ${
                              competences.includes(competence)
                                ? "border-2 border-white bg-gray-400 transition scale-90 text-neutral-100"
                                : " bg-white text-black"
                            } 
                            `}
      >
        <h1 className="text-sm ">{competence}</h1>
      </div>
    </>
  );
};

export default Competence;
