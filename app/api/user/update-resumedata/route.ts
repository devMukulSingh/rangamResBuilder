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
    const deletedUser = await prisma.user.delete({
      where: {
        email
      }
    })
    if (!deletedUser)
      return NextResponse.json(
        {
          error: "Unauthorised, user doesn't exists",
        },
        { status: 401 },
      );
    const newUser = await prisma.user.create({
      data:{
        email,
        goal:{
          create:{
            name:goal
          }
        }
      }
    })
    await prisma.experience.createMany({
      data: experience.map((item, index) => ({
        userId: newUser.id,
        companyName: item.companyName,
        startDate: item.startDate.toLocaleString(),
        endDate: item.endDate.toLocaleString(),
        checkboxWorkingStatus: item.checkboxWorkingStatus,
        checkboxVolunteering: item.checkboxVolunteering,
        checkboxInternship: item.checkboxInternship,
        description: item.description,
        address: item.address || "",
        employer: item.employer || "",
      })),
    });

    const experiences = await prisma.experience.findMany({});

    await prisma.jobTitle.createMany({
      data: experiences.map((item) => ({
        name: item.companyName,
        experienceId: item.id,
      })),
      // where: {
      //   experienceId: {
      //     in: [...experiences.map(item => item.id)]
      //   }

      // }
    });
    const jobTitle = await prisma.jobTitle.findFirst({});
    const competences = experience
      .map((item) => item.competences.filter((item) => item.isSelected == true))
      .flat();

    await prisma.competence.createMany({
      data: competences.map((competence) => ({
        jobTitleId: jobTitle?.id || "",
        name: competence.name,
        description: competence.description,
      })),
      // where: {
      //   jobTitleId: jobTitle?.id
      // }
    });

    const user = await prisma.user.update({
      data: {
        personalInfo: {
          create: {
            bio,
            countryCode: {
              create: {
                code: countryCode,
              },
            },
            email,
            profession: {
              create: {
                name: countryCode,
              },
            },
            mobile,
            fullName,
            address,
            birthPlace: {
              create: {
                name: birthPlace,
              },
            },
            city: {
              create: {
                name: city,
              },
            },
            dob,
            state: {
              create: {
                name: state,
              },
            },
          },
        },
        skills: {
          create: technicalSkills.map((item) => ({
            skillName: item,
          })),
        },
  
        //   createMany: {
        //     data: experience.map((item) => ({
        //       companyName: item.companyName,
        //       jobTitle: item.jobTitle,
        //       startDate: item.startDate.toLocaleString(),
        //       endDate: item.endDate.toLocaleString(),
        //       checkboxWorkingStatus: item.checkboxWorkingStatus,
        //       checkboxVolunteering: item.checkboxVolunteering,
        //       checkboxInternship: item.checkboxInternship,
        //       description: item.description,
        //       address: item.address || "",
        //       employer: item.employer || "",
        //       competences: item.competences
        //         .filter((item) => item.isSelected == true)
        //         .map((item) => ({
        //           name: item.name,
        //           description: item.description,
        //         }))
        //         .flat(),
        //     })),
        //   },
        // },
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
            // where: {
            //   userId: userByEmail.id
            // }
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
          // upsert: {
            create: {
              github: contact?.github,
              linkedIn: contact?.linkedIn,
              portfolio: contact?.portfolio,
              twitter: contact?.twitter,
            },
            // update: {
            //   github: contact?.github,
            //   linkedIn: contact?.linkedIn,
            //   portfolio: contact?.portfolio,
            //   twitter: contact?.twitter,
            // },
            // where: {
            //   userId: userByEmail.id,
            // },
          // },
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
        experiences: {
          include: {
            jobTitle: {
              include: {
                competences: true,
              },
            },
          },
        },
        personalInfo: true,
        skills: true,
        achievements: true,
        contacts: true,
        goal: true,
        languages: true,
        projects: true,
      },
      where: {
        id: newUser.id,
      },
    });

    return NextResponse.json(user, {
      status: 201,
    });
  } catch (e) {
    console.log(`Error in PUT resumeData req ${e}`);
    return NextResponse.json(e,{status:500});
  }
}
