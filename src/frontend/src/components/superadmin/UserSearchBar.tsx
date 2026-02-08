import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';

export type SearchMode = 'userId' | 'principalId' | 'name';

interface UserSearchBarProps {
  onSearch: (query: string, mode: SearchMode) => void;
  placeholder?: string;
}

export default function UserSearchBar({ onSearch, placeholder = 'Search...' }: UserSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchMode, setSearchMode] = useState<SearchMode>('userId');

  const handleSearch = () => {
    onSearch(searchQuery, searchMode);
  };

  const handleClear = () => {
    setSearchQuery('');
    onSearch('', searchMode);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2">
      <Select value={searchMode} onValueChange={(value) => setSearchMode(value as SearchMode)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="userId">User ID</SelectItem>
          <SelectItem value="principalId">Principal ID</SelectItem>
          <SelectItem value="name">Name</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex-1 relative">
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="pr-8"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={handleClear}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <Button onClick={handleSearch}>
        <Search className="h-4 w-4 mr-2" />
        Search
      </Button>
    </div>
  );
}
