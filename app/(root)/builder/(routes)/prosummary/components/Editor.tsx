"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setSelectedBio } from "@/redux/slice/userSlice";
import MCEEditor from "@/components/commons/MCEEditor";

const Editor = () => {
  const dispatch = useAppDispatch();
  const selectedBio = useAppSelector(
    (state) => state.persistedReducer.personalInfo.bio
  );
  return (
    <MCEEditor
      height={500}
      value={selectedBio}
      onChange={(content) => dispatch(setSelectedBio(content))}
    />
  );
};

export default Editor;
