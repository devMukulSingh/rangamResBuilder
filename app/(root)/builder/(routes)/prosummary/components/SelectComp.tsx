import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SelectComp = () => {
    return (
        <Select>
            <SelectTrigger className="w-full bg-white py-8">
                <SelectValue placeholder="Project Manager" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="est">Project Manager</SelectItem>
                <SelectItem value="cst">Project Manager</SelectItem>
                <SelectItem value="mst">Project Manager</SelectItem>
                <SelectItem value="pst">Project Manager</SelectItem>
                <SelectItem value="akst">Project Manager</SelectItem>
                <SelectItem value="hst">Project Manager</SelectItem>
            </SelectContent>
        </Select>
    )
}

export default SelectComp