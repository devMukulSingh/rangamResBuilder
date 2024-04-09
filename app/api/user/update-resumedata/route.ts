import { prisma } from "@/lib/prisma";
import { IinitialState } from "@/redux/slice/userSlice";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const resumeData: IinitialState = await req.json();
    const {
      achievements,
      contact,
      languages,
      projects,
      education,
      experience,
      goal,
      personalInfo: {
        bio,
        countryCode,
        email,
        fullName,
        mobile,
        profession,
        address,
        birthPlace,
        city,
        dob,
        state,
      },
      technicalSkills,
    } = resumeData;
    if (!resumeData || Object.keys(resumeData).length === 0)
      return NextResponse.json(
        {
          error: `Resume data is required`,
        },
        {
          status: 400,
        },
      );
    const userByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userByEmail)
      return NextResponse.json(
        {
          error: "Unauthorised, user doesn't exists",
        },
        { status: 401 },
      );

    const user = await prisma.user.update({
      data: {
        goal,
        personalInfo: {
          update: {
            bio,
            countryCode,
            email,
            profession,
            mobile,
            fullName,
            address,
            birthPlace,
            city,
            dob,
            state,
          },
        },
        skills: {
          createMany: {
            data: technicalSkills.map((item) => ({
              skillName: item,
            })),
          },
        },
        experiences: {
          createMany: {
            data: experience.map((item) => ({
              companyName: item.companyName,
              jobTitle: item.jobTitle,
              startDate: item.startDate.toLocaleString(),
              endDate: item.endDate.toLocaleString(),
              checkboxWorkingStatus: item.checkboxWorkingStatus,
              checkboxVolunteering: item.checkboxVolunteering,
              checkboxInternship: item.checkboxInternship,
              description: item.description,
              address: item.address || "",
              employer: item.employer || "",
              competences: item.competences
                .filter((item) => item.isSelected == true)
                .map((item) => ({
                  name: item.name,
                  description: item.description,
                }))
                .flat(),
            })),
          },
        },
        educations: {
          createMany: {
            data: education.map((item) => ({
              schoolName: item.schoolName,
              degree: item.degree,
              speciality: item.speciality,
              startDate: item.startDate,
              endDate: item.endDate,
              checkboxPursuing: item.checkboxPursuing,
              schoolLocation: item.schoolLocation,
            })),
          },
        },
        achievements: {
          createMany: {
            data: achievements.map((item) => ({
              name: item.value,
            })),
          },
        },
        contacts: {
          upsert: {
            create: {
              github: contact?.github,
              linkedIn: contact?.linkedIn,
              portfolio: contact?.portfolio,
              twitter: contact?.twitter,
            },
            update: {
              github: contact?.github,
              linkedIn: contact?.linkedIn,
              portfolio: contact?.portfolio,
              twitter: contact?.twitter,
            },
            where: {
              userId: userByEmail.id,
            },
          },
        },
        languages: {
          createMany: {
            data: languages.map((item) => ({
              name: item.language,
              strength: item.strength,
            })),
          },
        },
        projects: {
          createMany: {
            data: projects.map((item) => ({
              projectName: item.projectName,
              description: item.description,
              projectUrl: item.projectUrl,
            })),
          },
        },
      },

      include: {
        educations: true,
        experiences: true,
        personalInfo: true,
        skills: true,
        achievements: true,
        languages: true,
        contacts: true,
        projects: true,
      },
      where: {
        id: userByEmail.id,
      },
    });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (e) {
    console.log(`Error in PUT resumeData req ${e}`);
    return NextResponse.json({
      error: `Error in PUT resumeData req ${e}`,
    });
  }
}
