"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { setSelectedBio } from "@/redux/slice/userSlice";
import dynamic from "next/dynamic";
import TextEditorSkeleton from "./TextEditorSkeleton";
// import RichTextEditor from "@/components/commons/RichTextEditor";
const RichTextEditor = dynamic(
  () => import("@/components/commons/RichTextEditor"),
  {
    loading: () => <TextEditorSkeleton />,
  },
);

const Editor = () => {
  const dispatch = useAppDispatch();
  const selectedBio = useAppSelector(
    (state) => state.persistedReducer.personalInfo.bio,
  );
  return (
    <RichTextEditor
      value={selectedBio}
      onChange={(content) => dispatch(setSelectedBio(content))}
    />
  );
};

export default Editor;
