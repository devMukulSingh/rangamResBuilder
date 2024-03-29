import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ControllerRenderProps } from "react-hook-form";
import { Ieducation, Iexperience } from "@/lib/types";
import { FC } from "react";
import clsx from "clsx";

const MonthPicker: FC<any> = ({ field, className }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          className={clsx(`bg-white h-14 pt-0 w-auto `, className)}
          views={["month", "year"]}
          {...field}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default MonthPicker;
