import { useLocale } from '@/providers/LocaleProvider';
import { Button } from '@/components/ui/button';

export default function LanguageToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 border rounded-md p-1">
      <Button
        variant={locale === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLocale('en')}
        className="h-7 px-3 text-xs"
      >
        EN
      </Button>
      <Button
        variant={locale === 'id' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLocale('id')}
        className="h-7 px-3 text-xs"
      >
        ID
      </Button>
    </div>
  );
}
