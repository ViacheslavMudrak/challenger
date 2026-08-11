import React from 'react';

export type TableRow = {
  label: string;
  value: string | number;
  isSubItem?: boolean;
  subItems?: Array<{ label: string; value: string | number }>;
};

type DataTableProps = {
  rows: TableRow[];
};

const DataTable = ({ rows }: DataTableProps) => {
  return (
    <div className="mt-4 w-full">
      <table className="w-full border-collapse">
        <tbody>
          {rows.map((row, index) => {
            // If row has subItems, render grouped format
            if (row.subItems && row.subItems.length > 0) {
              return (
                <React.Fragment key={index}>
                  {row.subItems.map((subItem, subIndex) => (
                    <tr key={`${index}-${subIndex}`} className="border-b border-grey">
                      <td className="py-3 font-roboto-400 text-base text-black">
                        {subIndex === 0 ? row.label : ''}
                      </td>
                      <td className="py-3 text-right font-roboto-400 text-base text-black">
                        {subItem.label}{' '}
                        {typeof subItem.value === 'number'
                          ? subItem.value.toLocaleString()
                          : subItem.value}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              );
            }
            // Regular row (no subItems)
            return (
              <tr key={index} className="border-b border-grey">
                <td
                  className={`py-3 font-roboto-400 text-base text-black ${
                    row.isSubItem ? 'pl-8' : ''
                  }`}
                >
                  {row.label}
                </td>
                <td className="font-roboto py-3 text-right text-base font-medium text-black">
                  {typeof row.value === 'number' ? row.value.toLocaleString() : row.value}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
