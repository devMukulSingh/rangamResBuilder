import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { UseFormReturn } from "react-hook-form";
import { Iexperience } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios, { Axios } from "axios";
import { setAiSuggestedCompDesc } from "@/redux/slice/userSlice";
import { setCompDescLoading } from "@/redux/slice/commonSlice";

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
  console.log("rerennder");
  const dispatch = useAppDispatch();
  const competences = form.getValues().experience[index].competences;
  const profession = useAppSelector(
    (state) => state.persistedReducer.personalInfo.profession
  );

  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ["compDescription"],
    enabled: false,
    refetchOnWindowFocus: false,
    queryFn: async () => {
      const { data } = await axios.get(`/api/ai/get-compdescription`, {
        params: {
          competence,
          profession,
        },
      });
      dispatch(setCompDescLoading(isLoading));
      dispatch(setAiSuggestedCompDesc(data));
    },
  });
  if (isError) {
    console.log(`Error in getCompetence Description ${error}`);
  }
  const handleSelect = () => {

    const alreadySelected = competences.find((item) => item === competence);
    if (alreadySelected) {
      const filtered = competences.filter((item) => item !== competence);
      onChange(filtered);
    } else {
        refetch();
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
