import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import BrandLogo from './BrandLogo';

interface DashboardSidebarProps {
    menuItems: { label: string; value: string }[];
    activeItem: string;
    onItemClick: (value: string) => void;
}

export default function DashboardSidebar({ menuItems, activeItem, onItemClick }: DashboardSidebarProps) {
    return (
        <aside className="w-64 border-r bg-card h-screen sticky top-0 flex flex-col">
            <div className="p-6">
                <BrandLogo variant="horizontal" className="h-8" />
            </div>
            <Separator />
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => (
                    <Button
                        key={item.value}
                        variant={activeItem === item.value ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => onItemClick(item.value)}
                    >
                        {item.label}
                    </Button>
                ))}
            </nav>
        </aside>
    );
}
