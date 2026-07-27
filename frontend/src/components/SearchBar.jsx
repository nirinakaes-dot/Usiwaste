import React from 'react';
import {Search,Filter,Store,ChevronDown, X} from "lucide-react";
import { useRef } from 'react';
export default function SearchBar(value, onChange) {
    const inputRef = useRef(null);
    const handleClear = () => {
        onChange('');
        inputRef.current?.focus();
    };
    return(
                <div className="relative flex items-center mb-6">
            <Search size={18} className="absolute left-4 text-stone-400 pointer-events-none"/>
            <input ref={inputRef} type="text" placeholder="Search by product name"
            value={value}
            onChange={e => onChange(e.target.value)} className="w-full pl-11 pr-10 py-3 bg-white border border-stone-200 rounded-xl text-stone-700 placeholder-stone-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent shadow-sm transition-shadow" />
            {value &&(
                <button onClick={handleClear} className="absolute right-3 p-1 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors">
                    <X size={16}/>
                </button>
            )}
        </div>
    )
}
