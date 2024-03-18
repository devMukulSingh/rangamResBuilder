'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button";
import { setPersonalInfo } from "@/redux/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/hooks";
import { useParams, useRouter } from "next/navigation";
import { setProgress } from "@/redux/slice/userSlice";
import { countryCodes } from "@/lib/constants";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setFormComp } from "@/redux/slice/commonSlice";
import { motion } from "framer-motion"


const PersonalForm = () => {

    const [open, setOpen] = useState(false);
    const dispatch = useAppDispatch();

    const schema = z.object({
        fullName: z.string().min(3, {
            message: 'Name should be minimum 3 characters'
        }).max(30, {
            message: 'Name should be max 30 characters'
        }),
        email: z.string().email({
            message: 'Please enter valid email'
        }),
        profession: z.string().min(3, {
            message: 'Profession should be minimum 5 characters'
        }).max(30, {
            message: 'Profession should be max 30 characters'
        }),
        address: z.string().min(5, {
            message: 'Address should be minimum 5 characters'
        }).max(30, {
            message: 'Address should be max 30 characters'
        }),
        countryCode: z.string().min(2, {
            message: 'CountryCode should be minimum 2 numbers'
        }),
        mobile: z.string().min(10, {
            message: 'Mobile no should be minimum 10 numbers'
        }),
        city: z.string().min(3, {
            message: 'City should be minimum 3 characters'
        }).max(20, {
            message: 'City should be max 20 characters'
        }),
        state: z.string().min(3, {
            message: 'State should be minimum 3 characters'
        }).max(20, {
            message: 'State should be max 20 characters'
        }),
        dob: z.any(),
        birthPlace: z.string().min(3, {
            message: 'BirthPlace should be minimum 3 characters'
        }).max(20, {
            message: 'BirthPlace should be max 20 characters'
        })

    })

    type formSchema = z.infer<typeof schema>
    const personalInfo = useAppSelector(state => state.persistedReducer.personalInfo);
    const progress = useAppSelector(state => state.persistedReducer.progress);

    const form = useForm<formSchema>({
        resolver: zodResolver(schema),
        defaultValues: personalInfo || {
            address: '',
            birthPlace: '',
            city: '',
            countryCode: '+91',
            dob: '',
            email: '',
            fullName: '',
            mobile: '',
            profession: '',
            state: ''
        }
    });

    const onSubmit = () => {
        dispatch(setFormComp("Experience")) 
        if (progress <= 10) {
            dispatch(setProgress())
        }
    }
    const handleChange = () => {
        dispatch(setPersonalInfo(form.getValues()));
    }

    return (
        <motion.div
        animate={{ x: 1,opacity:[0,1] }}
        initial={{ x: -150,opacity:0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="p-5">
            <Form {...form} >
                <form onChange={handleChange}
                    onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-5">

                        {/* Name */}
                        <FormField
                            name="fullName"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* email */}
                        <FormField
                            name="email"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* profession */}
                        <FormField
                            name="profession"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Profession</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* address */}
                        <FormField
                            name="address"
                            control={form.control}
                            render={({ field }) => (
                                <FormItem >
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input className="bg-white" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex gap-5 w-full">
                            {/* countryCode */}
                            <FormField
                                name="countryCode"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-1/2" >
                                        <FormLabel>Country Code</FormLabel>
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <FormControl>

                                                    <Button
                                                        variant="ghost"
                                                        role="combobox"
                                                        className={cn(
                                                            "w-[200px] bg-white justify-between",
                                                            !field.value && "text-muted-foreground"
                                                        )}
                                                    >
                                                        {field.value
                                                            ? countryCodes.find(
                                                                (countryCode) => countryCode.mobileCode === field.value
                                                            )?.mobileCode
                                                            : "Select country code"}
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-[] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search country code..." className="h-9" />
                                                    <CommandEmpty>No country code found.</CommandEmpty>
                                                    <CommandGroup >
                                                        <ScrollArea className="h-72 rounded-md border">
                                                            {countryCodes.map((code) => (
                                                                <CommandItem
                                                                    key={code.name}
                                                                    value={code.name}
                                                                    onSelect={() => {
                                                                        form.setValue('countryCode', code.mobileCode);
                                                                        setOpen(false);
                                                                    }}
                                                                >
                                                                    {code.mobileCode} ({code.name})
                                                                    <Check
                                                                        className={cn(
                                                                            "ml-auto h-4 w-4",
                                                                            code.mobileCode === field.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                </CommandItem>
                                                            ))}
                                                        </ScrollArea>
                                                    </CommandGroup>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* mobile no */}
                            <FormField
                                name="mobile"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-1/2" >
                                        <FormLabel>Mobile</FormLabel>
                                        <FormControl>
                                            <Input className="bg-white" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5">
                            {/* city */}
                            <FormField
                                name="city"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input className="bg-white" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* state */}
                            <FormField
                                name="state"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel>State</FormLabel>
                                        <FormControl>
                                            <Input className="bg-white" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-full">

                            {/* dob */}
                            <FormField
                                name="dob"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-1/2">
                                        <FormLabel>Date of Birth</FormLabel>
                                        <FormControl>
                                            <Input className="bg-white "  {...field} type="date" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* birthplace */}
                            <FormField
                                name="birthPlace"
                                control={form.control}
                                render={({ field }) => (
                                    <FormItem className="w-1/2" >
                                        <FormLabel>Birth Place</FormLabel>
                                        <FormControl>
                                            <Input className="bg-white" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full">
                            Next
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
        </motion.div>
    )
}

export default PersonalForm