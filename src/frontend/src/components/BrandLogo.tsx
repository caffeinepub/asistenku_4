import { BRAND_ASSETS } from '@/lib/brand';

interface BrandLogoProps {
    variant?: 'horizontal' | 'icon';
    className?: string;
}

export default function BrandLogo({ variant = 'horizontal', className = '' }: BrandLogoProps) {
    const src = variant === 'horizontal' ? BRAND_ASSETS.logoHorizontal : BRAND_ASSETS.icon;
    const alt = 'Asistenku';

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={{
                filter: 'none',
                backgroundColor: 'transparent',
                objectFit: 'contain'
            }}
        />
    );
}
