
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchIcon } from "lucide-react";

interface FoodFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterType: string;
  setFilterType: (type: string) => void;
  foodTypeOptions: { value: string; label: string }[];
}

const FoodFilters = ({
  searchTerm,
  setSearchTerm,
  filterType,
  setFilterType,
  foodTypeOptions
}: FoodFiltersProps) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="relative flex-grow">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input 
          type="text"
          placeholder="Search for food items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 text-lg py-6"
        />
      </div>
      <div className="w-full md:w-64">
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="text-lg py-6">
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            {foodTypeOptions.map(option => (
              <SelectItem key={option.value} value={option.value} className="text-lg">
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FoodFilters;
