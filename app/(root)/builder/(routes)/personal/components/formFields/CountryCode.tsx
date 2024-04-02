import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { FC, useState } from "react";
import { countryCodes } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { IForm } from "../PersonalForm";

const CountryCode: FC<IForm> = ({ form,handleChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <FormField
      defaultValue="+1 (US)"
      name="countryCode"
      control={form.control}
      render={({ field }) => (
        <FormItem className="w-1/2">
          <FormLabel>Country Code</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn(
                    "w-full bg-white justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {
                    countryCodes.find(
                      (countryCode) => countryCode.mobileCode === field.value,
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
                          form.setValue("countryCode", code.mobileCode);
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
                              : "opacity-0",
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
  );
};

export default CountryCode;
