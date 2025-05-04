import React from 'react';

interface AttrValue {
  attrId: number;
  attrValue: string;
  img?: string;
  isShowHotTag: boolean;
}

interface AttrOption {
  attrTitle: string;
  attrValues: AttrValue[];
}

interface SkuSelectorProps {
  options: AttrOption[];
  selectedValues: Record<string, AttrValue>;
  onChange: (attrTitle: string, value: AttrValue) => void;
  onImageClick?: (img: string) => void;
}

const SkuSelector: React.FC<SkuSelectorProps> = ({
  options,
  selectedValues,
  onChange,
  onImageClick,
}) => {
  return (
    <div className="space-y-6">
      {options.map((option) => (
        <div key={option.attrTitle}>
          <h3 className="mb-3 text-sm font-medium text-gray-900">{option.attrTitle}</h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {option.attrValues.map((value) => {
              const isSelected = selectedValues[option.attrTitle]?.attrId === value.attrId;
              
              return (
                <button
                  key={value.attrId}
                  onClick={() => {
                    onChange(option.attrTitle, value);
                  }}
                  className={`flex flex-col items-center rounded-lg border p-2 transition-all ${
                    isSelected
                      ? 'border-black bg-black/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {value.img && (
                    <div 
                      className="mb-2 h-16 w-16 overflow-hidden rounded-md cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onImageClick) {
                          onImageClick(value.img!);
                        }
                      }}
                    >
                      <img
                        src={value.img}
                        alt={value.attrValue}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <span className="text-center text-sm">{value.attrValue}</span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkuSelector;