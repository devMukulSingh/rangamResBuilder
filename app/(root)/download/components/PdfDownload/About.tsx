import React from "react";
import { Text, View } from "@react-pdf/renderer";
import { FC } from "react";
import SVGIcon from "./SVGIcon";
import { Icontact, IpersonalInfo } from "@/lib/types";

interface AboutProps {
  personalInfo: IpersonalInfo;
  contact: Icontact | null;
}

const About: FC<AboutProps> = ({ personalInfo, contact }) => {
  return (
    <>
      <View
        style={{
          padding: "0pt 30pt",
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <Text
          style={{
            color: "#60A5FA",
            fontSize: 20,
            fontWeight: "semibold",
          }}
        >
          {personalInfo?.fullName}
        </Text>
        <Text>{personalInfo.bio}</Text>

        {/* Links */}
        <View
          style={{
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "column",
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
              }}
            >
              <SVGIcon type="email" />
              <Text>{personalInfo?.email}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
              }}
            >
              <SVGIcon type="city" />
              <Text>{personalInfo.city}</Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "column",
              gap: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 5,
              }}
            >
              <SVGIcon type="mobile" />
              <Text>{personalInfo.mobile}</Text>
            </View>
            {contact?.linkedIn && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 5,
                }}
              >
                <SVGIcon type="linkedIn" />
                <Text>{contact?.linkedIn}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

export default About;
