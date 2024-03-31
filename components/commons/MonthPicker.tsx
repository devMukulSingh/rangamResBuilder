import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { FC } from "react";
import clsx from "clsx";

const MonthPicker: FC<any> = ({
  field,
  className,
  disableFuture,
  disabled,
  minDate,
}) => {
  const value = new Date(field.value);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
        defaultValue={""}
          value={!field.value ? "" : value}
          minDate={minDate}
          disabled={disabled}
          disableFuture={disableFuture}
          className={clsx(`bg-white pt-0 pb-0 w-auto `, className)}
          views={["month", "year"]}
          onChange={(newValue) => field.onChange(newValue)}

        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default MonthPicker;
