
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity,
  Filter,
  Search,
  Plus,
  RefreshCw
} from "lucide-react";

const FleetHeader = () => {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-900">Real-Time Fleet Overview</h2>
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <Activity className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
        <p className="text-gray-600 mt-1">Monitor and control generators across India in real-time</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
        <Button size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Generator
        </Button>
      </div>
    </div>
  );
};

export default FleetHeader;
