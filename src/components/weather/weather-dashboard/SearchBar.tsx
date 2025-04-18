import { memo } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Plus, Search } from "lucide-react";

interface SearchBarProps {
  searchCity: string;
  setSearchCity: (city: string) => void;
  addCity: () => void;
  error: string | null;
}

const SearchBar = memo(({ searchCity, setSearchCity, addCity, error }: SearchBarProps) => {
  return (
    <div className="w-full max-w-md">
      <div className="flex gap-2 mb-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
          <Input
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Add a city (e.g., Singapore)"
            className="pl-9"
            onKeyDown={(e) => e.key === 'Enter' && addCity()}
          />
        </div>
        <Button onClick={addCity}>
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
      
      {error && <p className="text-sm text-[hsl(var(--destructive))]">{error}</p>}
    </div>
  );
});

SearchBar.displayName = 'SearchBar';

export default SearchBar; 