"use client";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
  G,
} from "@react-pdf/renderer";
import { useAppSelector } from "@/redux/hooks/hooks";
import { FC } from "react";
import { RootState } from "@/redux/store/store";
import { IinitialState } from "@/redux/slice/userSlice";
import SVGIcon from "./SVGIcon";
import About from "./About";

interface PdfComponentProps {
  resumeData: IinitialState;
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#FFF",
    fontSize: 10.5,
  },
  section: {},
});

const PdfComponent: FC<PdfComponentProps> = ({ resumeData }) => {
  const {
    achievements,
    aiSuggesedSkills,
    aiSuggestedBio,
    aiSuggestedComp,
    aiSuggestedCompDesc,
    contact,
    description,
    education,
    experience,
    goal,
    languages,
    personalInfo,
    progress,
    projects,
    sidebar,
    technicalSkills,
  } = resumeData;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            width: "100%",
            height: 10.5,
            backgroundColor: "#60A5FA",
          }}
        />
        <About personalInfo={personalInfo} contact={contact}/>
      </Page>
    </Document>
  );
};

export default PdfComponent;
