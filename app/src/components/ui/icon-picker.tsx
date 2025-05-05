import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useDebounce } from 'use-debounce';
import { Input } from './input';
import { Button } from './button';

const ALLOWED_ICON_PACKS = ['mdi', 'fa', 'tabler', 'ic', 'twemoji', 'ri', 'ph', 'bx', 'fluent', 'ci', 'gg', 'akar-icons', 'basil', 'bxs', 'cuida', 'famicons', 'uil', 'mi', 'mdi-light', 'tdesign', 'ri', 'stash'];

type IconPickerProps = {
    value: string | null;
    onChange: (icon: string) => void;
    showSearch?: boolean;
    limit?: number;
};

export default function IconPicker({
    value,
    onChange,
    showSearch = true,
    limit = 60,
}: IconPickerProps) {
    const [query, setQuery] = useState('');
    const [debouncedQuery] = useDebounce(query, 500);
    const [icons, setIcons] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedIcon, setSelectedIcon] = useState<string | null>(null);

    const fetchIcons = async (search: string) => {
        setLoading(true);
        try {
            const res = await fetch(`https://api.iconify.design/search?query=${search}`);
            const data = await res.json();
            const filtered = data.icons?.filter((icon: string) =>
                ALLOWED_ICON_PACKS.some((pack) => icon.includes(`${pack}:`))
            );
            setIcons(filtered.slice(0, limit));
        } catch (err) {
            console.error('Failed to fetch icons:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchRandomIcons = async () => {
        setLoading(true);
        try {
            const allIcons: string[] = [];
            for (const prefix of ALLOWED_ICON_PACKS) {
                const resIcons = await fetch(`https://api.iconify.design/collection?prefix=${prefix}&search=all`);
                const packData = await resIcons.json();
                const names = packData.icons || [];
                const randomIcons = names
                    .sort(() => 0.5 - Math.random())
                    .slice(0, limit)
                    .map((name: string) => `${prefix}:${name}`);
                allIcons.push(...randomIcons);
            }

            setIcons(allIcons.slice(0, limit));
        } catch (error) {
            console.error('Error fetching random icons:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (debouncedQuery.trim() !== '') {
            fetchIcons(debouncedQuery.trim());
        } else {
            fetchRandomIcons();
        }
    }, [debouncedQuery]);

    return (
        <div className="p-2 w-full max-w-xl mx-auto ring-1 ring-[#eee] rounded-lg bg-gray-50 shadow-sm">
            <div className="flex w-full max-w-sm items-center space-x-2">
                <Input
                    id="name"
                    className="bg-white"
                    type="text"
                    value={value || ''}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="Pilih icon..."
                    readOnly
                />
                <Icon
                    icon={value || 'ic:baseline-close'}
                    width={24}
                    height={24}
                    className="text-gray-500"
                />
            </div>
            {showSearch && (
                <Input
                    type="text"
                    placeholder="Cari icon, misal: image"
                    className="w-full px-4 py-2 border rounded-lg bg-white mt-2"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            )}

            {loading && <p className="mt-2 text-sm text-gray-500">Memuat icon...</p>}

            <div className="grid grid-cols-6 gap-3 mt-4 max-h-[30vh] overflow-y-auto p-1">
                {icons.map((iconName) => (
                    <div
                        key={iconName}
                        className={`p-2 border rounded-lg cursor-pointer flex items-center justify-center transition-all duration-200
            ${value === iconName ? 'ring-2 ring-primary bg-primary/10' : 'hover:bg-gray-100'}`}
                        onClick={() => onChange(iconName)}
                    >
                        <Icon icon={iconName} width={24} height={24}
                            className={`text-gray-700 ${value === iconName ? 'text-primary' : 'text-gray-500'}`}
                        />
                    </div>
                ))}
            </div>

            {!loading && icons.length === 0 && (
                <p className="text-xs mt-4 text-center text-gray-400">Icon Tidak Ditemukan.</p>
            )}
        </div>
    );
}
