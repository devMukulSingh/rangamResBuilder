"use client";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IForm } from "../PersonalForm";
import { FC } from "react";

const Phone: FC<IForm> = ({ form, handleChange }) => {
  const {
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  return (
    <FormField
      name="phone"
      control={control}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel>Phone</FormLabel>
          <PhoneInput
            enableSearch
            containerStyle={{ height: "40px", outline: "none" }}
            inputStyle={{
              height: "40px",
              border: "0.5px solid #e4e4e4",
              width: "100%",
            }}
            dropdownStyle={{ background: "white" }}
            dropdownClass="bg-white"
            country={"us"}
            onChange={(val, country, e, formattedValue) =>
              field.onChange(formattedValue)
            }
            value={field.value}
          />
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default Phone;

{
  /* <Popover open={open} onOpenChange={setOpen}>
  <PopoverTrigger asChild>
    <FormControl>
      <Button
        disabled={isSubmitting}
        variant="outline"
        role="combobox"
        className={cn(
          "w-full bg-white justify-between",
          !field.value && "text-muted-foreground"
        )}
      >
        {
          countryCodes.find(
            (countryCode) => countryCode.mobileCode === field.value
          )?.mobileCode
        }
      </Button>
    </FormControl>
  </PopoverTrigger>

  <PopoverContent className=" p-0">
    <Command>
      <CommandInput
        placeholder="Search country code..."
        className="h-9"
      />
      <CommandEmpty>No country code found.</CommandEmpty>
      <CommandGroup>
        <ScrollArea className="h-72 rounded-md border">
          {countryCodes.map((code) => (
            <CommandItem
              key={code.name}
              value={code.name}
              onSelect={() => {
                setValue && setValue("countryCode", code.mobileCode);
                setOpen(false);
                handleChange && handleChange();
              }}
            >
              {code.mobileCode} ({code.name})
              <Check
                className={cn(
                  "ml-auto h-4 w-4",
                  code.mobileCode === field.value
                    ? "opacity-100"
                    : "opacity-0"
                )}
              />
            </CommandItem>
          ))}
        </ScrollArea>
      </CommandGroup>
    </Command>
  </PopoverContent>
</Popover> */
}
