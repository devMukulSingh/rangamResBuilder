import { prisma } from "@/lib/prisma";
import { IinitialState } from "@/redux/slice/userSlice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const resumeData: IinitialState = await req.json();
    if (!resumeData || Object.keys(resumeData).length === 0)
      return NextResponse.json(
        {
          error: `Resume data is required`,
        },
        {
          status: 400,
        },
      );
    const {
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
    const user = await prisma.user.create({
      data:{
        email,
        goal:{
          create:{
            name:goal
          }
        },

      }
    })
      await prisma.experience.createMany({
       data:experience.map((item, index) => ({
        userId:user.id,
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
    })

    const experiences = await prisma.experience.findMany({});

    await prisma.jobTitle.createMany({
      data: experiences.map(item => ({
        name:item.companyName,
        experienceId:item.id,
      }))
    })
    const jobTitle = await prisma.jobTitle.findFirst({});
    const competences = experience.map(item => item.competences.filter(item => item.isSelected==true)).flat();
    console.log(competences);
    
    await prisma.competence.createMany({
      data:competences.map( (competence) => ({
        jobTitleId: jobTitle?.id || "",
        name: competence.name,
        description: competence.description
      }))
    })
    const userUpdate = await prisma.user.update({
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
                name: profession,
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
       skills:{
        create:
        technicalSkills.map( item => ({
          skillName:item,
        })),

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
        achievements: {},
        contacts: {},
        languages: {},
        projects: {},
      },
      where:{
        email
      },
      include: {
        educations: true,
        experiences: {
          include:{
            jobTitle:{
              include:{
                competences:true
              }
            }
          }
        },
        personalInfo: true,
        skills: true,
        achievements:true,
        contacts:true,
        goal:true,
        languages:true,
        projects:true
      },

    });

    return NextResponse.json(userUpdate, {
      status: 201,
    });
  } catch (e) {
    console.log(`Error in POST resumeData ${e}`);
    return NextResponse.json({
      error: `Error in POST resumeData ${e}`,
    });
  }
}
