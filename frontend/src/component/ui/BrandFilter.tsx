import { brand } from "../../constant"

type BrandFilterProps = {
  selectedBrand: string[]
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=> void
}

const BrandFilter = ({selectedBrand, onChange}: BrandFilterProps) => {

  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Brand Type</h4>
      {brand.options.map((bra, index) => (
        <label key={index} className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={bra.label}
            checked={selectedBrand.includes(bra.label)}
            onChange={onChange}
          />
          <span>{bra.label}</span>
        </label>
      ))}
    </div>
  )
}

export default BrandFilter