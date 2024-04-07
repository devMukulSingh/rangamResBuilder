import { prisma } from "@/lib/prisma";
import { IinitialState } from "@/redux/slice/userSlice";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try{
        const resumeData: IinitialState = await req.json();
        if (!resumeData || Object.keys(resumeData).length === 0) return NextResponse.json({
        error: `Resume data is required`
    }, {
        status: 400
    });
    const { 
        education, 
        experience, 
        goal, 
        personalInfo: {bio,countryCode,email,fullName,mobile,profession,address,birthPlace,city,dob,state,}, 
        technicalSkills 
    } = resumeData;

    const user = await prisma.user.create({
        data: {
            goal,
            personalInfo: {
                create: {
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
                }
            },
            skills:{
                createMany:{
                    data: [...technicalSkills.map(item => ({
                        skillName: item,
                    }))],
                    skipDuplicates:true,

                },
            },
            experiences:{
                createMany:{
                    data:[
                        ...experience.map( item => ({
                            companyName: item.companyName,
                            jobTitle: item.jobTitle,
                            startDate:  item.startDate.toLocaleString(),
                            endDate:  item.endDate.toLocaleString(),
                            checkboxWorkingStatus: item.checkboxWorkingStatus,
                            checkboxVolunteering: item.checkboxVolunteering,
                            checkboxInternship: item.checkboxInternship,
                            description: item.description,
                            address: item.address || "",
                            employer: item.employer || "",
                            competences: [...experience.map(item => item.competences.filter(item => item.isSelected==true).map(item => ({
                                name:item.name,
                                description:item.description
                            }))).flat()
                        ]

                        }))
                    ]
                }
            },
            educations:{
                createMany:{
                    data:[
                        ...education.map( item => ({
                            schoolName: item.schoolName,
                            degree: item.degree,
                            speciality: item.speciality,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            checkboxPursuing: item.checkboxPursuing,
                            schoolLocation:  item.schoolLocation
                        }))
                    ]
                }
            },
            achievements:{},
            contacts:{},
            languages:{},
            projects:{},

        },

        include:{
            educations:true,
            experiences:true,
            personalInfo:true,
            skills:true,

        }
    });


    return NextResponse.json(user,{
        status:201
    });

    }
    catch(e){
        console.log(`Error in POST resumeData ${e}`);
        return NextResponse.json({
            error:`Error in POST resumeData ${e}`
        });
        
    }
}